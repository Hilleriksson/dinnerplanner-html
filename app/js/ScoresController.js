spotiQuizApp.controller('ScoresController', function($scope, $firebaseObject) {

    // Ref to interact with Firebase
    var ref = firebase.database().ref();

    $scope.showHistoricScores = function() {
        $scope.moduleState = "historic";
    };

    $scope.showBestScores = function() {
        $scope.moduleState = "highest";
    };

    function _getScores() {
        // get scores from firebase
        
    }
});
