angular.module('flixApp').controller('peopleCtrl', function($scope, $stateParams, mainSvc){
  var person_id = $stateParams.id;
  console.log(person_id);

  $scope.getPersonDetails = person_id => {
    mainSvc.getPersonDetails(person_id).then(response => {
      var person_name = response.name
      $scope.personDetail = response;
      console.log($scope.personDetail);
      $scope.getKnownFor(person_name);
    });
    }
  $scope.getPersonDetails(person_id);

  $scope.getKnownFor = person_name => {
    mainSvc.getKnownFor(person_name).then(response => {
      $scope.knownFor = response.results[0].known_for;
      console.log('Known for', $scope.knownFor);
      $scope.firstKnown = response.results[0].known_for[0];
      console.log('first knwon', $scope.firstKnown);
    });
  }

  $scope.getPersonMovieCredits = person_id => {

    mainSvc.getPersonMovieCredits(person_id).then(response => {
      $scope.credNum = response.cast.length + response.crew.length;

      var personCast = response.cast;
      var crew = response.crew;
      console.log('person crew', personCrew);
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
        console.log($scope.personCast);
      console.log('person movie cred', $scope.personCrew, $scope.personCast);
    });
  }
  $scope.getPersonMovieCredits(person_id);

});
