spotiQuizApp.controller('CategoryController', function ($scope, quizService, $firebaseArray) {

  $scope.searchGenre = function (genre) {
    if(genre === '' || genre === undefined){
      $scope.getGenres();
    }else{
      var data = quizService.searchGenre(genre);
      $scope.genres = [];
      var dataGenre = [];
      dataGenre.push(data);
      $scope.genres.push(dataGenre);
    }
  }
  $scope.getGenres = function () {
    $scope.genres = [];
    var dataGenre = [];
    for(i=0; i<quizService.getGenres().length; i++){
      dataGenre.push(quizService.getGenres()[i]);
      if((i+1)%3 === 0){
        $scope.genres.push(dataGenre);
        dataGenre = [];
      }
    }
  }
  console.log($firebaseArray(firebase.database().ref().child('quizzes')));
});
