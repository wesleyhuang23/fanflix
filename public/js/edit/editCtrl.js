angular.module('flixApp').controller('editCtrl', function($scope, mainSvc, $stateParams){
  var id = $stateParams.id;
  console.log(id);

  $scope.getEditDetails = function(id){
    mainSvc.getDetails(id).then(function(response){
      $scope.editDetails = response;
      console.log($scope.editDetails);
    });
  }
  $scope.getEditDetails(id);

  $scope.submitReview = function(tagline, author, comments){
    var review = {}
    console.log(review);
    review.tagline = tagline;
    review.author = author;
    review.review = comments;
    review.mdb_id = id;
    console.log(review);
    mainSvc.submitReview(review).then(function(response){

    });
  };
});
