spotiQuizApp.controller('ScoresController', function($scope) {

            var userScores = [
                ["Axel", "90's music", "500", "March 28th 15:21"],
                ["Arham", "Hip Hop", "500", "March 28th 15:12"],
                ["Edu", "Indie", "499", "March 28th 14:57"]
            ];

            $scope.showHistoricScores = function() {
                selectType.classList.add("hide");
            };

            $scope.showBestScores = function() {

            };
