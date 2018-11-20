angular.module('flixApp').controller('userCtrl', function($scope, mainSvc, $stateParams){
    window.scrollTo(0, 0);
    var id = $stateParams

     var getUserData = function(id){
            mainSvc.getUserInfo(id).then(function(response){
                $scope.userInfo = response[0];
            });
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
            });
        }
    getUserData(id);
});