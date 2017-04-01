spotiQuizApp.controller('CreateQuizController', ['$scope', 'Spotify', "$http", function ($scope, Spotify, $http) {


  // Tries to match selected song with URL
  // Maybe not optimal solution
  $scope.songURL = "";
  $scope.getURL = function () {
    var matchCounter = 0;
    if ($scope.searchedSong != ""){
      var justSong = $scope.searchedSong.split(", ");
      Spotify.search(justSong[0], 'track').then(function (data) {
        while (true) {
          //console.log(data.data.tracks.items[matchCounter].name + " med "+ justSong[0])
          //console.log(data.data.tracks.items[matchCounter].artists[0].name  + " med " + justSong[1])
          if (data.data.tracks.items[matchCounter].name == justSong[0] && data.data.tracks.items[matchCounter].artists[0].name == justSong[1]){
              $scope.songURL = data.data.tracks.items[matchCounter].preview_url;
              break;
          } else {
            matchCounter++;
          }
        }
      });
    };
  };


  // Called upon when the typeaheader is called.
  $scope.searchSong = function(val) {
  return $http.get('//api.spotify.com/v1/search?q='+val+'&type=track', {
  }).then(function(response){
    return response.data.tracks.items.map(function(item){
      var songAndArtist = item.name + ", " + item.artists[0].name;
      return songAndArtist;
    });
  });
};

}]);
