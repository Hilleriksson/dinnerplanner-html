spotiQuizApp.controller('PlayController', function ($scope, $timeout, quizService, $firebaseArray, $filter, ngAudio) {

  var mytimeout = 0;
  var powerUpCounter = 0;
  $scope.queNumber = 0;

  $scope.displayType = 'none';
  $scope.displayTypeFifty = '';
  $scope.progress = 0;
  $scope.counter = 100;
  $scope.barType = 'success';
  $scope.stopped = false;
  $scope.buttonText='Stop';
  $scope.onTimeout = function(){
      $scope.counter--;
      if($scope.counter === 50){
        $scope.barType = 'warning';
      }
      if($scope.counter === 30){
        $scope.barType = 'danger';
        if(powerUpCounter === 0){
        $scope.displayType = '';
        }
      }
      if($scope.counter === 0){
        $scope.stopped = false;
        $scope.takeAction();
      }else{
        mytimeout = $timeout($scope.onTimeout,100);
      }
  };

  var quizQuestions = $firebaseArray(firebase.database().ref().child('quizzes'));

  $scope.takeAction = function(){
      if(!$scope.stopped){
          $timeout.cancel(mytimeout);
          $scope.buttonText='Resume';
          $scope.pauseSong();
          $scope.nextQuestion();
      }
      else
      {
          $timeout.cancel(mytimeout);
          $scope.counter = 100;
          $scope.buttonText='Stop';
          $scope.barType = 'success';
          $scope.displayType = 'none';
          mytimeout = $timeout($scope.onTimeout,100);
      }
          $scope.stopped=!$scope.stopped;
  };

  var numbersGenerated = [];
  var quizLength = quizService.getQuizLength();
  var x = 0;
  var options = [];
  $scope.audio = '';
  $scope.nextQuestion = function () {
    if($scope.audio !== '' && $scope.audio.canPlay === true){
      $scope.pauseSong();
    }
    $scope.displayTypeOption = [];
    $scope.progress = (numbersGenerated.length + 1)/quizLength * 100;
    if(numbersGenerated.length === quizLength){
      $timeout.cancel(mytimeout);
      quizService.storeInAllScores();
      quizService.incrementQuizPOP();
      quizService.storeDataInUser();
      $scope.endQuiz();
    }else{
      x = Math.floor((Math.random() * quizLength) + 1);
      if ( numbersGenerated.indexOf( x ) > -1 ){
        $scope.nextQuestion();
      }else{
        ++$scope.queNumber;
        options = quizService.getOptions(x - 1);
        numbersGenerated.push(x);
        $scope.sourceURL = quizService.getSongURL(x - 1);
        $scope.audio = ngAudio.load(quizService.getSongURL(x - 1));
        $scope.question = quizService.getQuestion(x - 1);
        $scope.option1 = options[0];
        $scope.option2 = options[1];
        $scope.option3 = options[2];
        $scope.option4 = options[3];
        $scope.audio.play();
        $scope.stopped = true;
        $scope.takeAction();
      }
    }
  };

  $scope.displayTypeOption = [];
  $scope.powerUpFifty = function () {
    $scope.audio.play();
    var correctOption = quizService.getCorrectAns(x - 1);
    var random1 = Math.floor((Math.random() * 4));
    var random2 = Math.floor((Math.random() * 4));
    if (random1 === random2 || random1 === correctOption - 1 || random2 === correctOption - 1) {
      $scope.powerUpFifty();
    }else{
      quizService.incrementPowerUpUsed();
      $scope.displayTypeOption[random1] = "none";
      $scope.displayTypeOption[random2] = "none";
      $scope.displayTypeFifty = 'none';
    }
  };

  $scope.powerUp = function () {
    $scope.audio.play();
    if(powerUpCounter === 0){
      $timeout.cancel(mytimeout);
      $scope.counter = 100;
      $scope.displayType = 'none';
      $scope.barType = 'success';
      mytimeout = $timeout($scope.onTimeout,100);
      quizService.incrementPowerUpUsed();
    }
    ++powerUpCounter;
  };

  $scope.updateScore = function (option) {
    var correctAns = parseInt(quizService.getCorrectAns(x - 1));
    if(correctAns === option){
      quizService.incrementCurrentScore();
    }
    $scope.nextQuestion();
  };

  $scope.pauseSong = function () {
    $scope.audio.pause();
  };

  $scope.endQuiz = function () {
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
