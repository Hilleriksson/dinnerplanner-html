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

  var questions = [{
    'id': 1,
    'question': 'What is the name of this song ?',
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
