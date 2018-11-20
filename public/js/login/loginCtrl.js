angular.module('flixApp').controller('loginCtrl', function($scope, mainSvc){
    window.scrollTo(0, 0);
    $scope.loginRecord = function(){
        localStorage.user = 'true';
    }
});
