angular.module('flixApp').controller('mylistCtrl', function($scope, mainSvc){

  

  $scope.getFavs = function(){
    mainSvc.getFavs().then(function(response){
      $scope.favorites = response;
      console.log($scope.favorites);
    });
  }

  $scope.getFavs();
});
