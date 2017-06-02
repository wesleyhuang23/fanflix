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
