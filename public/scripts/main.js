$(document).ready(function(){
  // $(this).scrollTop(0);
  var poster = document.getElementsByClassName('poster');

  $('.overview-wrapper').click(function(){
  });

  $('.slick-next').click(function(){
    $('#now-playing').animate({marginLeft: "-=500px"}, "fast");
  });

  // $('.search img').on('click', function(){
  //   $('input').val("");
  // });

  $('.search input').keyup(function(){
    $('.search img').click();
  });
  $('.search-mobile input').keyup(function(){
    $('.search-mobile img').click();
  });

//   $("#showtime-search").keyup(function(event){
//     if(event.keyCode == 13){
//         $(".showtime-input img").click();
//     }
// });

  $('.search-content').on('click', function(){
    $('#input-search input[type="text"]').val(" ");
  });

  $('.search img').click(function(){
    if($('input').val().length === 0){
      $('.search-wrapper').hide();
    } else {
        $('.search-wrapper').show();
      }
  });

  $('#left-now-playing').click(function(){
    $('#now-playing').css({'margin-left' : '-1590px'});
  });
  $('#right-now-playing').click(function() {
    $('#now-playing').removeAttr('style');
  })

});

// function initMap() {
//         var uluru = {lat: -25.363, lng: 131.044};
//         var map = new google.maps.Map(document.getElementById('map'), {
//           zoom: 4,
//           center: uluru
//         });
//         var marker = new google.maps.Marker({
//           position: uluru,
//           map: map
//         });
//       }

angular.module('flixApp', [
  'ui.router', 
  'watchlistCardDirective',
  'watchedCardDirective',
  'favoritesCardDirective'
  ])

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
  }).state('user', {
    templateUrl: 'views/user.html',
    url: '/user/:id',
    controller: 'userCtrl'
  });


  $urlRouterProvider.otherwise('/');
});

angular.module('flixApp').controller('mainCtrl', function($scope, mainSvc){
  $scope.colorPicker = function(rating){
    if(rating >= 7){
      return 'green';
    }
    else if(rating >= 4){
      return 'orange';
    }
    else if(rating >= 0){
      return 'red';
    }
  }

  var id = {}
  var imdb_id = {}

  $scope.getPopular = () => {
    mainSvc.getPopular().then(response => {
      // console.log($scope.populars);

      $scope.popular = response[0];
      var result = []
      for(var i = 0; i < 7; i++){
        result.push(response[i]);
      }
      $scope.populars = response;
      // console.log($scope.popular);

      id.id = response[0].id;
        // console.log(id);
          $scope.getPopularDetails(id);
    });
  }

  $scope.getPopularDetails = id => {
    mainSvc.getPopularDetails(id).then(response => {
      $scope.popularDetail = response;
      // console.log('popDeets', $scope.popularDetail);
      $scope.companies = response.production_companies;
      imdb_id.id = response.imdb_id;
      // console.log(imdb_id);
      $scope.getPopImdb(imdb_id);
    })
  }

  $scope.getPopImdb = imdb_id => {
    mainSvc.getPopImdb(imdb_id).then(response => {
      $scope.imdb_detail = response;
    });
  }

  $scope.getPopular();

  $scope.getNowPlaying = () => {
    mainSvc.getNowPlaying().then(response => {
      $scope.getNowPlaying2 = () => {
      mainSvc.getNowPlaying2().then(response => {
        $scope.nowPlaying2 = response;
      });
    }
      $scope.getNowPlaying2();

      response.sort(function (a, b) {
        if (a.release_date < b.release_date) {
          return 1;
        }
        if (a.release_date > b.release_date) {
          return -1;
        }
        return 0;
        });

      $scope.nowPlaying = response;
      // console.log('now playing', $scope.nowPlaying);
    });
  }
  $scope.getNowPlaying();


  $scope.getComingSoon = () => {
    mainSvc.getComingSoon().then(response => {
      var masterComingSoon = [];

      for(var i = 0; i < response.length; i++){
        masterComingSoon.push(response[i]);
      }

      masterComingSoon.sort(function (a, b) {
        if (a.release_date < b.release_date) {
          return 1;
        }
        if (a.release_date > b.release_date) {
          return -1;
        }
        return 0;
        });
      $scope.comingSoon = masterComingSoon;

      // console.log('master coming soon', $scope.comingSoon);
    })
  }
  $scope.getComingSoon();


  //SEARCH VIEW
  $scope.getSearch = term => {
    $scope.getPeople(term);
    // $scope.getTheatersInArea(term);
    $scope.getUsers(term);
    // console.log('search', term);
    mainSvc.getSearchMovie(term).then(response => {
      for(var i = 0; i < response.length; i++){
        response[i].release_date = response[i].release_date.substring(0, 4);
      }
      $scope.movieSearch = response;
      // console.log($scope.movieSearch);
    });
  };
  $scope.getPeople = term => {
    mainSvc.getPeople(term).then(response => {
      $scope.person = response;
      // console.log('PERSON SEARCH', $scope.person);
    });
  }
   $scope.getTheatersInArea = term => {
    // console.log('get theaters', term);
    mainSvc.getTheatersInArea(term).then(function(response){
      $scope.theaters = response;
      // console.log('theaters', $scope.theaters);
    })
  }
  $scope.getUsers = term => {
    // console.log('get users', term);
    mainSvc.getUsers(term).then(function(response){
      $scope.users = response;
    });
  }

  //MYLIST VIEW
      var fb_id;

  $scope.logoutUser = () => {
    mainSvc.logoutUser().then(response => {

      // console.log(response);
      if (!response.data.user) {
        $scope.user = null;
        fb_id = null;
        $scope.getWatch();
        // console.log('logout getWatch');
      }

    })
  }
    mainSvc.getUser().then(response => {
      if(response.data){
        // console.log('user', response.data);
        $scope.user = response.data;
        fb_id = response.data.fb_id;
        // console.log(fb_id);
          $scope.getFavs(fb_id);
          $scope.getWatch(fb_id);
          $scope.getWatched(fb_id);
          $scope.getReviews(fb_id);
      }
    });

  $scope.getFavs = () => {
 
    mainSvc.getFavs(fb_id).then(response => {
      $scope.favorites = response;
      
    });
  }

  $scope.getWatched = () => {
    mainSvc.getWatched(fb_id).then(response => {
      $scope.watched = response;
    });
  }

  $scope.getWatched();

  var watchlist

  $scope.getWatch = () => {
      // console.log('$scope.getWatch fired')
    mainSvc.getWatch(fb_id).then(response => {
      $scope.watch = response;
      // console.log('WATCHLIST', $scope.watch);
      // console.log('mainSvc.getWatch fired')

      // console.log('watchlist', $scope.watch);
      // watchlist = response;
    });
  }
  // $scope.getWatch(fb_id);

  $scope.updateWatched = function(mdb_id, fb_id){
    var id = {};
    id.id = mdb_id;
    id.fb_id = fb_id;
    console.log(id);
    mainSvc.updateWatched(id).then(response => {
      $scope.getWatched();
      $scope.getWatch();
    });
  }

  $scope.updateFav = function(mdb_id, fb_id){
    var id = {}
    id.id = mdb_id;
    id.fb_id = fb_id;
    // console.log(id);
    mainSvc.updateFav(id).then(response => {
      // console.log('your list is updated');
      $scope.getFavs();
      $scope.getWatched();
      $scope.getWatch();
    });
  }

  $scope.delete = function(mdb_id, fb_id, id){
    var del_id = {}
    del_id.id = mdb_id;
    del_id.fb_id = fb_id;
    del_id.id2 = id;
    // console.log(del_id);
    mainSvc.delete(del_id).then(response => {
      // console.log('movie deleted');
      $scope.getFavs();
      $scope.getWatched();
      $scope.getWatch();
    });
  }
  $scope.deleteReview = function(mdb_id, fb_id, id){
    var del_id = {}
    del_id.id = mdb_id;
    del_id.fb_id = fb_id;
    del_id.id2 = id;
    // console.log(del_id);
    mainSvc.deleteReview(del_id).then(response => {
      $scope.getReviews(fb_id);
      // console.log('movie deleted');
    });
  }

  //reviews
  $scope.addToReviews = function(film, name){
    film.user_name = name;
    // console.log(film);
    mainSvc.addToReviews(film).then(response => {
      $scope.reviews = response;
      $scope.getReviews(fb_id);
    });
  }

  $scope.getReviews = fb_id => {
    mainSvc.getReviews(fb_id).then(response => {
      // for(var i = 0; i < response.length; i++){
      //   response[i].rating = Number(response[i].rating);
      // }
      for(var i = 0; i < response.length; i++){
        response[i].reviewColor = $scope.colorPicker(response[i].rating);
      }
      $scope.reviews = response;
      // console.log('REVIEWS', $scope.reviews);
    });
  }


    $scope.editReview = function(mdb_id, fb_id){
      var edit = {};
      edit.mdb_id = mdb_id;
      edit.fb_id = fb_id;
      // console.log(edit);
      mainSvc.editReview(edit).then(response => {
        $scope.reviewToEdit = response;
        // console.log('review to edit', $scope.reviewToEdit);

        $scope.comments = response[0].review;
        $scope.tagline = response[0].tagline;
        $scope.author = response[0].author;
        $scope.rating = Number(response[0].rating);
      });
    };


});

angular.module('flixApp').service('mainSvc', function($http){

// var config = require('./../../server/config');

var tmsapi = 'tx8g3c9h9ca737eh3y7sw66v';
var mdbapi = '8eecf03080f34edf303e14b5f1476653';
var guideboxapi = 'rKsvLMllrJ7ebTRG3cMa5smyjptG5sDJ';
var omdbapi = '752618d';
  
//HOME PAGE SECTION
  //get popular for home page billboard and row
  this.getPopular = () => {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/popular?api_key='+ mdbapi +'&language=en-US'
    }).then(response => response.data.results);
  };
  //getting details on mdb for billboard
  this.getPopularDetails = id => {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/' + id.id + '?api_key='+ mdbapi +'&language=en-US&append_to_response=undefined'
    }).then(response => response.data);
  };
  //getting details on omdb for billboard
  this.getPopImdb = imdb_id => {
    return $http({
      method: 'GET',
      url: 'https://www.omdbapi.com/?i=' + imdb_id.id + '&apikey=' + omdbapi
    }).then(response => response.data);
  };
  //getting now playing row
  this.getNowPlaying = function(){
    return $http({
      method:'GET',
      url: 'https://api.themoviedb.org/3/movie/now_playing?api_key='+ mdbapi +'&language=en-US'
    }).then(response => response.data.results);
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
  };
  //getting omdb details for movie
  this.getImdb = imdb_id => {
    return $http({
      method:'GET',
      url: 'https://www.omdbapi.com/?i=' + imdb_id + '&apikey=' + omdbapi
    }).then(response => response.data);
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
      return response.data;
    });
  }
//DATABASE STUFF
  //adding movie to favorites list
  this.addToFav = fav => {
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
  };

  this.addToWatch = fav => {
    return $http({
      method: 'POST',
      url: '/watchlist',
      data: fav
    }).then(response => response.data);
  };
  this.getWatch = fb_id => {
    return $http({
      method: 'GET',
      url: '/watchlist/' + fb_id
    }).then(response => response.data);
  };
  this.updateFav = id => {

    return $http({
      method: 'PUT',
      url: '/update',
      data: id
    }).then(response => response);
  };
  this.updateWatched = id => {
    return $http({
      method: 'PUT',
      url: '/update_watched',
      data: id
    }).then(response => response);
  }
  this.delete = del_id => {
    return $http({
      method:'DELETE',
      url: '/delete/' + del_id.id + '/' + del_id.fb_id + '/' + del_id.id2
    }).then(response => response);
  };

  this.deleteReview = del_id => {
    return $http({
      method: 'DELETE',
      url: '/deletereview/' + del_id.id + '/' + del_id.fb_id + '/' + del_id.id2
    }).then(response => response);
  };

  this.addToReviews = film => {
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
    return $http({
      method: 'POST',
      url: '/comments',
      data: review
    }).then(response => response.data);
  };

  this.editReview = edit => {
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
      url: 'http://data.tmsapi.com/v1.1/theatres?zip=' + zip + '&radius=20&api_key=' + config.tmsapi
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
      url: 'http://data.tmsapi.com/v1.1/theatres/' + theaterId.id + '?api_key=' + config.tmsapi
    }).then(function(response){
      return response.data;
    });
  }
  //people page STUFF
  this.getPersonDetails = person_id => {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/person/' + person_id + '?api_key='+ config.mdbapi +'&language=en-US'
    }).then(response => response.data);
  };
  this.getPersonMovieCredits = person_id => {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/person/' + person_id + '/movie_credits?api_key='+ config.mdbapi +'&language=en-US'
    }).then(response => response.data);
  };
  this.getKnownFor = person_name => {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/person?api_key='+ config.mdbapi +'&language=en-US&query=' + person_name + '&page=1&include_adult=false'
    }).then(response => response.data);
  };
  this.getPersonImages = person_id => {
    return $http({
      method:'GET',
      url: 'https://api.themoviedb.org/3/person/'+ person_id +'/tagged_images?api_key=' + config.mdbapi +'&language=en-US&page=1'
    }).then( response => response.data.results);
  };
  this.getPersonImages2 = person_id => {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/person/'+ person_id +'/tagged_images?api_key=' + config.mdbapi +'&language=en-US&page=2'
    }).then(response => {
      return response.data.results;
    });
  };
  this.getPersonImages3 = person_id => {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/person/'+ person_id +'/tagged_images?api_key=' + config.mdbapi +'&language=en-US&page=3'
    }).then(response => {
      return response.data.results;
    });
  };
  this.getPersonImages4 = person_id => {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/person/'+ person_id +'/tagged_images?api_key=' + config.mdbapi +'&language=en-US&page=4'
    }).then(response => {
      return response.data.results;
    });
  };
  //user data
  this.getUserData = id =>{
    return $http({
      method: 'GET',
      url: '/user/' + id.id,
    }).then(response => {
      return response.data;
    });
  };
  this.getUserInfo = id => {
    return $http({
      method: 'GET',
      url: '/userinfo/' + id.id,
    }).then(response => {
      return response.data;
    });
  }
});

angular.module('flixApp').controller('editCtrl', function($scope, mainSvc, $stateParams){
  var id = $stateParams.id;

  $scope.getEditDetails = function(id){
    mainSvc.getDetails(id).then(function(response){
      $scope.editDetails = response;

    });
  }
  $scope.getEditDetails(id);

  $scope.submitReview = function(tagline, author, comments, rating, fb_id){
    var review = {}
    review.tagline = tagline;
    review.author = author;
    review.review = comments;
    review.mdb_id = id;
    review.rating = rating;
    review.fb_id = fb_id;
    mainSvc.submitReview(review).then(function(response){
      $scope.getReviews(fb_id);
    });
  };

});

angular.module('flixApp').controller('detailsCtrl', function($scope, $stateParams, mainSvc, $sce){
  var id = $stateParams.id;
  $scope.trustSrc = function(link) {
  return $sce.trustAsResourceUrl(link);
};

var fb_id;
var user_name;

$scope.getFbUser = function(){
  mainSvc.getUser().then(function(response){
      fb_id = response.data.fb_id;
      user_name = response.data.name
});
}
$scope.getFbUser();

//putting film into object on fav
var fav;

  $scope.getDetails = id => {
    mainSvc.getDetails(id).then(response => {
      var imdb_id = response.imdb_id;
      fav = response;
      $scope.id = response;
      $scope.detail = response;
      $scope.production_companies = response.production_companies;
      $scope.getImdb(imdb_id);
      $scope.getVideos(imdb_id);
      $scope.getCast(imdb_id);
      $scope.getSimilars(imdb_id);
      $scope.getRecommendations(id);
      $scope.getImages(imdb_id);
      $scope.getGuideBox(response.id);
      $scope.getUserReviews(response.id);
    });
  }
  $scope.getDetails(id);

  var metascore;
  $scope.getImdb = imdb_id => {
    mainSvc.getImdb(imdb_id).then(response => {
      $scope.imdb = response;
      console.log($scope.imdb);
      metascore = response.Metascore;
    });
  }

  $scope.getVideos = imdb_id => {
    mainSvc.getVideos(imdb_id).then(response => {
      var links = []
      for(var i = 0; i < response.length; i++){
        links.push('https://www.youtube.com/embed/' + response[i].key);
      }
      $scope.videos = links;
    })
  }
  $scope.shiftLeft = function(){
    let container = document.getElementsByClassName('videos-container')[0];
    container.scrollLeft += container.offsetWidth;
  }
  $scope.shiftRight = function(){
    let container = document.getElementsByClassName('videos-container')[0];
    container.scrollLeft -= container.offsetWidth;
  }
  $scope.getCast = imdb_id => {
    mainSvc.getCast(imdb_id).then(response => {
      var newCast = [];
      for(var i = 0; i < 7;i++){
        newCast.push(response.cast[i]);
      }
      $scope.cast = newCast;
      var crew = response.crew;

      var director = crew.filter(function(crew){
        return crew.job === 'Director' && crew.department === 'Directing';
      });
      $scope.director = director;
      $scope.crew = response.crew2;
    });
  }
  $scope.getImages = imdb_id => {
    mainSvc.getImages(imdb_id).then(response => {
      // for(var i = 0; i < response.backdrops.length; i++){
      //    response.backdrops[i].file_path = 'https://image.tmdb.org/t/p/original' + response.backdrops[i].file_path
      // };
      if(response.backdrops.length > 1){
        $scope.secondBackdrop = response.backdrops[1]
      } else {
        $scope.secondBackdrop = response.backdrops[0];
      }
      $scope.backDrops = response.backdrops;
    });
  }
  $scope.getSimilars = imdb_id => {
    mainSvc.getSimilars(imdb_id).then(response => {
      $scope.similar = response;
    });
  }
  $scope.getRecommendations = id => {
    mainSvc.getRecommendations(id).then(function(response){
      $scope.recommendations = response;
    })
  }
  $scope.getGuideBox = id => {
    mainSvc.getGuideBox(id).then(response => {
      var gb_id = response.id
      $scope.getGuideBoxDetails(gb_id);
    });
  }
  $scope.getGuideBoxDetails = gb_id => {
    mainSvc.getGuideBoxDetails(gb_id).then(response => {
      function metaColor(response, metascore){
        if(metascore >= 60){
          response.metaColor = '#66CC33';
        }
        else if(metascore >= 30){
          response.metaColor = '#FFCC33';
        }
        else if(metascore >= 0){
          response.metaColor = '#FF0000';
        }
      }
      metaColor(response, metascore);
      $scope.guidebox = response;
      var webPurchase = response.purchase_web_sources;
      var result = webPurchase.filter(webPurchase => {
        return webPurchase.source === "google_play" || webPurchase.source === "itunes"; //webPurchase.source === "amazon_buy";
      });
      if(result[0]){
        result[0].img = "https://smoothjazzandmore.files.wordpress.com/2016/07/itunes-button.png";
      }
      // result[1].img = "https://static1.squarespace.com/static/54d05749e4b08a66f8bde05e/569c35d505caa74dde794ce3/569c35e81115e0984d256776/1453078092910/available-on-amazon.png";
      if(result[1]){
        result[1].img = "https://vignette2.wikia.nocookie.net/implosion/images/7/74/Google_play.png/revision/latest?cb=20150411081733";
        $scope.guideboxPurchases = result;
      }
    });
  }
  $scope.getUserReviews = mdb_id => {
    mainSvc.getUserReviews(mdb_id).then(response => {
      // for(var i = 0; i < response.length; i++){
      //   response[i].photo = "https://scontent.xx.fbcdn.net/t31.0-1/10457710_" + response[i].fb_id + '_7996853287290615145_o.jpg'
      // }
      for(var i = 0; i < response.length; i++){
        response[i].reviewColor = $scope.colorPicker(response[i].rating);
      }
      $scope.userReviews = response;
    });
  }
  $scope.getShowtimes = function(zip, date){
    var date = date.toISOString().substring(0, 10);
    $scope.getTheatersInArea(zip);
    mainSvc.getShowtimes(date, zip).then(function(response){
      var currentFilm = fav.title;
      var currentFilmShowTimes = [];
      for(var i = 0; i < response.length; i++){
        if(response[i].title.includes(currentFilm)){
          currentFilmShowTimes.push(response[i]);
        }
      }

      $scope.title1 = currentFilmShowTimes[0];
      $scope.title2 = currentFilmShowTimes[1];
      $scope.title3 = currentFilmShowTimes[2];
      $scope.showtimes = currentFilmShowTimes;
      var showings = [];
      for(var j = 0; j < currentFilmShowTimes.length; j++){
        showings.push(currentFilmShowTimes[j].showtimes);
      }
      // for(var k = 0; k < showings.length; k++){
      //   showings[k].dateTime.substring(11, 15);
      // }
      $scope.showings1 = showings[0];
      $scope.showings2 = showings[1];
      $scope.showings3 = showings[2];
    });
  }
  $scope.getShowTimesFunc = $event => {
    if ($event.keyCode == 13) {
      $scope.getShowtimes($scope.zip);
    }
  }
  $scope.getTheatersInArea = (zip) => {
    mainSvc.getTheatersInArea(zip).then(function(response){
      $scope.theaters = response;
    })
  }
  //DETAIL AND WATCH LIST BUTTONS
  $scope.addToFav = () => {
    fav.fb_id = fb_id;
    $scope.showModal = true;
    mainSvc.addToFav(fav).then(response => {
      $scope.getFavs();

      var current = false;
      for(var i = 0; i < $scope.favorites.length; i++){
        if($scope.favorites[i].id === fav.id){
          current = true;
        }
      }

      $scope.currentFilm = current;
    })
  };
  $scope.addToWatch = () => {
    $scope.showModalwatchlist = true;
    fav.fb_id = fb_id;
    mainSvc.addToWatch(fav).then(response => {
      $scope.getWatch();
    });
  };
  $scope.addToWatched = () => {
    $scope.showModalwatch = true;
    fav.fb_id = fb_id;
    mainSvc.addtoWatched(fav).then(response => {
      $scope.getWatched();
    });
  }
});

angular.module('flixApp').controller('creditsCtrl', function($scope, $stateParams, mainSvc){
  var id = $stateParams.id;

  $scope.getCredits = () => {
    mainSvc.getCast(id).then(function(response){
      $scope.cast = response.cast;
      $scope.crew = response.crew;
      $scope.numCredits = response.cast.length + response.crew.length;

      for(var i = 0; i < response.cast.length; i++){
        response.cast[i].firstLetter = response.cast[i].name[0];
      }

      var crew = response.crew

      var directing = crew.filter(function(crew){
        return crew.department === 'Directing';
      });
      var writing = crew.filter(function(crew){
        return crew.department === 'Writing';
      })
      var camera = crew.filter(function(crew){
        return crew.department === 'Camera';
      })
      var art = crew.filter(function(crew){
        return crew.department === 'Art';
      })
      var production = crew.filter(function(crew){
        return crew.department === 'Production';
      });
      var sound = crew.filter(function(crew){
        return crew.department === 'Sound';
      });
      var visualEffects = crew.filter(function(crew){
        return crew.department === 'Visual Effects';
      });
      var editorial = crew.filter(function(crew){
        return crew.department === 'Editorial Staff';
      });
      var lighting = crew.filter(function(crew){
        return crew.department === 'Lighting';
      });
      var crewDep = crew.filter(function(crew){
        return crew.department === 'Crew';
      })
      var editing = crew.filter(function(crew){
        return crew.department === 'Editing';
      });
      $scope.directing = directing;
      $scope.writing = writing;
      $scope.camera = camera;
      $scope.art = art;
      $scope.production = production;
      $scope.sound = sound;
      $scope.visualEffects = visualEffects;
      $scope.editorial = editorial;
      $scope.lighting = lighting;
      $scope.crewDep = crewDep;
      $scope.editing = editing;


      $scope.getDetails(id);
    });
  }

  $scope.getCredits();
  $scope.getDetails = function(){
    mainSvc.getDetails(id).then(function(response){
      $scope.creditDetails = response;
    });
  };
});

angular.module('flixApp').controller('loginCtrl', function($scope, mainSvc){

});

angular.module('flixApp').controller('peopleCtrl', function($scope, $stateParams, mainSvc){
  var person_id = $stateParams.id;
  // console.log(person_id);

  $scope.getPersonDetails = person_id => {
    mainSvc.getPersonDetails(person_id).then(response => {
      var person_name = response.name
      response.firstLetter = response.name[0];

      $scope.personDetail = response;
      // console.log($scope.personDetail);
      $scope.getKnownFor(person_name);
    });
    }
  $scope.getPersonDetails(person_id);

  $scope.getKnownFor = person_name => {
    mainSvc.getKnownFor(person_name).then(response => {
      $scope.knownFor = response.results[0].known_for;
      // console.log('Known for', $scope.knownFor);
      $scope.firstKnown = response.results[0].known_for[0];
      // console.log('first knwon', $scope.firstKnown);
    });
  }
  
  $scope.getPersonImages = (person_id, cycle) => {
    mainSvc.getPersonImages(person_id).then(response => {
      
      cycle(response);

      let personBackdrops1 = response;
      let personBackdrops = personBackdrops1.filter(function(personBackdrops1){
        return personBackdrops1.image_type === 'backdrop'
      })
      //sorts images by movie title
      personBackdrops.sort(function (a, b) {
        if (a.media.title > b.media.title) {
          return 1;
        }
        if (a.media.title < b.media.title) {
          return -1;
        }
        return 0;
        });

      $scope.personImg = personBackdrops;
      // console.log('person img', $scope.personImg);
    })
  } 
  ;
  function cycle(response){
    var count;
        if(count === response.length - 1){
          count = 0;
        } else if(count === 0){
          count = count + 1;
        }
        // console.log(count);
      $scope.personBG = response[3]
      // console.log('bg', $scope.personBG);
      }
  $scope.getPersonImages(person_id, cycle);

  $scope.getPersonImages2 = (person_id) => {
    mainSvc.getPersonImages2(person_id).then(function(response){
      let personBackdrops2 = response.filter(function(response){
        return response.image_type === 'backdrop';
      });
      //sorts images by movie title
      personBackdrops2.sort(function (a, b) {
        if (a.media.title > b.media.title) {
          return 1;
        }
        if (a.media.title < b.media.title) {
          return -1;
        }
        return 0;
        });
      $scope.personImg2 = personBackdrops2;
    });
  }
  $scope.getPersonImages2(person_id);

  $scope.getPersonImages3 = (person_id) => {
    mainSvc.getPersonImages3(person_id).then(function(response){
      let personBackdrops3 = response.filter(function(response){
        return response.image_type === 'backdrop';
      });
      //sorts images by movie title
      personBackdrops3.sort(function (a, b) {
        if (a.media.title > b.media.title) {
          return 1;
        }
        if (a.media.title < b.media.title) {
          return -1;
        }
        return 0;
        });
      $scope.personImg3 = personBackdrops3;
    });
  }
  $scope.getPersonImages3(person_id);

  $scope.getPersonImages4 = (person_id) => {
    mainSvc.getPersonImages4(person_id).then(function(response){
      let personBackdrops4 = response.filter(function(response){
        return response.image_type === 'backdrop';
      });
      //sorts images by movie title
      personBackdrops4.sort(function (a, b) {
        if (a.media.title > b.media.title) {
          return 1;
        }
        if (a.media.title < b.media.title) {
          return -1;
        }
        return 0;
        });
      $scope.personImg4 = personBackdrops4;
    });
  }
  $scope.getPersonImages4(person_id);
  

  $scope.getPersonMovieCredits = person_id => {

    mainSvc.getPersonMovieCredits(person_id).then(response => {
      $scope.credNum = response.cast.length + response.crew.length;

      var personCast = response.cast;
      var crew = response.crew;
      // console.log('person crew', personCrew);
      // for(var i = 0; i < personCast.length; i++){
      //   personCast[i].release_date = personCast[i].release_date.substring(0, 4);
      // }

      personCast.sort(function (a, b) {
        if (a.release_date < b.release_date) {
          return 1;
        }
        if (a.release_date > b.release_date) {
          return -1;
        }
  // a must be equal to b
        return 0;
        });



      var personCrew = response.crew;
      personCrew.sort(function (a, b) {
        if (a.release_date < b.release_date) {
          return 1;
        }
        if (a.release_date > b.release_date) {
          return -1;
        }
  // a must be equal to b
        return 0;
        });


        $scope.personCast = personCast;

        // var newCrew = [];
        //
        // for(var i = 0; i < crew.length; i++){
        //   console.log(crew[i].id);
        //   if(crew[i].id !== crew[i + 1].id){
        //     newCrew.push(crew[i]);
        //   }
        // }
        // console.log(newCrew);

        $scope.crew = crew;
        // console.log($scope.personCast);
      // console.log('person movie cred', $scope.personCrew, $scope.personCast);
    });
  }
  $scope.getPersonMovieCredits(person_id);

});

angular.module('flixApp').controller('searchCtrl', function($scope, mainSvc){



});

angular.module('flixApp').controller('mylistCtrl', function($scope, mainSvc){



  $scope.getFavs = function(){
    mainSvc.getFavs().then(function(response){
      $scope.favorites = response;
    });
  }

  $scope.getFavs();

});

angular.module('flixApp').controller('theaterCtrl', function($scope, mainSvc, $stateParams, $sce){
    var theaterId = $stateParams;

    $scope.trustSrc = function(map) {
        return $sce.trustAsResourceUrl(map);
    };

    if(!$scope.date){
    var date = new Date().toISOString().substring(0, 10);
    }

    $scope.getTheater = function(date){
        
        if($scope.date){
        var date = $scope.date.toISOString().substring(0, 10);
        }
        $scope.day = date;
        mainSvc.getTheater(theaterId, date).then(function(response){
        response.sort(function (a, b) {
        if (a.title < b.title) {
          return 1;
        }
        if (a.title > b.title) {
          return -1;
        }
  // a must be equal to b
        return 0;
        });
        $scope.theater = response;
        $scope.getTheaterDetails();
      });
    }
    $scope.getTheaterDetails = function(){
        mainSvc.getTheaterDetails(theaterId).then(function(response){
            $scope.map = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyBG1FaMjyrJZWHUprmlMrpZBIwq_TH-hNs&q=' + response.name;
            $scope.theaterDetails = response;
        })
    }

    $scope.getTheater(date);
    
});
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
angular.module('flixApp').controller('userCtrl', function($scope, mainSvc, $stateParams){
    var id = $stateParams

     var getUserData = function(id){
            mainSvc.getUserInfo(id).then(function(response){
                $scope.userInfo = response[0];
            });
            mainSvc.getUserData(id).then(function(response){
            var films = response.filter(function(response){
                return response.status === 2;
            });
            let watched = response.filter(function(films){
                return films.status === 3
            });
            let favorites = response.filter(function(films){
                return films.status === 1;
            });
            $scope.watched = watched;
            $scope.favorites = favorites;
            $scope.watchlist = films;
            });
        }
    getUserData(id);
});
angular.module('watchedCardDirective', []).directive('watchedCard', function(){
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
angular.module('flixApp').controller('userReviewsCtrl', function($scope, mainSvc, $stateParams){
  var id = $stateParams;
  $scope.getUserReviews2 = (id) => {
    mainSvc.getUserReviews2(id).then(function(response){
      for(var i = 0; i < response.length; i++){
        response[i].reviewColor = $scope.colorPicker(response[i].rating);
      }
      $scope.userReviews2 = response;
      $scope.userAuthor = response[0].name;
    });
  }
  $scope.getUserReviews2(id);
});

//# sourceMappingURL=main.js.map
