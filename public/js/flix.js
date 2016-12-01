angular.module('flixApp', ['ui.router'])

.config(function($urlRouterProvider, $stateProvider){

  $stateProvider
  .state('home', {
    templateUrl: 'views/home.html',
    url: '/'
  }).state('details', {
    templateUrl: 'views/details.html',
    url: '/details/:id',
    controller: 'detailsCtrl'
  }).state('search', {
    templateUrl: 'views/search.html',
    url: '/search',
    controller: 'searchCtrl'
  }).state('mylist', {
    templateUrl: 'views/mylist.html',
    url: '/mylist'
  }).state('reviews', {
    templateUrl: 'views/reviews.html',
    url: '/reviews'
  }).state('edit', {
    templateUrl: 'views/edit.html',
    url: '/edit/:id',
    controller: 'editCtrl'
  });


  $urlRouterProvider.otherwise('/');
});
