angular.module('flixApp', ['ui.router'])

.config(function($urlRouterProvider, $stateProvider){

  $stateProvider
  .state('home', {
    templateUrl: 'views/home.html',
    url: '/'
  }).state('details', {
    templateUrl: 'views/details.html',
    url: '/movie/:id',
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
  }).state('login', {
    templateUrl: 'views/login.html',
    url: '/login',
    controller: 'loginCtrl'
  }).state('people', {
    templateUrl: 'views/people.html',
    url: '/people/:id',
    controller: 'peopleCtrl'
  }).state('user_review', {
    templateUrl: 'views/user_reviews.html',
    url: '/user_reviews/:id',
    controller: 'userReviewsCtrl'
  }).state('credits',  {
    templateUrl: 'views/credits.html',
    url: '/credits/:id',
    controller: 'creditsCtrl'
  }).state('theater', {
    templateUrl: 'views/theater.html',
    url: '/theater/:id',
    controller: 'theaterCtrl'
  });


  $urlRouterProvider.otherwise('/');
});
