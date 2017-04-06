spotiQuizApp.controller('ScoresController', function($scope, $firebaseArray) {

  // Ref to interact with Firebase
  var usersRef = firebase.database().ref().child("users");

  $scope.scoreContentStatus = "loading";
  // Initialize query to empty string
  $scope.usernameQuery = "";
  // Default means that there hasn't been a text query looking for an specific user
  // $scope.showing = "default";

  $scope.getUsers = function() {
    console.log("getUsers function gets called.");
    // ref.child("users")
    var users = $firebaseArray(usersRef);
    users.$loaded().then(function() {
      console.log("Fetched users data from database.");
      console.log(users);
      $scope.scoreContentStatus = "loaded";
      $scope.usersContent = users;
      // $scope.showing = "default";
    });
  };

  $scope.searchUsername = function(usernameQuery) {
    // Query firebase for scores of an specific user
    // Fetch users and show the scores of the similar one
    var users = $firebaseArray(usersRef);
    $scope.scoreContentStatus = "loading";
    $scope.usernameQuery = usernameQuery;
    users.$loaded().then(function() {
      console.log("Query is: " + $scope.usernameQuery);
      console.log("Fetched users data from database.");
      console.log(users);

      // Save scores from users with similar name to query, use some distance algo
      // If the query is empty return everything
      if ($scope.usernameQuery === "") {
        $scope.usersContent = users;
      } else {
        var results = [];
        angular.forEach(users, function(user) {
          if (user.name === $scope.usernameQuery) {
            console.log("Found user with similar name: " + user.name);
            results.push({
              "name": user.name,
              "scores": {
                "quiz": user.scores.quiz,
                "score": user.scores.score
              }
            });
          }
        });
        console.log("Logging results array");
        console.log(results);
        $scope.usersContent = results;
      }
      $scope.scoreContentStatus = "loaded";
    });
  };

  $scope.getUsers();

});
