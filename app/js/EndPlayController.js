spotiQuizApp.controller('EndPlayController', function ($scope, quizService) {
  var wrongAns = 0;
  $scope.getCurrentScore = function () {
    $scope.quizLength = quizService.getQuizLength();
    $scope.currentScore = quizService.getCurrentScore();
    var powerUpUsed = quizService.getPowerUpUsed();
    if(powerUpUsed !== 0 && $scope.currentScore !== 0){
      $scope.score = $scope.currentScore - 0.5 * powerUpUsed;
    }else{
      $scope.score = $scope.currentScore;
    }
    wrongAns = $scope.quizLength - $scope.currentScore;
    $scope.colors = ["#FF6384", "#4BC0C0"]
    $scope.labels = ["Incorrect", "Correct"];
    $scope.data = [wrongAns, $scope.currentScore];
    quizService.setCurrentScore(0);
    quizService.setQuizLength(0);
    quizService.setPowerUpUsed(0);
  }
  $scope.goToPlay = function () {
    window.location.href = '#!/category';
  }

});
