angular.module('flixApp').controller('loginCtrl', function($scope, mainSvc){
    $scope.loginRecord = function(){
        localStorage.user = 'true';
    }
});
