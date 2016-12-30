angular.module('flixApp').controller('theaterCtrl', function($scope, mainSvc, $stateParams){
    console.log($stateParams);
    var theaterId = $stateParams;
    var date = new Date().toISOString().substring(0, 10);

    $scope.getTheater = function(){
        mainSvc.getTheater(theaterId, date).then(function(response){
        $scope.theater = response;
      });
    }
});