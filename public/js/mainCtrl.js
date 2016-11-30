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

  $scope.getWatch = function(){
    mainSvc.getWatch().then(function(response){
      $scope.watch = response;
      console.log('watchlist', $scope.watch);
    });
  }
  $scope.getWatch();
});
