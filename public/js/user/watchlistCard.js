angular.module('watchlistCardDirective', []).directive('watchlistCard', function(){
    return {
        restrict: 'E',
        scope: {
            film: '='
        },
        templateUrl: './js/user/filmCard.html',
        controller: function($scope){
           
           $scope.film;
        }
    }
});