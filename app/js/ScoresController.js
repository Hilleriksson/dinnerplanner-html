spotiQuizApp.controller('ScoresController', function($scope, $firebaseArray) {

  // Ref to interact with Firebase
  var usersRef = firebase.database().ref().child("users");
  $scope.mostPopularQuizzes = {};

  // showQuiz shows the selected quiz highscores
  // searchResults shows the search results so when one is clicked the selected
  // quiz is changed 
  $scope.highScoreShow = "showQuiz";

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
    console.log("Most popular quizzes gets called.");
    // Empty the list
    $scope.mostPopularQuizzes = [];
    var numQuizzes = 5;
    // Fetch quizzes from popular quizzes, take most popular ones and get their name
    var quizzesPopRef = firebase.database().ref().child("quizzes-pop").orderByValue().limitToLast(numQuizzes);
    var quizzesRef = firebase.database().ref().child("quizzes");

    var quizzesPop = $firebaseArray(quizzesPopRef);
    quizzesPop.$loaded().then(function() {
      console.log("Quizzes loaded from Firebase.");
      console.log(quizzesPop);
      angular.forEach(quizzesPop, function(quizPop) {
        // Look for name on quizzesRef
        var quizRef = firebase.database().ref("/quizzes/" + quizPop.$id);
        var quiz = $firebaseArray(quizRef);
        quiz.$loaded().then(function() {
          var name = quiz[3].$value;
          // console.log("" + quizPop.$id " has correspondent name: " + name + ".");
          // console.log("Popular quiz retrieved: " + quiz.name);
          // console.log(quizPop.$id)
          $scope.mostPopularQuizzes.push([quizPop.$id, name]);
        });
      });
    });


  };

  // quizSelect is the id of the quiz
  $scope.showSelectedQuiz = function(quizSelected) {
    // Retrieve highest scores for this
    // Have to get them from all_scores table and calculate them
    console.log("showSelectedQuiz gets called.");
    console.log(quizSelected + " has been selected.");
    var allScoresRef = firebase.database().ref().child("all_scores");
    var allScores = $firebaseArray(allScoresRef);
    $scope.highScoresQuiz = [];
    $scope.scoreContentStatus = "loading";
    allScores.$loaded().then(function() {
      var highScoresQuiz = {};

      angular.forEach(allScores, function(score) {
        // Check if same id for quiz, save into user's id key for dict
        console.log("Score quizId");
        console.log(score.QUIZID);
        if (score.QUIZID === quizSelected) {
          console.log("Found score for selected quiz.");
          highScoresQuiz[score.USERID] = (highScoresQuiz[score.USERID] || 0) + score.SCORE;
        }
      });
      // All scores are saved, have to reorder from bigger to lower and save it to score
      // Create array from dictionary and sort it
      // Code adapted from: https://stackoverflow.com/questions/5199901/
      var tuples = [];
      for (var key in highScoresQuiz) {
        tuples.push([key, highScoresQuiz[key]]);
      }

      tuples.sort(function(a, b) {
        a = a[1];
        b = b[1];

        return a < b ? -1 : (a > b ? 1 : 0);
      });

      // highScoresQuiz[i][0] contains USERID
      // highScoresQuiz[i][1] contains score for that quiz
      $scope.highScoresQuiz = tuples.reverse();
      $scope.highScoreShow = "showQuiz";
      $scope.scoreContentStatus = "loaded";
    });
  };
  // TODO Retrieve quiz names matching the input and show high scores for each of them
  $scope.searchQuizName = function(quizSearch) {
    $scope.scoreContentStatus = "loading";
    $scope.searchResults = [];

    // If query is empty show all
    // Get all quizzes, look for name
    var quizzesRef = firebase.database().ref().child("quizzes");
    var quizzes = $firebaseArray(quizzesRef);
    quizzes.$loaded().then(function() {
      angular.forEach(quizzes, function(quiz) {
        // Check where name is
        if (quiz.name === quizSearch) {
          // found result, add to list
          console.log("Found matching quiz. Id: " + quiz.$id + " Name: " + quiz.name);
          $scope.searchResults.push({ id: quiz.$id, name: quiz.name });
        }
        // If query is empty show all
        // WARNING: EXTREMELY UGLY CODE :/ will do it for now
        if (quizSearch === "") {
          $scope.searchResults.push({ id: quiz.$id, name: quiz.name });
        }
      });
      $scope.highScoreShow = "searchResults";
      $scope.scoreContentStatus = "loaded";
    });

  };

  $scope.searchUsername = function(usernameQuery) {
    // Query firebase for scores of an specific user
    // Fetch users and show the scores of the similar one
    // var users = $firebaseArray(usersRef);
    // $scope.scoreContentStatus = "loading";
    // $scope.usernameQuery = usernameQuery;
    // users.$loaded().then(function() {
    //   console.log("Query is: " + $scope.usernameQuery);
    //   console.log("Fetched users data from database.");
    //   console.log(users);

    //   // Save scores from users with similar name to query, use some distance algo
    //   // If the query is empty return everything
    //   if ($scope.usernameQuery === "") {
    //     $scope.usersContent = users;
    //   } else {
    //     var results = [];
    //     angular.forEach(users, function(user) {
    //       if (user.name === $scope.usernameQuery) {
    //         console.log("Found user with similar name: " + user.name);
    //         results.push({
    //           "name": user.name,
    //           "scores": {
    //             "quiz": user.scores.quiz,
    //             "score": user.scores.score
    //           }
    //         });
    //       }
    //     });
    //     console.log("Logging results array");
    //     console.log(results);
    //     $scope.usersContent = results;
    //   }
    //   $scope.scoreContentStatus = "loaded";
    // });
    $scope.scoreContentStatus = "loading";
    var scoresRef = firebase.database().ref().child("all_scores");
    var scores = $firebaseArray(scoresRef);
    scores.$loaded().then(function() {
      var usersRef = firebase.database().ref().child("users");
      var users = $firebaseArray(usersRef);
      users.$loaded().then(function() {
        if(usernameQuery === "") {
          // show every score
          $scope.histScores = scores;
          $scope.scoreContentStatus = "loaded";
        } else {
          // show scores by username

        }
      });
    });
  };



  // $scope.getUsers();
  // TODO refactor name to something that makes more sense
  $scope.searchUsername("");
  $scope.getMostPopularQuizzes();
});
