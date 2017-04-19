
spotiQuizApp.factory('quizService', function ($resource, $firebaseArray, $firebaseAuth) {

  var _self = this;
  var auth = $firebaseAuth();
  this.allQuestionArray = [];
  this.allOptionArray = [];
  this.allCorrectAnsArray = [];
  this.allsongURLArray = [];
  this.quizLength = 0;
  this.userId = '';
  this.quizId = '';
  this.currentScore = 0;
  this.quizName = '';
  this.userName = '';
  this.powerUpUsed = 0;

  this.incrementPowerUpUsed = function () {
    this.powerUpUsed = this.powerUpUsed + 1;
  }

  this.setPowerUpUsed = function (val) {
    this.powerUpUsed = val;
  }

  this.getPowerUpUsed = function () {
    return this.powerUpUsed;
  }

  this.incrementCurrentScore = function () {
    this.currentScore = this.currentScore + 1;
  }

  this.setCurrentScore = function (score) {
    this.currentScore = score ;
  }

  this.getCurrentScore = function () {
    return this.currentScore;
  }
  this.getQuizLength = function () {
    return this.quizLength;
  }

  this.setQuizLength = function (length) {
    this.quizLength = length;
  }

  this.getQuestion = function (index) {
    return this.allQuestionArray[index];
  }

  this.getOptions = function (index) {
    return this.allOptionArray[index];
  }

  this.getCorrectAns = function (index) {
    return this.allCorrectAnsArray[index];
  }

  this.getSongURL = function (index) {
    return this.allsongURLArray[index];
  }

  this.addQuestion = function (que) {
    this.allQuestionArray.push(que);
  }

  this.removeAllQuestion = function () {
    this.allQuestionArray = [];
  }

  this.addOption = function (options) {
    this.allOptionArray.push(options);
  }

  this.removeAllOption = function () {
    this.allOptionArray = [];
  }

  this.addCorrectAns = function (correctAns) {
    this.allCorrectAnsArray.push(correctAns);
  }

  this.removeAllCorrectAns = function () {
    this.allCorrectAnsArray = [];
  }

  this.getQuiz = function () {
    return $firebaseArray(firebase.database().ref().child('quizzes'));
  }

  this.getAllQuizFromOuizPOP = function () {
    return $firebaseArray(firebase.database().ref().child('quizzes-pop'));
  }

  this.getAllUserData = function () {
    return $firebaseArray(firebase.database().ref().child('users'));
  }

  this.addURL = function (url) {
    this.allsongURLArray.push(url);
  }

  this.removeSongURL = function () {
    this.allsongURLArray = [];
  }

  this.getQuestionDetail = function (id) {
    var quiz = this.getQuiz();
    quiz.$loaded()
      .then(function(){
          angular.forEach(quiz, function(data) {
            if(data.$id === id){
              _self.storeQuestion(data.questions);
            }
          });
      });
  }

  this.storeUserID = function () {
    auth.$onAuthStateChanged(function(authData){
      _self.userId = authData.uid;
      _self.userName = authData.displayName;
    })
  }

  this.storeQuizID = function (id) {
    this.quizId = id;
  }

  this.storeQuizName = function (name) {
    this.quizName = name;
  }

  this.storeInAllScores = function () {
    var childName = "all_scores";
    var msgData = {
      QUIZID: this.quizId,
      NAME: this.quizName,
      SCORE: this.currentScore,
      TIMESTAMP: +new Date,
      USERID: this.userId,
      USERNAME: this.userName
    };
    var newMsgKey = firebase.database().ref().child(childName).push().key;
    var updates = {};
    updates["/" + childName + "/" + newMsgKey] = msgData;
    firebase.database().ref().update(updates).then(function() {
      console.log("Saved scores to database in table all_scores.");
    });
  }

  this.incrementQuizPOP = function () {
    var quiz = this.getAllQuizFromOuizPOP();
    quiz.$loaded()
      .then(function(){
          angular.forEach(quiz, function(data) {
            if(data.$id === _self.quizId){
              var childName = "quizzes-pop";
              var updates = {};
              updates["/" + childName + "/" + _self.quizId] = data.$value + 1;
              firebase.database().ref().update(updates).then(function() {
                console.log("Incremented quiz pop.");
              });
            }
          });
      });
  }

  this.storeDataInUser = function () {
    var users = this.getAllUserData();
    users.$loaded()
      .then(function(){
          angular.forEach(users, function(data) {
            if(data.$id === _self.userId){
              var childName = "users";
              var msgData = {
                name: _self.quizName,
                score: _self.currentScore,
                timestamp: +new Date
              };
              var updates = {};
              var newMsgKey = firebase.database().ref().child(childName).child(_self.userId).child("history").push().key;
              updates["/" + childName + "/" + _self.userId + "/history/" + newMsgKey] = msgData;
              firebase.database().ref().update(updates).then(function() {
                console.log("Updated the users table.");
              });
            }
          });
      });
  }

  this.storeQuestion = function (questions) {
    var options = [];
    var length = 0;
    for(var key in questions){
      this.addQuestion(questions[key].question);
      options.push(questions[key].option1);
      options.push(questions[key].option2);
      options.push(questions[key].option3);
      options.push(questions[key].option4);
      this.addOption(options);
      options = [];
      this.addCorrectAns(questions[key].correctOption);
      this.addURL(questions[key].songUrl);
      ++length;
    }
    this.setQuizLength(length);
  }

  return this;

});
