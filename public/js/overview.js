angular.module('overviewApp', ['ui.router']).config(function($urlRouterProvider, $stateProvider){
  $stateProvider
  .state('overview', {
    templateUrl: 'views/overview.html',
    url: '/overview/:id'
  }).state('similar', {
    templateUrl: 'veiws/similar.html',
    url: '/similar/:id'
  })
});
