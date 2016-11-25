angular.module('flixApp').service('mainSvc', function($http){

  this.getPopular = function(){
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/popular?api_key=8eecf03080f34edf303e14b5f1476653&language=en-US'
    }).then(function(response){
      console.log(response.data.results);
      return response.data.results;
    })
  }

  this.getPopularDetails = function(id){
    console.log(id.id);
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/' + id.id + '?api_key=8eecf03080f34edf303e14b5f1476653&language=en-US&append_to_response=undefined'
    }).then(function(response){
      console.log(response);
      return response.data;
    });
  }

  this.getPopImdb = function(imdb_id){
    console.log(imdb_id.id);
    return $http({
      method: 'GET',
      url: 'http://www.omdbapi.com/?i=' + imdb_id.id
    }).then(function(response){
      console.log(response);
      return response.data;
    });
  }

});
