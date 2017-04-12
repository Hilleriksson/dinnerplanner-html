spotiQuizApp.controller('PlayController', function ($scope, $timeout, quizService, $firebaseArray, $filter, ngAudio) {


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
  var quizLength = quizService.getQuizLength();
  var x = 0;
  var options = [];
  $scope.nextQuestion = function () {
    $scope.progress = (numbersGenerated.length + 1)/quizLength * 100;
    if(numbersGenerated.length === quizLength){
      $scope.endQuiz();
    }else{
      x = Math.floor((Math.random() * quizLength) + 1);
      if ( numbersGenerated.indexOf( x ) > -1 ){
        $scope.nextQuestion();
      }else{
        options = quizService.getOptions(x);
        numbersGenerated.push(x);
        $scope.sourceURL = quizService.getSongURL(x);
        $scope.audio = ngAudio.load(sourceURL);    
        $scope.question = quizService.getQuestion(x);
        $scope.option1 = options[0];
        $scope.option2 = options[1];
        $scope.option3 = options[2];
        $scope.option4 = options[3];
        $scope.stopped = true;
        $scope.takeAction();
      }
    }
  };

  $scope.endQuiz = function () {
    quizService.setQuizLength(0);
    quizService.removeAllQuestion();
    quizService.removeAllOption();
    quizService.removeAllCorrectAns();
    quizService.removeSongURL();
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
