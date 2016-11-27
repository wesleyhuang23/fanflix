angular.module('flixApp', ['ui.router'])

.config(function($urlRouterProvider, $stateProvider){

  $stateProvider
  .state('home', {
    templateUrl: 'views/home.html',
    url: '/'
  }).state('details', {
    templateUrl: 'veiws/details.html',
    url: '/details/:id'
  });


  $urlRouterProvider.otherwise('/');
});
