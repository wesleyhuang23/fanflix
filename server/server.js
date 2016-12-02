var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./config.js');
var connectionString = 'postgres://wesleyhuang@localhost/fanflix';

var app = module.exports = express();
var massiveInstance = massive.connectSync({connectionString : connectionString});

app.set('db', massiveInstance);
var db = app.get('db');
// app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + './../public'));

app.use(session({secret: '98h32diwuenfweif', resave: false, saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID: config.facebookId,
    clientSecret: config.facebookSecret,
    callbackURL: config.baseDomian + '/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    //sql function to check if the user exist
    db.users.findOne({fb_id: profile.id}, function(err, users){
      if(!users){
        db.users.insert({
          name: profile.displayName,
          fb_id: profile.id,
          photo: 'http://graph.facebook.com/' + profile.id + '/picture?width=9999'
        }, function(err, user){
          return done(null, user);
        });
      } else {
        return done(null, users);
      }
    })
    //if they dont exist create them in the database;
  }
));

passport.serializeUser(function(user, done){
  done(null, user);
});
passport.deserializeUser(function(user, done){
  done(null, user);
});

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login'
}), function(req, res){
  console.log(req.session);
});

app.get('/user', function(req, res){
  return res.send(req.user);
});

app.get('/logout', function(req, res){
  req.logout();
  return res.status(200).json({user: null})
})

var nodeCtrl = require('./nodeCtrl.js');

//creating tables
db.create_mylist(function(err, films){
  console.log('mylist table init');
});
// db.create_watchlist(function(err, films){
//   console.log('watchlist table init');
// })
db.create_reviews(function(err, reviews){
  console.log('reviews table init');
});
db.create_user(function(err, users){
  console.log('users table init');
});
//favorites
app.post('/favorites', nodeCtrl.add_to_fav);
app.get('/favorites', nodeCtrl.get_favorites);

//watchlist
app.post('/watchlist', nodeCtrl.add_to_watch);
app.get('/watchlist', nodeCtrl.get_watchlist);

//watched
app.post('/watched', nodeCtrl.add_to_watched);
app.get('/watched', nodeCtrl.get_watched);

//reviews
app.post('/reviews', nodeCtrl.add_to_reviews);
app.get('/reviews', nodeCtrl.get_reviews);
app.post('/comments', nodeCtrl.add_review);
app.get('/update/:mdb_id', nodeCtrl.update_review);

//update
app.put('/update', nodeCtrl.update_to_fav);

//delete
app.delete('/delete', nodeCtrl.delete);
app.delete('/deletereview', nodeCtrl.delete_review);

app.listen(3000, function(){
  console.log('listening on port 3000...');
})
