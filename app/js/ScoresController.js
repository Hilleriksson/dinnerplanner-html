spotiQuizApp.controller('ScoresController', function($scope) {

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
