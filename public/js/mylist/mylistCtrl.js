angular.module('flixApp').controller('mylistCtrl', function($scope, mainSvc){

  window.scrollTo(0, 0);

  $scope.getFavs = function(){
    mainSvc.getFavs().then(function(response){
      $scope.favorites = response;
    });
  }

  $scope.getFavs();

});
