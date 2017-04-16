spotiQuizApp.controller('DescriptionController', function ($scope, quizService, $firebaseArray, $routeParams) {
  var quiz = quizService.getQuiz();
  var storeQuizID = quizService.storeQuizID($routeParams.quizId);
  $scope.description = 'Description not found.';
  $scope.quizName = '';
  $scope.creatorName = '';
  console.log(quiz);
  $scope.getDescription = function () {
      quiz.$loaded()
        .then(function(){
            angular.forEach(quiz, function(data) {
              if(data.$id === $routeParams.quizId){
                $scope.creatorName = data.creatorName;
                $scope.quizName = data.name;
                $scope.description = data.description;
                quizService.storeQuizName(data.name);
              }
            });
        });
  };
  $scope.getQuestion = function () {
      quizService.getQuestionDetail($routeParams.quizId);
  };
});
