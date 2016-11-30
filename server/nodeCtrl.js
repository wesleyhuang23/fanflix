var app = require('./server.js');
var db = app.get('db');

module.exports = {
  add_to_fav: function(req, res, next){
    var title = req.body.title;
    var runtime = req.body.runtime;
    var release = req.body.release_date;
    var poster = 'https://image.tmdb.org/t/p/original' + req.body.poster_path;
    var mdb_id = req.body.id;
    var imdb_id = req.body.imdb_id;
    console.log(imdb_id);

    db.add_to_fav([title, runtime, release, poster, mdb_id, imdb_id], function(err, favorites){
      console.log(err);
      console.log(favorites);
      res.send('Added to your watchlist');
    });
  },
  get_favorites: function(req, res, next){
    db.get_favorites([], function(err, favorites){
      console.log(favorites);
      res.send(favorites);
    })
  }
};
