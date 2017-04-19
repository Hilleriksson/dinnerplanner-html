spotiQuizApp.controller('EndPlayController', function ($scope, quizService) {
  var wrongAns = 0;
  $scope.getCurrentScore = function () {
    $scope.quizLength = quizService.getQuizLength();
    $scope.currentScore = quizService.getCurrentScore();
    wrongAns = $scope.quizLength - $scope.currentScore;
    $scope.colors = ["#FF6384", "#4BC0C0"]
    $scope.labels = ["Incorrect", "Correct"];
    $scope.data = [wrongAns, $scope.currentScore];
    quizService.setCurrentScore(0);
    quizService.setQuizLength(0);
  }
  $scope.goToPlay = function () {
    window.location.href = '#!/category';
  }

});
