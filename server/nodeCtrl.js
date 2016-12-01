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
    console.log(status);

    db.add_to_mylist([title, runtime, release, poster, status, plot, mdb_id, imdb_id], function(err, favorites){
      console.log(err);
      console.log(favorites);
      res.send('Added to your favorites');
    });
  },
  get_favorites: function(req, res, next){
    db.get_favorites([], function(err, favorites){
      console.log(favorites);
      res.send(favorites);
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
    console.log(status);

    db.add_to_mylist([title, runtime, release, poster, status, plot, mdb_id, imdb_id], function(err, watchlist){
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
    console.log(status);

    db.add_to_mylist([title, runtime, release, poster, status, plot, mdb_id, imdb_id], function(err, watchlist){
      console.log(err);
      console.log(watchlist);
      res.send('Added to your watched');
    });
  },
  get_watched: function(req, res, next){
    db.get_watched([], function(err, watched){
      console.log('get_watched');
      res.send(watched);
    });
  },
  get_watchlist: function(req, res, next){
    db.get_watchlist([], function(err, watchlist){
      res.send(watchlist);
    });
  },
  update_to_fav: function(req, res, next){
    console.log(req.body.id);
    var favStatus = 1;
    db.update_to_fav([req.body.id, favStatus], function(err, favorites){
      res.send(favorites);
    });
  },
  delete: function(req, res, next){
    console.log('del func', req.query.id);
    db.delete([req.query.id], function(err, mylist){
      console.log(err);
      res.send(mylist);
    });
  }
};
