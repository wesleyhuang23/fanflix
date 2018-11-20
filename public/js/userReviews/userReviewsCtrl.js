angular.module('flixApp').controller('userReviewsCtrl', function($scope, mainSvc, $stateParams){
  var id = $stateParams;
  window.scrollTo(0, 0);
  $scope.getUserReviews2 = (id) => {
    mainSvc.getUserReviews2(id).then(function(response){
      for(var i = 0; i < response.length; i++){
        response[i].reviewColor = $scope.colorPicker(response[i].rating);
      }
      $scope.userReviews2 = response;
      $scope.userAuthor = response[0].name;
    });
  }
  $scope.getUserReviews2(id);
});
