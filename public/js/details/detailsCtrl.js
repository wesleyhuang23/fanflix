angular.module('flixApp').controller('detailsCtrl', function($scope, $stateParams, mainSvc, $sce){
  var id = $stateParams.id;
  console.log(id);

  // function colorPicker(rating){
  //   if(rating >= 8){
  //     return 'green';
  //   }
  //   else if(rating >= 4){
  //     return 'orange';
  //   }
  //   else if(rating >= 0){
  //     return 'red';
  //   }
  // }


  $scope.trustSrc = function(link) {
  return $sce.trustAsResourceUrl(link);
};

var fb_id;
var user_name;

$scope.getFbUser = function(){
  mainSvc.getUser().then(function(response){
      console.log('user', response.data);
      fb_id = response.data.fb_id;
      user_name = response.data.name
      console.log('fb_id', fb_id, 'user_name', user_name);
});
}
$scope.getFbUser();


var fav;
var watch;

  $scope.getDetails = id => {
    mainSvc.getDetails(id).then(response => {
      var imdb_id = response.imdb_id;
      console.log(imdb_id);
      console.log(response.id);
      fav = response;
      watch = response;
      console.log('FAV BTN', fav);
      console.log('WATCH BTN', watch);
      $scope.id = response;
      $scope.detail = response;
      $scope.production_companies = response.production_companies;
      console.log($scope.detail);
      $scope.getImdb(imdb_id);
      $scope.getVideos(imdb_id);
      $scope.getCast(imdb_id);
      $scope.getSimilars(imdb_id);
      $scope.getImages(imdb_id);
      $scope.getGuideBox(response.id);
      $scope.getUserReviews(response.id);
    });
  }
  $scope.getDetails(id);

  $scope.getImdb = imdb_id => {
    mainSvc.getImdb(imdb_id).then(response => {
      $scope.imdb = response;
      console.log('imdb_details',$scope.imdb);
    });
  }

  $scope.getVideos = imdb_id => {
  mainSvc.getVideos(imdb_id).then(response => {
    var links = []
    for(var i = 0; i < response.length; i++){
      links.push('https://www.youtube.com/embed/' + response[i].key);
    }
    console.log(links);
    $scope.videos = links;
    console.log($scope.videos);
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
      console.log($scope.cast);
      console.log('DIRECTOR', $scope.director);
      console.log('$scope.crew', $scope.crew);
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
      console.log('back drop IMAGES', $scope.backDrops);
      console.log('second backdrop', $scope.secondBackdrop);
    });
  }
  $scope.getSimilars = imdb_id => {
    mainSvc.getSimilars(imdb_id).then(response => {
      $scope.similar = response;
      console.log('similar', $scope.similar);

    });
  }
  $scope.getGuideBox = id => {
    console.log(id);
    mainSvc.getGuideBox(id).then(response => {
      console.log(response.id);
      var gb_id = response.id
      $scope.getGuideBoxDetails(gb_id);
    });
  }
  $scope.getGuideBoxDetails = gb_id => {
    mainSvc.getGuideBoxDetails(gb_id).then(response => {
      $scope.guidebox = response;
      console.log('GUIDEBOX DETAILS', $scope.guidebox)
      $scope.guideboxVideo = response.trailers.web;
      console.log('gb-videos', $scope.guideboxVideo);
      var webPurchase = response.purchase_web_sources;
      console.log(webPurchase);
      var result = webPurchase.filter(webPurchase => {
        return webPurchase.source === "google_play" || webPurchase.source === "itunes"; //webPurchase.source === "amazon_buy";
      });
      result[0].img = "https://smoothjazzandmore.files.wordpress.com/2016/07/itunes-button.png";
      // result[1].img = "https://static1.squarespace.com/static/54d05749e4b08a66f8bde05e/569c35d505caa74dde794ce3/569c35e81115e0984d256776/1453078092910/available-on-amazon.png";
      result[1].img = "http://vignette2.wikia.nocookie.net/implosion/images/7/74/Google_play.png/revision/latest?cb=20150411081733";
      $scope.guideboxPurchases = result;
      console.log('GUIDEBOX', $scope.guideboxPurchases);
    });
  }
  $scope.getUserReviews = mdb_id => {
    console.log('user review id', mdb_id);
    mainSvc.getUserReviews(mdb_id).then(response => {
      // for(var i = 0; i < response.length; i++){
      //   response[i].photo = "https://scontent.xx.fbcdn.net/t31.0-1/10457710_" + response[i].fb_id + '_7996853287290615145_o.jpg'
      // }
      for(var i = 0; i < response.length; i++){
        response[i].reviewColor = $scope.colorPicker(response[i].rating);
      }
      $scope.userReviews = response;
      console.log('USER REVIEWS', $scope.userReviews);
    });
  }
  //DETAIL AND WATCH LIST BUTTONS
  $scope.addToFav = () => {
    fav.fb_id = fb_id;
    console.log(fav);
    console.log('i am in add to fav func');
    mainSvc.addToFav(fav).then(response => {
      $scope.getFavs();

      var current = false;
      for(var i = 0; i < $scope.favorites.length; i++){
        if($scope.favorites[i].id === fav.id){
          current = true;
        }
      }
      
      $scope.currentFilm = current;
      console.log('detailsCTRL', response);
    })
  };
  $scope.addToWatch = () => {

    fav.fb_id = fb_id;
    console.log('film sent', fav);
    mainSvc.addToWatch(fav).then(response => {

      $scope.getWatch();
    });
  };
  $scope.addToWatched = () => {
    fav.fb_id = fb_id;
    mainSvc.addtoWatched(fav).then(response => {
      $scope.getWatched();
    });
  }


});
