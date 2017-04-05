spotiQuizApp.controller('ScoresController', function($scope, $firebaseObject) {

  // Ref to interact with Firebase
  var ref = firebase.database().ref();

  $scope.showHistoricScores = function() {
    $scope.moduleState = "historic";
  };

  $scope.showBestScores = function() {
    $scope.moduleState = "highest";
  };

  function _getScores() {
    // get scores from firebase
    var users = $firebaseObject(ref.child("users"));
    users.$loaded().then(function() {
      console.log("Fetched users data from database.");
      console.log(users.$value);
    });
  }
  
  $scope.getUsers = function() {
    _getScores();
  };


});
