angular.module('flixApp').service('mainSvc', function($http){

  var tmsapi = 'tx8g3c9h9ca737eh3y7sw66v';
  var mdbapi = '8eecf03080f34edf303e14b5f1476653';
  var guideboxapi = 'rKsvLMllrJ7ebTRG3cMa5smyjptG5sDJ';
//HOME PAGE SECTION
  //get popular for home page billboard and row
  this.getPopular = () => {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/popular?api_key='+ mdbapi +'&language=en-US'
    }).then(response => response.data.results);
      console.log(response.data.results);
  };
  //getting details on mdb for billboard
  this.getPopularDetails = id => {
    console.log(id.id);
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/' + id.id + '?api_key='+ mdbapi +'&language=en-US&append_to_response=undefined'
    }).then(response => response.data);
      console.log(response);
  };
  //getting details on omdb for billboard
  this.getPopImdb = imdb_id => {
    console.log(imdb_id.id);
    return $http({
      method: 'GET',
      url: 'https://www.omdbapi.com/?i=' + imdb_id.id
    }).then(response => response.data);
      console.log(response);
  };
  //getting now playing row
  this.getNowPlaying = function(){
    return $http({
      method:'GET',
      url: 'https://api.themoviedb.org/3/movie/now_playing?api_key='+ mdbapi +'&language=en-US'
    }).then(response => response.data.results);
      console.log(response.data);
  };
  //getting page 2 of now playing
  this.getNowPlaying2 = () => {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/now_playing?api_key='+ mdbapi +'&language=en-US&page=2'
    }).then(response => response.data.results);
  };
  //getting comming soon for row
  this.getComingSoon = function(){
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/upcoming?api_key='+ mdbapi +'&language=en-US'
    }).then(function(response){
      //console.log(response.data);
      return response.data.results;
    })
  }
  //getting page 2 for coming soon
  this.getComingSoon2 = () => {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/upcoming?api_key='+ mdbapi +'&language=en-US&page=2'
    }).then(response => response.data.results);
  };
  //DETAILS SECTION
  //getting detail of movie from mdb
  this.getDetails = id => {
    return $http({
      method:'GET',
      url: 'https://api.themoviedb.org/3/movie/'+ id + '?api_key='+ mdbapi +'&language=en-US&append_to_response=undefined'
    }).then(response => response.data);
      console.log(response.data);
  };
  //getting omdb details for movie
  this.getImdb = imdb_id => {
    console.log(imdb_id);
    return $http({
      method:'GET',
      url: 'https://www.omdbapi.com/?i=' + imdb_id
    }).then(response => response.data);
      console.log('imdb_deets', response);
  };
  //get videos for details page from mdb
  this.getVideos = imdb_id => {
    return $http({
      method:'GET',
      url:'https://api.themoviedb.org/3/movie/'+ imdb_id +'/videos?api_key=' + mdbapi
    }).then(response => response.data.results);
  };
  //getting cast for movie from mdb
  this.getCast = imdb_id => {
    return $http({
      method: 'GET',
      url:'https://api.themoviedb.org/3/movie/'+ imdb_id +'/credits?api_key=' + mdbapi
    }).then(response => response.data);
  };
  //getting credits for movie detail
  this.getCredits = id => {
    return $http({
      url: 'https://api.themoviedb.org/3/movie/'+ id +'/credits?api_key=' + mdbapi
    }).then(function(response){
      return response.data;
    });
  };
  //getting similar movies for movie detail
  this.getSimilars = imdb_id => {
    return $http({
      method:'GET',
      url:'https://api.themoviedb.org/3/movie/' + imdb_id + '/similar?api_key='+ mdbapi +'&language=en-US'
    }).then(response => response.data.results);
      console.log(response.data);
  };
  this.getRecommendations = id => {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/' + id + '/recommendations?api_key='+ mdbapi +'&language=en-US&page=1'
    }).then(response => response.data.results);
  }
  //getting guidebox info using mdb id
  this.getGuideBox = id => {
    return $http({
      method: 'GET',
      url: 'https://api-public.guidebox.com/v1.43/US/'+ guideboxapi +'/search/movie/id/themoviedb/' + id
    }).then(response => response.data);
      console.log('guidebox', response.data)
  };
  //getting the guidbox detail id to get detailed information
  this.getGuideBoxDetails = id => {
    return $http({
      method: 'GET',
      url: 'https://api-public.guidebox.com/v1.43/US/'+ guideboxapi +'/movie/' + id
    }).then(response => response.data);
  };
  this.getImages = imdb_id => {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/' + imdb_id + '/images?api_key=' + mdbapi
    }).then(response => response.data);
  };
  this.getUserReviews = mdb_id => {
    return $http({
      method: 'GET',
      url: '/user_reviews/' + mdb_id
    }).then(response => response.data);
  };
//SEARCH VIEW
  //get search based on term
  this.getSearchMovie = term =>{
    return $http({
      method:'GET',
      url: 'https://api.themoviedb.org/3/search/movie?api_key='+ mdbapi +'&language=en-US&query=' + term
    }).then(response => response.data.results);
  };
  //get people based on term
  this.getPeople = term =>{
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/person?api_key='+ mdbapi +'&language=en-US&query=' + term + '&page=1&include_adult=false'
    }).then(response => response.data.results);
    //function(response);
  };
  this.getUsers = term => {
    return $http({
      method:'GET',
      url: '/users/' + term
    }).then(function(response){
      console.log('users', response);
      return response.data;
    });
  }
//DATABASE STUFF
  //adding movie to favorites list
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
  this.getShowtimes = function(date, zip){
    return $http({
      method: 'GET',
      url: 'https://data.tmsapi.com/v1.1/movies/showings?startDate=' + date + '&zip=' + zip + '&api_key=' + tmsapi
    }).then(function(response){
      return response.data;
    });
  }
  this.getTheatersInArea = function(zip){
    return $http({
      method: 'GET',
      url: 'http://data.tmsapi.com/v1.1/theatres?zip=' + zip + '&radius=20&api_key=' + tmsapi
    }).then(function(response){
      return response.data;
    });
  }
  this.getTheater = function(theaterId, date){
    return $http({
      method: 'GET',
      url: 'http://data.tmsapi.com/v1.1/theatres/' + theaterId.id + '/showings?startDate=' + date + '&imageSize=Lg&imageText=true&api_key=' + tmsapi
    }).then(response => {
      return response.data;
    })
  }
  this.getTheaterDetails = function(theaterId){
    return $http({
      method: 'GET',
      url: 'http://data.tmsapi.com/v1.1/theatres/' + theaterId.id + '?api_key=' + tmsapi
    }).then(function(response){
      return response.data;
    });
  }
  //people page STUFF
  this.getPersonDetails = person_id => {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/person/' + person_id + '?api_key='+ mdbapi +'&language=en-US'
    }).then(response => response.data);
  };
  this.getPersonMovieCredits = person_id => {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/person/' + person_id + '/movie_credits?api_key='+ mdbapi +'&language=en-US'
    }).then(response => response.data);
  };
  this.getKnownFor = person_name => {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/person?api_key='+ mdbapi +'&language=en-US&query=' + person_name + '&page=1&include_adult=false'
    }).then(response => response.data);
  };
  this.getPersonImages = person_id => {
    return $http({
      method:'GET',
      url: 'https://api.themoviedb.org/3/person/'+ person_id +'/tagged_images?api_key=' + mdbapi +'&language=en-US&page=1'
    }).then( response => response.data.results);
  };
  this.getPersonImages2 = person_id => {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/person/'+ person_id +'/tagged_images?api_key=' + mdbapi +'&language=en-US&page=2'
    }).then(response => {
      console.log('people img 2', response.data.results);
      return response.data.results;
    });
  };
  this.getPersonImages3 = person_id => {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/person/'+ person_id +'/tagged_images?api_key=' + mdbapi +'&language=en-US&page=3'
    }).then(response => {
      console.log('people img 3', response.data.results);
      return response.data.results;
    });
  };
  this.getPersonImages4 = person_id => {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/person/'+ person_id +'/tagged_images?api_key=' + mdbapi +'&language=en-US&page=4'
    }).then(response => {
      console.log('people img 3', response.data.results);
      return response.data.results;
    });
  };
});
