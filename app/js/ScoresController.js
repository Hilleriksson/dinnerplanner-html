spotiQuizApp.controller('ScoresController', function($scope, $firebaseArray) {

  // Ref to interact with Firebase
  var usersRef = firebase.database().ref().child("users");
  $scope.mostPopularQuizzes = {};

  // showQuiz shows the selected quiz highscores
  // searchResults shows the search results so when one is clicked the selected
  // quiz is changed 
  $scope.highScoreShow = "showQuiz";

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
    // console.log("showSelectedQuiz gets called.");
    // console.log(quizSelected + " has been selected.");
    var allScoresRef = firebase.database().ref().child("all_scores");
    var allScores = $firebaseArray(allScoresRef);
    $scope.highScoresQuiz = [];
    $scope.scoreContentStatus = "loading";
    allScores.$loaded().then(function() {
      var highScoresQuiz = {};
      var highScoresNames = {};
      angular.forEach(allScores, function(score) {
        // Check if same id for quiz, save into user's id key for dict
        // console.log("Score quizId");
        // console.log(score.QUIZID);
        if (score.QUIZID === quizSelected) {
          console.log("Found score for selected quiz.");
          highScoresQuiz[score.USERID] = (highScoresQuiz[score.USERID] || 0) + score.SCORE;
          highScoresNames[score.USERID] = score.USERNAME;
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
      $scope.highScoresNames = highScoresNames;
      $scope.highScoreShow = "showQuiz";
      $scope.scoreContentStatus = "loaded";
    });
  };

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
    $scope.scoreContentStatus = "loading";
    var scoresRef = firebase.database().ref().child("all_scores");
    var scores = $firebaseArray(scoresRef);
    scores.$loaded().then(function() {
      if (usernameQuery === "") {
        // show every score
        $scope.histScores = scores.reverse();
      } else {
        // show scores by username
        scoreResult = [];
        angular.forEach(scores, function(score) {
          if (score.USERNAME === usernameQuery) {
            // <td><a href="#!/user/{{score.USERID}}"></a>{{ score.USERNAME }}</td>
            // <td>{{ score.NAME }}</td>
            // <td>{{ score.SCORE }}</td>
            // <td>{{ score.TIMESTAMP }}</td>
            scoreResult.push({
              USERNAME: score.USERNAME,
              USERID: score.USERID,
              QUIZID: score.QUIZID,
              NAME: score.NAME,
              SCORE: score.SCORE,
              TIMESTAMP: score.TIMESTAMP
            });
          }
        });
        $scope.histScores = scoreResult.reverse();
      }
      $scope.scoreContentStatus = "loaded";
    });
  };

  // Initialise
  $scope.searchUsername("");
  $scope.getMostPopularQuizzes();
});
