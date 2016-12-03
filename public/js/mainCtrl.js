angular.module('flixApp').controller('mainCtrl', function($scope, mainSvc){

  var id = {}
  var imdb_id = {}

  $scope.getPopular = function(){
    mainSvc.getPopular().then(function(response){
      console.log($scope.populars);
      $scope.populars = response;
      $scope.popular = response[0];
      console.log($scope.popular);

      id.id = response[0].id;
        console.log(id);
          $scope.getPopularDetails(id);
    });
  }

  $scope.getPopularDetails = function(id){
    mainSvc.getPopularDetails(id).then(function(response){
      $scope.popularDetail = response;
      console.log('popDeets', $scope.popularDetail);
      $scope.companies = response.production_companies;
      imdb_id.id = response.imdb_id;
      console.log(imdb_id);
      $scope.getPopImdb(imdb_id);
    })
  }

  $scope.getPopImdb = function(imdb_id){
    mainSvc.getPopImdb(imdb_id).then(function(response){
      $scope.imdb_detail = response;
    });
  }

  $scope.getPopular();

  $scope.getNowPlaying = function(){
    mainSvc.getNowPlaying().then(function(response){
      response.sort(function (a, b) {
        if (a.release_date < b.release_date) {
          return 1;
        }
        if (a.release_date > b.release_date) {
          return -1;
        }
  // a must be equal to b
        return 0;
        });

        var result = response.filter(function(response){
          return response.vote_count > 1;
        });
      $scope.nowPlaying = result;
      console.log($scope.nowPlaying);
    });
  }
  $scope.getNowPlaying();


  $scope.getComingSoon = function(){
    mainSvc.getComingSoon().then(function(response){
      response.sort(function (a, b) {
        if (a.release_date < b.release_date) {
          return 1;
        }
        if (a.release_date > b.release_date) {
          return -1;
        }
  // a must be equal to b
        return 0;
        });

        var result = response.filter(function(response){
          return response.vote_count > 1;
        });
      $scope.comingSoon = result;
      console.log($scope.comingSoon);
    })
  }
  $scope.getComingSoon();


  //SEARCH VIEW
  $scope.getSearch = function(term){
    console.log('search', term);
    mainSvc.getSearchMovie(term).then(function(response){
      for(var i = 0; i < response.length; i++){
        response[i].release_date = response[i].release_date.substring(0, 4);
      }
      $scope.movieSearch = response;
      console.log($scope.movieSearch);
    });
  };

  //MYLIST VIEW
  $scope.getFavs = function(){
    mainSvc.getFavs().then(function(response){
      $scope.favorites = response;
      console.log($scope.favorites);
    });
  }

  $scope.getFavs();

  $scope.getWatched = function(){
    mainSvc.getWatched().then(function(response){
      $scope.watched = response;
      console.log('watched', $scope.watched);
    });
  }

  $scope.getWatched();

  var watchlist

  $scope.getWatch = function(){
    mainSvc.getWatch().then(function(response){
      $scope.watch = response;
      console.log('watchlist', $scope.watch);
      watchlist = response;
    });
  }
  $scope.getWatch();


  $scope.updateFav = function(mdb_id){
    var id = {}
    id.id = mdb_id;
    console.log(id);
    mainSvc.updateFav(id).then(function(response){
      console.log('your list is updated');
    });
  }

  $scope.delete = function(mdb_id){
    var del_id = {}
    del_id.id = mdb_id;
    console.log(del_id);
    mainSvc.delete(del_id).then(function(response){
      console.log('movie deleted');
    });
  }
  $scope.deleteReview = function(mdb_id){
    var del_id = {}
    del_id.id = mdb_id;
    console.log(del_id);
    mainSvc.deleteReview(del_id).then(function(response){
      console.log('movie deleted');
    });
  }

  //reviews
  $scope.addToReviews = function(film){
    console.log(film);
    mainSvc.addToReviews(film).then(function(response){
      $scope.reviews = response;
    });
  }

  $scope.getReviews = function(){
    mainSvc.getReviews().then(function(response){
      $scope.reviews = response;
      console.log($scope.reviews);
    });
  }
  $scope.getReviews();

    $scope.editReview = function(mdb_id){
      console.log(mdb_id);
      mainSvc.editReview(mdb_id).then(function(response){
        $scope.reviewToEdit = response;
        console.log('review to edit', $scope.reviewToEdit);

        $scope.comments = response[0].review;
        $scope.tagline = response[0].tagline;
        $scope.author = response[0].author;
      });
    };

  $scope.logoutUser = function() {
    mainSvc.logoutUser().then(function(response) {
      console.log(response);
      if (!response.data.user) {
        $scope.user = null;
      }
    })
  }
    mainSvc.getUser().then(function(response){
      if(response.data){
        console.log('user', response.data);
        $scope.user = response.data;
      }
    });
});
