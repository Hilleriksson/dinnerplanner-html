

spotiQuizApp.controller('LoginController', ['$scope','$firebaseAuth','$location', function($scope, $firebaseAuth, $location) {

  var auth = $firebaseAuth();

  //var rootRef = firebase.database().ref() // Kirra detta, så kirrar vi

    $scope.btnSignUp = function() {
      event.preventDefault();
      var username = $scope.email;
      var password = $scope.password;

      auth.$createUserWithEmailAndPassword(username, password).then(function(){
        console.log('Successfully registered');
      }, function(error) {
        console.error('Sign up error', error);
      });
    }

    $scope.btnLogin = function() {
      event.preventDefault(); // COPYPASTA = "To prevent form refresh"
      var username = $scope.email;
      var password = $scope.password;

      auth.$signInWithEmailAndPassword(username, password).then(function(){   //<--- This is what we want
        console.log('logged in successfully');

        $location.path('#!/home')

      }, function(error) {
        console.error('logged in error', error);
      });
    }

          var user = {};
          auth.$onAuthStateChanged(function(authData){
            angular.copy(authData, user);
            $scope.userids = user.uid;

              });

}]);
