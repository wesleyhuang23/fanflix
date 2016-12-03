angular.module('flixApp').controller('detailsCtrl', function($scope, $stateParams, mainSvc, $sce){
  var id = $stateParams.id;
  console.log(id);

  $scope.trustSrc = function(link) {
  return $sce.trustAsResourceUrl(link);
};

var fav;
var watch;

  $scope.getDetails = function(id){
    mainSvc.getDetails(id).then(function(response){
      var imdb_id = response.imdb_id;
      console.log(imdb_id);
      console.log(response.id);
      fav = response;
      watch = response;
      console.log('FAV BTN', fav);
      console.log('WATCH BTN', watch);
      $scope.detail = response;
      $scope.production_companies = response.production_companies;
      console.log($scope.detail);
      $scope.getImdb(imdb_id);
      $scope.getVideos(imdb_id);
      $scope.getCast(imdb_id);
      $scope.getSimilars(imdb_id);
      $scope.getImages(imdb_id);
      $scope.getGuideBox(response.id);
    });
  }
  $scope.getDetails(id);

  $scope.getImdb = function(imdb_id){
    mainSvc.getImdb(imdb_id).then(function(response){
      $scope.imdb = response;
      console.log('imdb_details',$scope.imdb);
    });
  }

  $scope.getVideos = function(imdb_id){
  mainSvc.getVideos(imdb_id).then(function(response){
    var links = []
    for(var i = 0; i < response.length; i++){
      links.push('https://www.youtube.com/embed/' + response[i].key);
    }
    console.log(links);
    $scope.videos = links;
    console.log($scope.videos);
  })
}
  $scope.getCast = function(imdb_id){
    mainSvc.getCast(imdb_id).then(function(response){
      var newCast = [];
      for(var i = 0; i < 7;i++){
        newCast.push(response.cast[i]);
      }
      $scope.cast = newCast;
      $scope.crew = response.crew;
      console.log($scope.cast);
      console.log($scope.crew);
    });
  }
  $scope.getImages = function(imdb_id){
    mainSvc.getImages(imdb_id).then(function(response){
      // for(var i = 0; i < response.backdrops.length; i++){
      //    response.backdrops[i].file_path = 'https://image.tmdb.org/t/p/original' + response.backdrops[i].file_path
      // };

      $scope.backDrops = response.backdrops;
      console.log('IMAGES', $scope.backDrops);
    });
  }
  $scope.getSimilars = function(imdb_id){
    mainSvc.getSimilars(imdb_id).then(function(response){
      $scope.similar = response;
      console.log('similar', $scope.similar);
    });
  }
  $scope.getGuideBox = function(id){
    console.log(id);
    mainSvc.getGuideBox(id).then(function(response){
      console.log(response.id);
      var gb_id = response.id
      $scope.getGuideBoxDetails(gb_id);
    });
  }
  $scope.getGuideBoxDetails = function(gb_id){
    mainSvc.getGuideBoxDetails(gb_id).then(function(response){
      $scope.guidebox = response;
      console.log('GUIDEBOX DETAILS', $scope.guidebox)
      $scope.guideboxVideo = response.trailers.web;
      console.log('gb-videos', $scope.guideboxVideo);
      var webPurchase = response.purchase_web_sources;
      console.log(webPurchase);
      var result = webPurchase.filter(function(webPurchase){
        return webPurchase.source === "google_play" || webPurchase.source === "itunes"; //webPurchase.source === "amazon_buy";
      });
      result[0].img = "https://smoothjazzandmore.files.wordpress.com/2016/07/itunes-button.png";
      result[1].img = "https://static1.squarespace.com/static/54d05749e4b08a66f8bde05e/569c35d505caa74dde794ce3/569c35e81115e0984d256776/1453078092910/available-on-amazon.png";
      result[1].img = "http://vignette2.wikia.nocookie.net/implosion/images/7/74/Google_play.png/revision/latest?cb=20150411081733"
      $scope.guideboxPurchases = result;
      console.log('GUIDEBOX', $scope.guideboxPurchases);
    });
  }
  //DETAIL AND WATCH LIST BUTTONS
  $scope.addToFav = function(fav){
    console.log(fav);
    console.log('i am in add to fav func');
    mainSvc.addToFav(fav).then(function(response){
      $scope.favorite = response;
    })
  };
  $scope.addToWatch = function(fav){
    console.log('film sent', fav);
    mainSvc.addToWatch(fav).then(function(response){
      $scope.watch = response;
    });
  };
  $scope.addtoWatched = function(fav){
    console.log('adding to watched...', fav);
    mainSvc.addtoWatched(fav).then(function(response){
      $scope.watched = response;
      console.log($scope.watched);
    });
  };

  $scope.addToFavFunc = function(){
    $scope.addToFav(fav);
  }
  $scope.addToWatchFunc = function(){
    $scope.addToWatch(fav);
  }
  $scope.addToWatchedFunc = function(){
    $scope.addtoWatched(fav);
  }
});
