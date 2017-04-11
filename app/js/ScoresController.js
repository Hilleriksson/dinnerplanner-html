spotiQuizApp.controller('ScoresController', function($scope, $firebaseArray) {

  // Ref to interact with Firebase
  var usersRef = firebase.database().ref().child("users");

  // TODO use a string comparison of this kind instead of exact match
  // Levenshtein Distance algo taken from the Internet
  function compareStrings(s, t) {
    if (!s.length) return t.length;
    if (!t.length) return s.length;

    return Math.min(
      levenshteinDistance(s.substr(1), t) + 1,
      levenshteinDistance(t.substr(1), s) + 1,
      levenshteinDistance(s.substr(1), t.substr(1)) + (s[0] !== t[0] ? 1 : 0)
    ) + 1;
  }

  // Control animation when loading the table
  $scope.scoreContentStatus = "loading";
  // Initialize query to empty string
  $scope.usernameQuery = "";

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

  // TODO Populate the select with the options of the most popular quizzes
  $scope.getMostPopularQuizzes = function() {
    var numQuizzes = 5;
    // Fetch quizzes from popular quizzes, take most popular ones and get their name
    var quizzesPopRef = firebase.database().ref().child("quizzes-pop");
    var quizzesRef = firebase.database().ref().child("quizzes");

    var quizzesPop = $firebaseArray(quizzesPopRef);
    quizzesPop.$loaded().then(function() {
      console.log("Quizzes and their popularity loaded from Firebase.");
      // Find kth most popular, then find numQuizzes - 1 larger or equal. 2 iterations of array
      var mostPopularQuizzes = [];
      angular.forEach(quizzesPop, function(popularity, quizId) {
        
      });
    });
    

  };

  // TODO Retrieve quiz names matching the input and show high scores for each of them
  $scope.searchQuizName = function() {

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
