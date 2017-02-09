angular.module('flixApp').controller('userCtrl', function($scope, mainSvc, $stateParams){
    var id = $stateParams
    console.log(id);

    var getUserData = function(id){
        mainSvc.getUserData(id).then(function(response){
            $scope.userData = response;
            console.log($scope.userData, 'userData');
        });
    }
    getUserData(id);
});