angular.module('favoritesCardDirective', []).directive('favoritesCard', function(){
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