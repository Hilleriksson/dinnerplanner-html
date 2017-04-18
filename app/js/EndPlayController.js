spotiQuizApp.controller('EndPlayController', function ($scope, quizService) {
  var wrongAns = 0;
  $scope.getCurrentScore = function () {
    $scope.quizLength = quizService.getQuizLength();
    $scope.currentScore = quizService.getCurrentScore();
    wrongAns = $scope.quizLength - $scope.currentScore;
    $scope.colors = ["Red", "Green"]
    $scope.labels = ["Incorrect", "Correct"];
    $scope.data = [wrongAns, $scope.currentScore];
    quizService.setCurrentScore(0);
    quizService.setQuizLength(0);
  }
  $scope.goToPlay = function () {
    window.location.href = '#!/category';
  }

});
