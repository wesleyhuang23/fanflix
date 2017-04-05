angular.module('flixApp').controller('mainCtrl', function($scope, mainSvc){
  $scope.colorPicker = function(rating){
    if(rating >= 7){
      return 'green';
    }
    else if(rating >= 4){
      return 'orange';
    }
    else if(rating >= 0){
      return 'red';
    }
  }

  var id = {}
  var imdb_id = {}

  $scope.getPopular = () => {
    mainSvc.getPopular().then(response => {
      // console.log($scope.populars);

      $scope.popular = response[0];
      var result = []
      for(var i = 0; i < 7; i++){
        result.push(response[i]);
      }
      $scope.populars = response;
      // console.log($scope.popular);

      id.id = response[0].id;
        // console.log(id);
          $scope.getPopularDetails(id);
    });
  }

  $scope.getPopularDetails = id => {
    mainSvc.getPopularDetails(id).then(response => {
      $scope.popularDetail = response;
      // console.log('popDeets', $scope.popularDetail);
      $scope.companies = response.production_companies;
      imdb_id.id = response.imdb_id;
      // console.log(imdb_id);
      $scope.getPopImdb(imdb_id);
    })
  }

  $scope.getPopImdb = imdb_id => {
    mainSvc.getPopImdb(imdb_id).then(response => {
      $scope.imdb_detail = response;
    });
  }

  $scope.getPopular();

  $scope.getNowPlaying = () => {
    mainSvc.getNowPlaying().then(response => {
      $scope.getNowPlaying2 = () => {
      mainSvc.getNowPlaying2().then(response => {
        $scope.nowPlaying2 = response;
      });
    }
      $scope.getNowPlaying2();

      response.sort(function (a, b) {
        if (a.release_date < b.release_date) {
          return 1;
        }
        if (a.release_date > b.release_date) {
          return -1;
        }
        return 0;
        });

      $scope.nowPlaying = response;
      // console.log('now playing', $scope.nowPlaying);
    });
  }
  $scope.getNowPlaying();


  $scope.getComingSoon = () => {
    mainSvc.getComingSoon().then(response => {
      var masterComingSoon = [];

      for(var i = 0; i < response.length; i++){
        masterComingSoon.push(response[i]);
      }

      masterComingSoon.sort(function (a, b) {
        if (a.release_date < b.release_date) {
          return 1;
        }
        if (a.release_date > b.release_date) {
          return -1;
        }
        return 0;
        });
      $scope.comingSoon = masterComingSoon;

      // console.log('master coming soon', $scope.comingSoon);
    })
  }
  $scope.getComingSoon();


  //SEARCH VIEW
  $scope.getSearch = term => {
    $scope.getPeople(term);
    // $scope.getTheatersInArea(term);
    $scope.getUsers(term);
    // console.log('search', term);
    mainSvc.getSearchMovie(term).then(response => {
      for(var i = 0; i < response.length; i++){
        response[i].release_date = response[i].release_date.substring(0, 4);
      }
      $scope.movieSearch = response;
      // console.log($scope.movieSearch);
    });
  };
  $scope.getPeople = term => {
    mainSvc.getPeople(term).then(response => {
      $scope.person = response;
      // console.log('PERSON SEARCH', $scope.person);
    });
  }
   $scope.getTheatersInArea = term => {
    // console.log('get theaters', term);
    mainSvc.getTheatersInArea(term).then(function(response){
      $scope.theaters = response;
      // console.log('theaters', $scope.theaters);
    })
  }
  $scope.getUsers = term => {
    // console.log('get users', term);
    mainSvc.getUsers(term).then(function(response){
      $scope.users = response;
    });
  }

  //MYLIST VIEW
      var fb_id;

  $scope.logoutUser = () => {
    mainSvc.logoutUser().then(response => {

      // console.log(response);
      if (!response.data.user) {
        $scope.user = null;
        fb_id = null;
        $scope.getWatch();
        // console.log('logout getWatch');
      }

    })
  }
    mainSvc.getUser().then(response => {
      if(response.data){
        // console.log('user', response.data);
        $scope.user = response.data;
        fb_id = response.data.fb_id;
        // console.log(fb_id);
          $scope.getFavs(fb_id);
          $scope.getWatch(fb_id);
          $scope.getWatched(fb_id);
          $scope.getReviews(fb_id);
      }
    });

  $scope.getFavs = () => {
 
    mainSvc.getFavs(fb_id).then(response => {
      $scope.favorites = response;
      
    });
  }

  $scope.getWatched = () => {
    mainSvc.getWatched(fb_id).then(response => {
      $scope.watched = response;
    });
  }

  $scope.getWatched();

  var watchlist

  $scope.getWatch = () => {
      // console.log('$scope.getWatch fired')
    mainSvc.getWatch(fb_id).then(response => {
      $scope.watch = response;
      // console.log('WATCHLIST', $scope.watch);
      // console.log('mainSvc.getWatch fired')

      // console.log('watchlist', $scope.watch);
      // watchlist = response;
    });
  }
  // $scope.getWatch(fb_id);

  $scope.updateWatched = function(mdb_id, fb_id){
    var id = {};
    id.id = mdb_id;
    id.fb_id = fb_id;
    console.log(id);
    mainSvc.updateWatched(id).then(response => {
      $scope.getWatched();
      $scope.getWatch();
    });
  }

  $scope.updateFav = function(mdb_id, fb_id){
    var id = {}
    id.id = mdb_id;
    id.fb_id = fb_id;
    // console.log(id);
    mainSvc.updateFav(id).then(response => {
      // console.log('your list is updated');
      $scope.getFavs();
      $scope.getWatched();
      $scope.getWatch();
    });
  }

  $scope.delete = function(mdb_id, fb_id, id){
    var del_id = {}
    del_id.id = mdb_id;
    del_id.fb_id = fb_id;
    del_id.id2 = id;
    // console.log(del_id);
    mainSvc.delete(del_id).then(response => {
      // console.log('movie deleted');
      $scope.getFavs();
      $scope.getWatched();
      $scope.getWatch();
    });
  }
  $scope.deleteReview = function(mdb_id, fb_id, id){
    var del_id = {}
    del_id.id = mdb_id;
    del_id.fb_id = fb_id;
    del_id.id2 = id;
    // console.log(del_id);
    mainSvc.deleteReview(del_id).then(response => {
      $scope.getReviews(fb_id);
      // console.log('movie deleted');
    });
  }

  //reviews
  $scope.addToReviews = function(film, name){
    film.user_name = name;
    // console.log(film);
    mainSvc.addToReviews(film).then(response => {
      $scope.reviews = response;
      $scope.getReviews(fb_id);
    });
  }

  $scope.getReviews = fb_id => {
    mainSvc.getReviews(fb_id).then(response => {
      // for(var i = 0; i < response.length; i++){
      //   response[i].rating = Number(response[i].rating);
      // }
      for(var i = 0; i < response.length; i++){
        response[i].reviewColor = $scope.colorPicker(response[i].rating);
      }
      $scope.reviews = response;
      // console.log('REVIEWS', $scope.reviews);
    });
  }


    $scope.editReview = function(mdb_id, fb_id){
      var edit = {};
      edit.mdb_id = mdb_id;
      edit.fb_id = fb_id;
      // console.log(edit);
      mainSvc.editReview(edit).then(response => {
        $scope.reviewToEdit = response;
        // console.log('review to edit', $scope.reviewToEdit);

        $scope.comments = response[0].review;
        $scope.tagline = response[0].tagline;
        $scope.author = response[0].author;
        $scope.rating = Number(response[0].rating);
      });
    };


});
