spotiQuizApp.controller('CreateQuizController', ['$scope', 'Spotify', "$http", function ($scope, Spotify, $http) {

  $scope.songURL = "";

  $scope.getURL = function () {
    if ($scope.searchedSong != ""){
      Spotify.search($scope.searchedSong, 'track').then(function (data) {
        console.log(data);
        $scope.songURL = data.data.tracks.items[0].preview_url;
      });
    };
  };

   $scope.songURL = "";
   $scope.searchSong = function(val) {
  return $http.get('//api.spotify.com/v1/search?q='+val+'&type=track', {
  }).then(function(response){
    return response.data.tracks.items.map(function(item){
      return item.name;
    });
  });
};

}]);
