spotiQuizApp.controller('CategoryController', function ($scope, quizService, $location, $firebaseAuth) {

  var quizQuestions = quizService.getQuiz();
  var quizPop = quizService.getAllQuizFromOuizPOP();

  //To store the userId in the service file after the LoginController
  var storeUserID = quizService.storeUserID();
  console.log(quizQuestions);

  $scope.query = '';
  $scope.orderFilter = '-pop'

  // Redirects page to specific quiz
  $scope.showQuiz = function(id) {
    $location.path('/description/' + id);
  }

  //chooses filter to sort table by
  $scope.sortTable = function(column){
    if (column == $scope.orderFilter ){
      $scope.orderFilter = '-' + column;
    } else {
      $scope.orderFilter = column;
    }
  }

  // Generates the list of quizzes
  $scope.getQuiz = function() {
    $scope.quizList = [];
    quizQuestions.$loaded().then(function() {
      quizPop.$loaded().then(function() {
        for(var i=0; i<quizQuestions.length; i++){
          var quiz = addPopularity(quizPop, quizQuestions[i]);
          $scope.quizList.push(quiz)
        }
      })
    })
  }

  // Adds popularity of the quiz to the object so the list first is sorted by
  // popularity
  function addPopularity(quizPop, obj) {
    for(var i=0; i<quizPop.length; i++){
      if(quizPop[i].$id == obj.$id){
        obj.pop = quizPop[i].$value;
        return obj
      }
    }
  }
});
