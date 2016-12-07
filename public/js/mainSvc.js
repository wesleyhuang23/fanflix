angular.module('flixApp').service('mainSvc', function($http){
//HOME PAGE SECTION
  this.getPopular = () => {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/popular?api_key=8eecf03080f34edf303e14b5f1476653&language=en-US'
    }).then(response => response.data.results);
      console.log(response.data.results);
  };

  this.getPopularDetails = id => {
    console.log(id.id);
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/' + id.id + '?api_key=8eecf03080f34edf303e14b5f1476653&language=en-US&append_to_response=undefined'
    }).then(response => response.data);
      console.log(response);
  };

  this.getPopImdb = imdb_id => {
    console.log(imdb_id.id);
    return $http({
      method: 'GET',
      url: 'http://www.omdbapi.com/?i=' + imdb_id.id
    }).then(response => response.data);
      console.log(response);
  };

  this.getNowPlaying = function(){
    return $http({
      method:'GET',
      url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=8eecf03080f34edf303e14b5f1476653&language=en-US'
    }).then(response => response.data.results);
      console.log(response.data);
  };
  this.getNowPlaying2 = () => {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=8eecf03080f34edf303e14b5f1476653&language=en-US&page=2'
    }).then(response => response.data.results);
  };

  this.getComingSoon = function(){
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=8eecf03080f34edf303e14b5f1476653&language=en-US'
    }).then(function(response){
      console.log(response.data);
      return response.data.results;
    })
  }
  this.getComingSoon2 = () => {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=8eecf03080f34edf303e14b5f1476653&language=en-US&page=2'
    }).then(response => response.data.results);
  };
  //DETAILS SECTION

  this.getDetails = id => {
    return $http({
      method:'GET',
      url: 'https://api.themoviedb.org/3/movie/'+ id + '?api_key=8eecf03080f34edf303e14b5f1476653&language=en-US&append_to_response=undefined'
    }).then(response => response.data);
      console.log(response.data);
  };
  this.getImdb = imdb_id => {
    console.log(imdb_id);
    return $http({
      method:'GET',
      url: 'http://www.omdbapi.com/?i=' + imdb_id
    }).then(response => response.data);
      console.log('imdb_deets', response);
  };
  this.getVideos = imdb_id => {
    return $http({
      method:'GET',
      url:'https://api.themoviedb.org/3/movie/'+ imdb_id +'/videos?api_key=8eecf03080f34edf303e14b5f1476653'
    }).then(response => response.data.results);
  };
  this.getCast = imdb_id => {
    return $http({
      method: 'GET',
      url:'https://api.themoviedb.org/3/movie/'+ imdb_id +'/credits?api_key=8eecf03080f34edf303e14b5f1476653'
    }).then(response => response.data);
  };
  this.getCredits = id => {
    return $http({
      url: 'https://api.themoviedb.org/3/movie/'+ id +'/credits?api_key=8eecf03080f34edf303e14b5f1476653'
    }).then(function(response){
      return response.data;
    });
  };
  this.getSimilars = imdb_id => {
    return $http({
      method:'GET',
      url:'https://api.themoviedb.org/3/movie/' + imdb_id + '/similar?api_key=8eecf03080f34edf303e14b5f1476653&language=en-US'
    }).then(response => response.data.results);
      console.log(response.data);
  };
  this.getGuideBox = id => {
    return $http({
      method: 'GET',
      url: 'https://api-public.guidebox.com/v1.43/US/rKsvLMllrJ7ebTRG3cMa5smyjptG5sDJ/search/movie/id/themoviedb/' + id
    }).then(response => response.data);
      console.log('guidebox', response.data)
  };
  this.getGuideBoxDetails = id => {
    return $http({
      method: 'GET',
      url: 'https://api-public.guidebox.com/v1.43/US/rKsvLMllrJ7ebTRG3cMa5smyjptG5sDJ/movie/' + id
    }).then(response => response.data);
  };
  //search view
  this.getSearchMovie = term =>{
    return $http({
      method:'GET',
      url: 'https://api.themoviedb.org/3/search/movie?api_key=8eecf03080f34edf303e14b5f1476653&language=en-US&query=' + term
    }).then(response => response.data.results);
  };
  this.getPeople = term =>{
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/person?api_key=8eecf03080f34edf303e14b5f1476653&language=en-US&query=' + term + '&page=1&include_adult=false'
    }).then(response => response.data.results);
    //function(response);
  };
  this.getImages = imdb_id => {
    return $http({
      method: 'GET',
      url: 'http://api.themoviedb.org/3/movie/' + imdb_id + '/images?api_key=8eecf03080f34edf303e14b5f1476653'
    }).then(response => response.data);
  };
  this.getUserReviews = mdb_id => {
    return $http({
      method: 'GET',
      url: '/user_reviews/' + mdb_id
    }).then(response => response.data);
  };
  //DATABASE STUFF
  this.addToFav = fav => {
    console.log(fav);
    return $http({
      method:'POST',
      url: '/favorites',
      data: fav
    }).then(response => response);
  };

  this.getFavs = fb_id => {
    return $http({
      method: 'GET',
      url: '/favorites/' + fb_id,
    }).then(response => response.data);
  };
  this.addtoWatched = fav => {
    console.log(fav);
    return $http({
      method:'POST',
      url: '/watched',
      data: fav
    }).then(response => response);
  };

  this.getWatched = fb_id => {
    return $http({
      method: 'GET',
      url: '/watched/' + fb_id,
    }).then(response => response.data);
      console.log('get_watched', response.data);
  };

  this.addToWatch = fav => {
    console.log('adding to watchlist...', fav);
    return $http({
      method: 'POST',
      url: '/watchlist',
      data: fav
    }).then(response => response.data);
  };
  this.getWatch = fb_id => {
    console.log('getting watchlist...');
    return $http({
      method: 'GET',
      url: '/watchlist/' + fb_id
    }).then(response => response.data);
  };
  this.updateFav = id => {

    console.log('updating to fav');
    return $http({
      method: 'PUT',
      url: '/update',
      data: id
    }).then(response => response);
  };
  this.updateWatched = id => {
    console.log('updating watched');
    return $http({
      method: 'PUT',
      url: '/update_watched',
      data: id
    }).then(response => response);
  }
  this.delete = del_id => {
    console.log('deleting');
    console.log(del_id);
    return $http({
      method:'DELETE',
      // url: 'http://localhost:3000/delete?' + 'id=' + del_id.id + 'fb_id=' + del_id.fb_id
      url: '/delete/' + del_id.id + '/' + del_id.fb_id + '/' + del_id.id2
    }).then(response => response);
      console.log("From Service: ", response);
  };

  this.deleteReview = del_id => {
    console.log('deleting review', del_id);
    return $http({
      method: 'DELETE',
      url: '/deletereview/' + del_id.id + '/' + del_id.fb_id + '/' + del_id.id2
    }).then(response => response);
  };

  this.addToReviews = film => {
    console.log('adding to reviews', film);
    return $http({
      method: 'POST',
      url: '/reviews',
      data: film
    }).then(response => response.data);
  }

  this.getReviews = fb_id => {
    return $http({
      method: 'GET',
      url: '/reviews/' + fb_id
    }).then(response => response.data);
  }

  this.submitReview = review => {
    console.log(review);
    return $http({
      method: 'POST',
      url: '/comments',
      data: review
    }).then(response => response.data);
  };

  this.editReview = edit => {
    console.log(edit);
    return $http({
      method: 'GET',
      url: '/update/' + edit.mdb_id + '/' + edit.fb_id
    }).then(response => response.data);
  };
  this.getUserReviews2 = id => {
    return $http({
    method: 'GET',
    url: '/user_reviews2' + '/' + id.id
  }).then(response => response.data);
};
  this.getUser = () => {
    return $http({
      method: 'GET',
      url: '/user'
    }).then(response => response);
  };

  this.logoutUser = () => {
    return $http({
      method: 'GET',
      url: '/logout'
    }).then(response => response);
  };
  //people page STUFF
  this.getPersonDetails = person_id => {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/person/' + person_id + '?api_key=8eecf03080f34edf303e14b5f1476653&language=en-US'
    }).then(response => response.data);
  };
  this.getPersonMovieCredits = person_id => {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/person/' + person_id + '/movie_credits?api_key=8eecf03080f34edf303e14b5f1476653&language=en-US'
    }).then(response => response.data);
  };
  this.getKnownFor = person_name => {
    return $http({
    method: 'GET',
    url: 'https://api.themoviedb.org/3/search/person?api_key=8eecf03080f34edf303e14b5f1476653&language=en-US&query=' + person_name + '&page=1&include_adult=false'
  }).then(response => response.data);
};
});
