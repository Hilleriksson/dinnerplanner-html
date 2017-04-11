spotiQuizApp.controller('CreateQuizController', function ($scope, Spotify, $http, $firebaseAuth, $location) {

  $scope.questionAmount = 1;
  $scope.currentQuestionIndex = 0;
  $scope.question = {};
  $scope.question.song = [];
  $scope.question.question = [];
  $scope.question.answer1 = [];
  $scope.question.answer2 = [];
  $scope.question.answer3 = [];
  $scope.question.answer4 = [];
  $scope.question.correct = [];
  var list = [$scope.question.song, $scope.question.question, $scope.question.answer1, $scope.question.answer2, $scope.question.answer3, $scope.question.answer4, $scope.question.correct]




  $firebaseAuth().$onAuthStateChanged(function(authData){
    if (authData != null) {
    $scope.username = authData.displayName;
    $scope.usermail = authData.email;
    }
  })

  // function for ng-repeat questions
  $scope.getQuestionAmount = function(num) {
    return new Array(num);
  }

  //Checks if all forms are filled, then hides first part of the form
  $scope.nextField = function () {
    var filledForm = true;

    if ($scope.question.nameOfQuiz == "" || $scope.question.nameOfQuiz == undefined) {
      filledForm = false;
    }
    if ($scope.question.questionDescription == "" || $scope.question.questionDescription == undefined) {
      filledForm = false;
    }

    if (filledForm) {
      angular.element(document.getElementById("infoFieldAlert")).addClass("hidden");
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

  // back to first part of the form
  $scope.backField = function () {
    angular.element(document.getElementById("infoField")).removeClass("hidden");
    angular.element(document.getElementById("questionField")).addClass("hidden");
  }



  // shows correct question when selected on paginator
  $scope.showPage = function (index) {
    for(var i=0; i<$scope.questionAmount; i++){
      angular.element(document.getElementById("Question-" + i)).addClass("hidden");
    }
    angular.element(document.getElementById("Question-" + index)).removeClass("hidden");
    $scope.currentQuestionIndex = index;
  }

  // shows next question on paginator
  $scope.nextPage = function () {
    if ($scope.currentQuestionIndex<$scope.questionAmount-1){
      for(var i=0; i<$scope.questionAmount; i++){
        angular.element(document.getElementById("Question-" + i)).addClass("hidden");
      }
      $scope.currentQuestionIndex++;
      angular.element(document.getElementById("Question-" + $scope.currentQuestionIndex)).removeClass("hidden");
    }
  }

  //shows shows previous question on paginator
  $scope.backPage = function () {
    if ($scope.currentQuestionIndex>0){
      for(var i=0; i<$scope.questionAmount; i++){
        angular.element(document.getElementById("Question-" + i)).addClass("hidden");
      }
      $scope.currentQuestionIndex--;
      angular.element(document.getElementById("Question-" + $scope.currentQuestionIndex)).removeClass("hidden");
    }
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
        while (true) {var list = [$scope.question.song, $scope.question.question, $scope.question.answer1, $scope.question.answer2, $scope.question.answer3, $scope.question.answer4, $scope.question.correct]
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



  //checks  if all forms are filled, then submits data to firebase
  $scope.submitQuestions = function() {
    var filledForm = true;

    for(var i=0; i<list.length; i++){
      for(var j=0; j<$scope.questionAmount; j++){
        if(list[i][j] == undefined || list[i][j] == ""){
          filledForm = false;
        }
      }
    }

    if (filledForm) {
      var toSend = {
            "name": $scope.question.nameOfQuiz,
            "description" : $scope.question.questionDescription,
            "creator": $scope.usermail,
            "creatorName": $scope.username,
            "timestamp": firebase.database.ServerValue.TIMESTAMP,
            "questions": {}
          };

      for (var i=0; i<$scope.questionAmount; i++){
        var questionNumber = i+1;
        toSend.questions[questionNumber] = {
            "songUrl": $scope.question.URL[i],
            "question": $scope.question.question[i],
            "option1": $scope.question.answer1[i],
            "option2": $scope.question.answer2[i],
            "option3": $scope.question.answer3[i],
            "option4": $scope.question.answer4[i],
            "correctOption": $scope.question.correct[i]
          };
      }

      updateDb(toSend);
      $location.path('/category')

    } else {
      angular.element(document.getElementById("questionFieldAlert")).removeClass("hidden");
    }
  }

  // stores quiz-object in firebase
  function updateDb (obj){
    var newPostKey = firebase.database().ref().child('posts').push().key;

    var updates = {};
    updates['/quizzes/' + newPostKey] = obj;
    updates['/quizzes-pop/' + newPostKey] = 0;

    return firebase.database().ref().update(updates);
  }

});
