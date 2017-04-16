spotiQuizApp.controller('EndPlayController', function ($scope, quizService) {
  $scope.getCurrentScore = function () {
    $scope.currentScore = quizService.getCurrentScore();
    quizService.setCurrentScore(0);
  }
  $scope.goToPlay = function () {
    window.location.href = '#!/category';
  }
  $scope.colors = ["Red", "Green", "Blue"]
  $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  $scope.data = [1, 1, 1];
});
