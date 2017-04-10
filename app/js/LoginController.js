

spotiQuizApp.controller('LoginController', ['$scope','$firebaseAuth','$location', function($scope, $firebaseAuth, $location) {

  var auth = $firebaseAuth();

  //var rootRef = firebase.database().ref() // Kirra detta, så kirrar vi

    $scope.btnSignUp = function() {
      event.preventDefault();
      var username = $scope.email;
      var password = $scope.password;
      var firstTime = document.getElementById('firsttime');
      var passForm = document.getElementById('txtPassword');
      var emailForm = document.getElementById('txtEmail');
      var btnLogin = document.getElementById('btnLogin');
      var btnSignUp = document.getElementById('btnSignUp');

      auth.$createUserWithEmailAndPassword(username, password).then(function(){
        console.log('Successfully registered');

        auth.$onAuthStateChanged(function(authData){
          if (authData.displayName == null){
            console.log('Welcome!')
             firstTime.classList.remove('hidden');
             emailForm.classList.add('hidden');
             passForm.classList.add('hidden');
             btnLogin.classList.add('hidden');
             btnSignUp.classList.add('hidden');

          }
        })

      }, function(error) {
        console.error('Sign up error', error);
      });
    }


    $scope.btnLogin = function() {
      event.preventDefault(); // COPYPASTA = "To prevent form refresh"
      var username = $scope.email;
      var password = $scope.password;
      var changeName = $scope.changeName;
      console.log($scope.changeName)

      auth.$onAuthStateChanged(function(authData){
          if (authData.displayName == null){
            authData.updateProfile({
              displayName: changeName,
              photoURL: "https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg",
            }).then(function() {

            }, function(error) {

                });
              }

            })

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
