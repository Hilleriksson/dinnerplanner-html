spotiQuizApp.controller('CategoryController', function ($scope, quizService, $firebaseArray, $firebaseAuth) {
  // var quizQuestions = $firebaseArray(firebase.database().ref().child('quizzes'));
  var quizQuestions = quizService.getQuiz();
  //To store the userId in the service file after the LoginController
  var storeUserID = quizService.storeUserID();
  console.log(quizQuestions);
  $scope.searchGenre = function (genre) {
    if(genre === '' || genre === undefined){
      $scope.getQuiz();
    }else{
      $scope.genres = [];
      var dataGenre = [];
      var detailQuiz = [];
      quizQuestions.$loaded()
        .then(function(){
            angular.forEach(quizQuestions, function(user) {
              if(user.name.toUpperCase() === genre.toUpperCase()){
                detailQuiz.push(user.$id);
                detailQuiz.push(user.name);
                dataGenre.push(detailQuiz);
                $scope.genres.push(dataGenre);
              }
            });
        });
    }
  };
  $scope.getQuiz = function () {
    $scope.genres = [];
    var dataGenre = [];
    var detailQuiz = [];
    var i = 0;
    quizQuestions.$loaded()
      .then(function(){
          angular.forEach(quizQuestions, function(user) {
              detailQuiz.push(user.$id);
              detailQuiz.push(user.name);
              dataGenre.push(detailQuiz);
              detailQuiz = [];
              if((i+1)%3 === 0){
                $scope.genres.push(dataGenre);
                dataGenre = [];
              }
              ++i;
          });
          $scope.genres.push(dataGenre);
      });
  };
});
