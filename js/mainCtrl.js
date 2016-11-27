angular.module('flixApp').controller('mainCtrl', function($scope, mainSvc){

  var id = {}
  var imdb_id = {}

  $scope.getPopular = function(){
    mainSvc.getPopular().then(function(response){
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
      $scope.nowPlaying = response;
      console.log($scope.nowPlaying);
    });
  }
  $scope.getNowPlaying();
});
