
spotiQuizApp.factory('quizService', function ($resource, $firebaseArray) {

  var _self = this;
  this.allQuestionArray = [];
  this.allOptionArray = [];
  this.allCorrectAnsArray = [];
  this.allsongURLArray = [];
  this.quizLength = 0;

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
    return  $firebaseArray(firebase.database().ref().child('quizzes'));
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

  this.getGenres = function () {
    return genres;
  }

  this.searchGenre = function (genre) {
    var noResult = [{
      'id': 0,
      'genre': 'No such genre available',
    }]
    for(i=0; i<genres.length; i++){
      if(genres[i].genre === genre){
        return genres[i];
      }
    }
    return noResult;
  }

  // this.getQuestion = function (id) {
  //   var noResult = [{
  //     'id': 0,
  //     'question': 'No such question available',
  //     'answer': 'No Awswer',
  //   }]
  //   for(i=0; i<questions.length; i++){
  //     if(questions[i].id === id){
  //       return questions[i];
  //     }
  //   }
  //   return noResult;
  // }

  var questions = [{
    'id': 1,
    'question': '1 What is the name of this song ?',
    'answer': 'Blowers Daughter',
  },{
    'id': 2,
    'question': '2 What is the name of this song ?',
    'answer': 'Blowers Daughter',
  },{
    'id': 3,
    'question': '3 What is the name of this song ?',
    'answer': 'Blowers Daughter',
  },{
    'id': 4,
    'question': '4 What is the name of this song ?',
    'answer': 'Blowers Daughter',
  },{
    'id': 5,
    'question': '5 What is the name of this song ?',
    'answer': 'Blowers Daughter',
  },{
    'id': 6,
    'question': '6 What is the name of this song ?',
    'answer': 'Blowers Daughter',
  },{
    'id': 7,
    'question': '7 What is the name of this song ?',
    'answer': 'Blowers Daughter',
  },{
    'id': 8,
    'question': '8 What is the name of this song ?',
    'answer': 'Blowers Daughter',
  },{
    'id': 9,
    'question': '9 What is the name of this song ?',
    'answer': 'Blowers Daughter',
  },{
    'id': 10,
    'question': '10 What is the name of this song ?',
    'answer': 'Blowers Daughter',
  }]

  var genres = [{
    'id': 1,
    'genre': 'Rock',
  },{
    'id': 2,
    'genre': 'Techno',
  },{
    'id': 3,
    'genre': 'Pop',
  },{
    'id': 4,
    'genre': 'Jazz',
  },{
    'id': 5,
    'genre': 'Indie Pop',
  },{
    'id': 6,
    'genre': 'Folk',
  },{
    'id': 7,
    'genre': 'Classical',
  },{
    'id': 8,
    'genre': 'Heavy Metal',
  },{
    'id': 9,
    'genre': 'Waltz',
  },]

  return this;

});
