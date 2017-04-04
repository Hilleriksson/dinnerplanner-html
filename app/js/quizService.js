
spotiQuizApp.factory('quizService', function ($resource) {

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

  this.getQuestion = function (id) {
    var noResult = [{
      'id': 0,
      'question': 'No such question available',
      'answer': 'No Awswer',
    }]
    for(i=0; i<questions.length; i++){
      if(questions[i].id === id){
        return questions[i];
      }
    }
    return noResult;
  }

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
