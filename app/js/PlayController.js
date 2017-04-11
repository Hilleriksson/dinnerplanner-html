spotiQuizApp.controller('PlayController', function ($scope, $timeout, quizService, $firebaseArray, $filter) {


  $scope.powerUp = function () {
    $scope.counter = 10;
    $scope.displayType = 'none';
  };
  $scope.displayType = 'none';
  $scope.progress = 0;
  $scope.counter = 10;
  $scope.barType = 'success';
  $scope.stopped = false;
  $scope.buttonText='Stop';
  $scope.onTimeout = function(){
      $scope.counter--;
      if($scope.counter === 5){
        $scope.barType = 'warning';
      }
      if($scope.counter === 3){
        $scope.barType = 'danger';
        $scope.displayType = '';
      }
      if($scope.counter === 0){
        $scope.stopped = false;
        $scope.takeAction();
      }else{
        $timeout($scope.onTimeout,1000);
      }
  };

  var mytimeout = 0;
  console.log($firebaseArray(firebase.database().ref().child('quizzes')));
  var quizQuestions = $firebaseArray(firebase.database().ref().child('quizzes'));
  // for(valueJson in quizQuestions){
  //   console.log(valueJson);
  // }
  quizQuestions.$loaded()
    .then(function(){
        angular.forEach(quizQuestions, function(user) {
            console.log(user);
        })
    });
  // console.log(quizQuestions.first);
  //console.log(JSON.parse(quizQuestions));

  $scope.takeAction = function(){
      if(!$scope.stopped){
          $timeout.cancel(mytimeout);
          $scope.buttonText='Resume';
          $scope.nextQuestion();
      }
      else
      {
          $scope.buttonText='Stop';
          $scope.barType = 'success';
          $scope.displayType = 'none';
          $scope.counter = 10;
          mytimeout = $timeout($scope.onTimeout,1000);
      }
          $scope.stopped=!$scope.stopped;
  };

  var numbersGenerated = [];
  $scope.question = "What is the name of this song?";
  $scope.nextQuestion = function () {
    $scope.progress = (numbersGenerated.length + 1)/10 * 100;
    if(numbersGenerated.length === 10){
      $scope.endQuiz();
    }else{
      var x = Math.floor((Math.random() * 10) + 1);
      if ( numbersGenerated.indexOf( x ) > -1 ){
        $scope.nextQuestion();
      }else{
        numbersGenerated.push(x);
        $scope.question = quizService.getQuestion(x).question;
        $scope.stopped = true;
        $scope.takeAction();
      }
    }
  };

  $scope.endQuiz = function () {
    window.location.href = '#!/endPlay';
  };
});

spotiQuizApp.filter('formatTimer', function() {
  return function(input)
    {
        function z(n) {return (n<10? '0' : '') + n;}
        var seconds = input % 60;
        var minutes = Math.floor(input / 60);
        var hours = Math.floor(minutes / 60);
        return (z(seconds));
    };
});
