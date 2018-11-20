angular.module('flixApp').controller('creditsCtrl', function($scope, $stateParams, mainSvc){
  var id = $stateParams.id;
  window.scrollTo(0, 0);

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
