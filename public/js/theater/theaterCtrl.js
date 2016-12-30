angular.module('flixApp').controller('theaterCtrl', function($scope, mainSvc, $stateParams){
    console.log($stateParams);
    var theaterId = $stateParams;
    var date = new Date().toISOString().substring(0, 10);

    $scope.getTheater = function(){
        mainSvc.getTheater(theaterId, date).then(function(response){
        response.sort(function (a, b) {
        if (a.title < b.title) {
          return 1;
        }
        if (a.title > b.title) {
          return -1;
        }
  // a must be equal to b
        return 0;
        });
        $scope.theater = response;
        console.log('theater detail', $scope.theater);
      });
    }
    $scope.getTheaterDetails = function(){
        mainSvc.getTheaterDetails(theaterId).then(function(response){
            $scope.theaterDetails = response;
            console.log('theater address', $scope.theaterDetails);
        })
    }

    $scope.getTheater();
    $scope.getTheaterDetails();
});