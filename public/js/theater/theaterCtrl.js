angular.module('flixApp').controller('theaterCtrl', function($scope, mainSvc, $stateParams, $sce){
    var theaterId = $stateParams;

    $scope.trustSrc = function(map) {
        return $sce.trustAsResourceUrl(map);
    };

    if(!$scope.date){
    var date = new Date().toISOString().substring(0, 10);
    }

    $scope.getTheater = function(date){
        
        if($scope.date){
        var date = $scope.date.toISOString().substring(0, 10);
        }
        $scope.day = date;
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
        $scope.getTheaterDetails();
      });
    }
    $scope.getTheaterDetails = function(){
        mainSvc.getTheaterDetails(theaterId).then(function(response){
            $scope.map = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyBG1FaMjyrJZWHUprmlMrpZBIwq_TH-hNs&q=' + response.name;
            $scope.theaterDetails = response;
        })
    }

    $scope.getTheater(date);
    
});