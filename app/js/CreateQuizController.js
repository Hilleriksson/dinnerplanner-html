spotiQuizApp.controller('CreateQuizController', function ($scope, Spotify, $http, $firebaseArray, $firebaseAuth, $location) {

  $scope.questionAmount = 1;
  $scope.currentQuestionIndex = 0;

  $scope.getQuestionAmount = function(num) {
    return new Array(num);
  }
  $scope.question = {};
  var firebaseRef = $firebaseArray(firebase.database().ref().child('quizzes'));


  $firebaseAuth().$onAuthStateChanged(function(authData){
    if (authData != null) {
    $scope.username = authData.displayName;
    $scope.usermail = authData.email;
    }
  })

  $scope.nextField = function () {
    var filledForm = true;

    if ($scope.question.nameOfQuiz == "" || $scope.question.nameOfQuiz == undefined) {
      filledForm = false;
    }
    if ($scope.question.questionDescription == "" || $scope.question.questionDescription == undefined) {
      filledForm = false;
    }

    if (filledForm) {
      angular.element(document.getElementById("infoField")).addClass("hidden");
      angular.element(document.getElementById("questionField")).removeClass("hidden");

      for(var i=0; i<$scope.questionAmount; i++){
        angular.element(document.getElementById("Question-" + i)).addClass("hidden");
      }
      angular.element(document.getElementById("Question-" + $scope.currentQuestionIndex)).removeClass("hidden");

    } else {
      angular.element(document.getElementById("infoFieldAlert")).removeClass("hidden");
    }


  }

  $scope.backField = function () {
    angular.element(document.getElementById("infoField")).removeClass("hidden");
    angular.element(document.getElementById("questionField")).addClass("hidden");
  }


  $scope.showPage = function (index) {
    //$scope.questionField = "hidden";
    for(var i=0; i<$scope.questionAmount; i++){
      angular.element(document.getElementById("Question-" + i)).addClass("hidden");
    }
    angular.element(document.getElementById("Question-" + index)).removeClass("hidden");
    $scope.currentQuestionIndex = index;
    console.log(index)
    console.log($scope.questionAmount);
  }

  // Tries to match selected song with URL
  // Maybe not optimal solution
  $scope.question.URL = {};
  $scope.getURL = function (val, index) {
    $scope.temp = index;
    var matchCounter = 0;
    if (val != ""){
      var justSong = val.split(", ");
      Spotify.search(justSong[0], 'track').then(function (data) {
        while (true) {
          //console.log(data.data.tracks.items[matchCounter].name + " med "+ justSong[0])
          //console.log(data.data.tracks.items[matchCounter].artists[0].name  + " med " + justSong[1])
          if (data.data.tracks.items[matchCounter].name == justSong[0] && data.data.tracks.items[matchCounter].artists[0].name == justSong[1]){
              $scope.question.URL[$scope.temp] = data.data.tracks.items[matchCounter].preview_url;
              break;
          } else {
            matchCounter++;
          }
        }
      });
    };
  };


  // Called upon when the typeaheader is called.
  $scope.searchSong = function(val) {
  return $http.get('//api.spotify.com/v1/search?q='+val+'&type=track', {
  }).then(function(response){
    return response.data.tracks.items.map(function(item){
      var songAndArtist = item.name + ", " + item.artists[0].name;
      return songAndArtist;
    });
  });
};
  $scope.searchedSong = "";
  $scope.writtenQuestion = "";
  $scope.textValue1 = "";
  $scope.textValue2 = "";
  $scope.textValue3 = "";
  $scope.textValue4 = "";
  $scope.radioValue = "";


  $scope.submitQuestions = function() {
    // var filledForm = true;
    // var list = [$scope.textValue1, $scope.textValue2, $scope.textValue3, $scope.textValue4, $scope.radioValue];
    //
    // if ($scope.searchedSong == ""){
    //   filledForm = false;
    //   $scope.songField = "has-error";
    // } else {
    //   $scope.songField = "";
    // }
    //
    // if ($scope.writtenQuestion == ""){
    //   filledForm = false;
    //   $scope.questionField = "has-error";
    // } else {
    //   $scope.questionField = "";
    // }
    //
    // for (var i=0; i<list.length; i++){
    //   if (list[i] == "") {
    //     filledForm = false;
    //     $scope.answerField = "has-error";
    //   } else {
    //     $scope.answerField = "";
    //   }
    // }
    //
    // if (filledForm == true) {
    //   console.log($scope.searchedSong);
    // }

    //console.log($scope.question);

    // var toSend = {
    //       "name": $scope.question.nameOfQuiz,
    //       "description" : $scope.question.questionDescription,
    //       "creator": $scope.usermail,
    //       "creatorName": $scope.username,
    //       "timestamp": firebase.database.ServerValue.TIMESTAMP,
    //       "questions": {}
    //     };
    //
    // for (var i=0; i<$scope.questionAmount; i++){
    //   var questionNumber = i+1;
    //   toSend.questions[questionNumber] = {
    //       "songUrl": $scope.question.URL[i],
    //       "question": $scope.question.question[i],
    //       "option1": $scope.question.answer1[i],
    //       "option2": $scope.question.answer2[i],
    //       "option3": $scope.question.answer3[i],
    //       "option4": $scope.question.answer4[i],
    //       "correctOption": $scope.question.correct[i]
    //     };
    //
    // }
    // firebaseRef.$add(toSend);
    $location.path('#!/category')
  }

});
