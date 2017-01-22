var app = require('./server.js');
var db = app.get('db');

module.exports = {
  add_to_fav: function(req, res, next){
    var title = req.body.title;
    var runtime = req.body.runtime;
    var release = req.body.release_date;
    var poster = 'https://image.tmdb.org/t/p/original' + req.body.poster_path;
    var status = '1';
    var plot = req.body.overview;
    var mdb_id = req.body.id;
    var imdb_id = req.body.imdb_id;
    var fb_id = req.body.fb_id;
    console.log(fb_id);

    db.add_to_mylist([title, runtime, release, poster, status, plot, mdb_id, imdb_id, fb_id], function(err, favorites){
      console.log(err);
      console.log(favorites);
      res.send('Added to your favorites');
    });
  },
  get_favorites: function(req, res, next){
    console.log(req.params);
    db.get_favorites([req.params.fb_id], function(err, mylist){
      console.log(mylist);
      res.send(mylist);
    })
  },
  add_to_watch: function(req, res, next){
    console.log(req.body.title);
    var title = req.body.title;
    var runtime = req.body.runtime;
    var release = req.body.release_date;
    var poster = 'https://image.tmdb.org/t/p/original' + req.body.poster_path;
    var status = '2';
    var plot = req.body.overview;
    var mdb_id = req.body.id;
    var imdb_id = req.body.imdb_id;
    var fb_id = req.body.fb_id;
    console.log(status);

    db.add_to_mylist([title, runtime, release, poster, status, plot, mdb_id, imdb_id, fb_id], function(err, watchlist){
      console.log(err);
      console.log(watchlist);
      res.send('Added to your watchlist');
    });
  },
  add_to_watched: function(req, res, next){
    console.log(req.body.title);
    var title = req.body.title;
    var runtime = req.body.runtime;
    var release = req.body.release_date;
    var poster = 'https://image.tmdb.org/t/p/original' + req.body.poster_path;
    var status = '3';
    var plot = req.body.overview;
    var mdb_id = req.body.id;
    var imdb_id = req.body.imdb_id;
    var fb_id = req.body.fb_id;
    console.log(status);

    db.add_to_mylist([title, runtime, release, poster, status, plot, mdb_id, imdb_id, fb_id], function(err, mylist){
      console.log(err);
      console.log(mylist);
      res.send('Added to your watched');
    });
  },
  get_watched: function(req, res, next){
    console.log(req.params);
    db.get_watched([req.params.fb_id], function(err, mylist){
      console.log('get_watched');
      res.send(mylist);
    });
  },
  get_watchlist: function(req, res, next){
    console.log(req.params);
    db.get_watchlist([req.params.fb_id], function(err, mylist){
      res.send(mylist);
    });
  },
  update_to_fav: function(req, res, next){
    console.log(req.body.id);
    var favStatus = 1;
    db.update_to_fav([req.body.id, favStatus, req.body.fb_id], function(err, mylist){
      res.send(mylist);
    });
  },
  update_to_watched: function(req, res, next){
    console.log(req.body);
    var watchedStatus = 3;
    db.update_to_watched([req.body.id, watchedStatus, req.body.fb_id], function(err, mylist){
      res.send(mylist);
    });
  },
  delete: function(req, res, next){
    console.log('del func', req.params);
    db.delete([req.params.id, req.params.fb_id, req.params.id2], function(err, mylist){
      console.log(err);
      res.send(mylist);
    });
  },
  delete_review: function(req, res, next){
    console.log('deleteing review', req.params);
    db.delete_review([req.params.id, req.params.fb_id, req.params.id2], function(err, reviews){
      console.log(err);
      console.log(reviews);
      res.send(reviews);
    });
  },
  add_to_reviews: function(req, res, next){
    var title = req.body.title;
    var poster = req.body.poster;
    var mdb_id = req.body.mdb_id;
    var fb_id = req.body.fb_id;
    var author = req.body.user_name;
    console.log(author);
    db.add_to_reviews([title, poster, mdb_id, author, fb_id], function(err, reviews){
      console.log(err);
      res.send(reviews);
    });
  },
  get_reviews: function(req, res, next){
    console.log(req.params);
    db.get_reviews([req.params.fb_id], function(err, reviews){
      res.send(reviews);
    });
  },
  get_user_reviews: function(req, res, next){
    console.log(req.params);
    db.get_user_reviews([req.params.mdb_id], function(err, reviews){
      res.send(reviews);
    });
  },
  get_user_reviews2: function(req, res, next){
    console.log('getUserReviews2', req.params);
    db.get_user_reviews2([req.params.id], function(err, reviews){
      console.log(err);
      res.send(reviews);
    });
  },
  add_review: function(req, res, next){
    console.log(req.body);
    var author = req.body.author;
    var tagline = req.body.tagline;
    var review = req.body.review;
    var id = req.body.mdb_id;
    var rating = req.body.rating;
    var fb_id = req.body.fb_id;
    db.add_review([tagline, author, rating, review, id, fb_id], function(err, reviews){
      res.send(reviews)
    });
  },
  update_review: function(req, res, next){
    console.log(req.params);
    db.update_review([req.params.mdb_id, req.params.fb_id], function(err, reviews){
      res.send(reviews);
    });
  },
  get_users: function(req, res, next){
    console.log(req.params);
    db.get_users([req.params.name], function(err, users){
      res.send(users);
    });
  }
};
