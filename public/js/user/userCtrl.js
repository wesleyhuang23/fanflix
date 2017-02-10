angular.module('flixApp').controller('userCtrl', function($scope, mainSvc, $stateParams){
    var id = $stateParams
    console.log(id);

     var getUserData = function(id){
            mainSvc.getUserData(id).then(function(response){
                var films = response.filter(function(response){
                    return response.status === 2;
                });
            $scope.watchlist = films;
            console.log($scope.watchlist, 'ctrl watchlist');
            });
        }
    getUserData(id);
});