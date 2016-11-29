angular.module('flixApp').service('mainSvc', function($http){
//HOME PAGE SECTION
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

  this.getNowPlaying = function(){
    return $http({
      method:'GET',
      url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=8eecf03080f34edf303e14b5f1476653&language=en-US&page=1'
    }).then(function(response){
      console.log(response.data);
      return response.data.results;
    })
  }

  this.getComingSoon = function(){
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=8eecf03080f34edf303e14b5f1476653&language=en-US&page=2'
    }).then(function(response){
      console.log(response.data);
      return response.data.results;
    })
  }
  //DETAILS SECTION

  this.getDetails = function(id){
    return $http({
      method:'GET',
      url: 'https://api.themoviedb.org/3/movie/'+ id + '?api_key=8eecf03080f34edf303e14b5f1476653&language=en-US&append_to_response=undefined'
    }).then(function(response){
      console.log(response.data);
      return (response.data);
    });
  }
  this.getImdb = function(imdb_id){
    console.log(imdb_id);
    return $http({
      method:'GET',
      url: 'http://www.omdbapi.com/?i=' + imdb_id
    }).then(function(response){
      console.log('imdb_deets', response);
      return response.data;
    });
  }
  this.getVideos = function(imdb_id){
    return $http({
      method:'GET',
      url:'https://api.themoviedb.org/3/movie/'+ imdb_id +'/videos?api_key=8eecf03080f34edf303e14b5f1476653'
    }).then(function(response){
      return response.data.results;
    });
  }
  this.getCast = function(imdb_id){
    return $http({
      method: 'GET',
      url:'https://api.themoviedb.org/3/movie/'+ imdb_id +'/credits?api_key=8eecf03080f34edf303e14b5f1476653'
    }).then(function(response){
      return response.data;
    });
  }
  this.getSimilars = function(imdb_id){
    return $http({
      method:'GET',
      url:'https://api.themoviedb.org/3/movie/' + imdb_id + '/similar?api_key=8eecf03080f34edf303e14b5f1476653&language=en-US'
    }).then(function(response){
      console.log(response.data);
      return response.data.results;
    })
  }
  this.getSearchMovie = function(term){
    return $http({
      method:'GET',
      url: 'https://api.themoviedb.org/3/search/movie?api_key=8eecf03080f34edf303e14b5f1476653&language=en-US&query=' + term
    }).then(function(response){
      return response.data.results;
    });
  }
  this.getImages = function(imdb_id){
    return $http({
      method: 'GET',
      url: 'http://api.themoviedb.org/3/movie/' + imdb_id + '/images?api_key=8eecf03080f34edf303e14b5f1476653'
    }).then(function(response){
      return response.data;
    });
  }

  //DATABASE STUFF
  this.addToFav = function(fav){
    console.log(fav);
    return $http({
      method:'POST',
      url: '/mylist/favorites',
      data: fav
    }).then(function(response){
      return response;
    });
  }
});
