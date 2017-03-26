spotiQuizApp.controller('PlayController', function ($scope, $timeout, quizService) {

  $scope.counter = 3;
  $scope.stopped = false;
  $scope.buttonText='Stop';
  $scope.onTimeout = function(){
      $scope.counter--;
      if($scope.counter == 0){
        $scope.stopped = false;
        $scope.takeAction();
      }else{
        mytimeout = $timeout($scope.onTimeout,1000)
      }
  }
  var mytimeout = $timeout($scope.onTimeout,1000);
  $scope.takeAction = function(){
      if(!$scope.stopped){
          $timeout.cancel(mytimeout);
          $scope.buttonText='Resume';
      }
      else
      {
          mytimeout = $timeout($scope.onTimeout,1000);
          $scope.buttonText='Stop';
          $scope.counter = 3;
      }
          $scope.stopped=!$scope.stopped;
  }
});

spotiQuizApp.filter('formatTimer', function() {
  return function(input)
    {
        function z(n) {return (n<10? '0' : '') + n;}
        var seconds = input % 60;
        var minutes = Math.floor(input / 60);
        var hours = Math.floor(minutes / 60);
        return (z(seconds));
    };
});
