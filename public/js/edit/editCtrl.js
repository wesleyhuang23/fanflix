angular.module('flixApp').controller('editCtrl', function($scope, mainSvc, $stateParams){
  var id = $stateParams.id;
  $scope.enterClick = false;

  $scope.getEditDetails = function(id){
    mainSvc.getDetails(id).then(function(response){
      $scope.editDetails = response;

    });
  }
  $scope.getEditDetails(id);

  $scope.submitReview = function(tagline, author, comments, rating, fb_id){
    if(rating){ //if rating is true then run
      var review = {}
      review.tagline = tagline;
      review.author = author;
      review.review = comments;
      review.mdb_id = id;
      review.rating = rating;
      review.fb_id = fb_id;

      mainSvc.submitReview(review).then(function(response){
        $scope.getReviews(fb_id);
      });
    } else {
      $scope.enterClick = true;
    }

  };
});
