spotiQuizApp.controller('EndPlayController', function ($scope, quizService) {
  $scope.getCurrentScore = function () {
    $scope.currentScore = quizService.getCurrentScore();
    quizService.setCurrentScore(0);
  }
  $scope.goToPlay = function () {
    window.location.href = '#!/category';
  }
});
