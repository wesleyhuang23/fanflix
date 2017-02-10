angular.module('favoritesCardDirective', []).directive('favoritesCard', function(){
    return {
        restrict: 'E',
        scope: {
            film: '='
        },
        templateUrl: './js/user/filmCard.html',
        controller: function($scope, filmSvc){
            var getUserData = function(id){
            mainSvc.getUserData(id).then(function(response){
            let watchlist = response.filter(function(films){
                return films.status === '2'
            });
            let watched = response.filter(function(films){
                return films.status === '3'
            });
            let favorites = response.filter(function(films){
                return films.status === '1';
            });
            $scope.watchlist = watchlist;
            $scope.watched = watched;
            $scope.favorites = favorites;
            console.log(response, 'userData');
            });
        }
        getUserData(id);
        }
    }
});