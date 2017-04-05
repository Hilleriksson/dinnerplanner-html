spotiQuizApp.controller('PlayController', function ($scope, $timeout, quizService) {

  $scope.powerUp = function () {
    $scope.counter = 100;
    $scope.displayType = 'none';
  }
  $scope.displayType = 'none';
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
        $scope.displayType = '';
      }
      if($scope.counter == 0){
        $scope.stopped = false;
        $scope.takeAction();
      }else{
        mytimeout = $timeout($scope.onTimeout,100)
      }
  }
  var mytimeout = $timeout($scope.onTimeout,100);
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
          $scope.counter = 100;
          mytimeout = $timeout($scope.onTimeout,100);
      }
          $scope.stopped=!$scope.stopped;
  }

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
  }

  $scope.endQuiz = function () {
    window.location.href = '#!/endPlay';
  }
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
