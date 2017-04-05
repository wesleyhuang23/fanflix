angular.module('flixApp').controller('creditsCtrl', function($scope, $stateParams, mainSvc){
  // console.log($stateParams);
  var id = $stateParams.id;
  // console.log(id);

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
      // console.log('directing', $scope.directing);
      $scope.writing = writing;
      // console.log('writing', $scope.writing);
      $scope.camera = camera;
      // console.log('camera', $scope.camera);
      $scope.art = art;
      // console.log('Art', $scope.art);
      $scope.production = production;
      // console.log('Production', $scope.production);
      $scope.sound = sound;
      // console.log('sound', $scope.sound);
      $scope.visualEffects = visualEffects;
      // console.log('visualEffects', $scope.visualEffects);
      $scope.editorial = editorial;
      // console.log('editorial', $scope.editorial);
      $scope.lighting = lighting;
      // console.log('grip', $scope.grip);
      $scope.crewDep = crewDep;
      $scope.editing = editing;


      // console.log($scope.cast);
      // console.log($scope.crew);
      $scope.getDetails(id);
    });
  }

  $scope.getCredits();
  $scope.getDetails = function(){
    mainSvc.getDetails(id).then(function(response){
      $scope.creditDetails = response;
      // console.log($scope.creditDetails);
    });
  };
});
