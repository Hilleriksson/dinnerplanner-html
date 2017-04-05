spotiQuizApp.controller('ScoresController', function($scope, $firebaseArray) {

  // Ref to interact with Firebase
  var usersRef = firebase.database().ref().child("users");

  $scope.scoreContentStatus = "loading";

  $scope.getUsers = function() {
    console.log("getUsers function gets called.");
    // ref.child("users")
    var users = $firebaseArray(usersRef);
    users.$loaded().then(function() {
      console.log("Fetched users data from database.");
      $scope.scoreContentStatus = "loaded";
      // Show scores
    });
  };

  $scope.getUsers();

});
