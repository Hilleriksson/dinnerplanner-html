spotiQuizApp.controller('EndPlayController', function ($scope, quizService) {
  $scope.goToPlay = function () {
    window.location.href = '#!/category';
  }
});
