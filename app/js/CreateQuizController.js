spotiQuizApp.controller('CreateQuizController', ['$scope', 'Spotify', function ($scope, Spotify) {

  $scope.searchArtist = function () {
    Spotify.search($scope.searchartist, 'artist').then(function (data) {
      $scope.artists = data.data.artists.items;
      $scope.searchedArtist = data.data.artists.items[0].id;
      Spotify.getArtistTopTracks($scope.searchedArtist, 'SE').then(function (data) {
        $scope.searchedSong = data.data.tracks[0].preview_url;
      });
    });
  };


}]);
