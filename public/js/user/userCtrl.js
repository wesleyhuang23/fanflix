angular.module('flixApp').controller('userCtrl', function($scope, mainSvc, $stateParams){
    var id = $stateParams
    console.log(id);

     var getUserData = function(id){
            mainSvc.getUserData(id).then(function(response){
            var films = response.filter(function(response){
                return response.status === 2;
            });
            let watched = response.filter(function(films){
                return films.status === 3
            });
            let favorites = response.filter(function(films){
                return films.status === 1;
            });
            $scope.watched = watched;
            $scope.favorites = favorites;
            $scope.watchlist = films;
            console.log($scope.watched, 'ctrl watchlist');
            });
        }
    getUserData(id);
});