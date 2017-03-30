spotiQuizApp.controller('SidebarController', function ($scope, quizService) {
  $scope.goToHome = function () {
    window.location.href = '#!/home';
  }
  $scope.goToProfile = function () {
    window.location.href = '#!/user/userid';
  }
  $scope.goToScores = function () {
    window.location.href = '#!/scores';
  }
});
