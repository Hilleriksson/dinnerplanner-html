

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

    $scope.btnLogout = function() {
      auth.$signOut().then(function() {
        console.log('Signed Out');
      }, function(error) {
        console.error('Sign Out Error', error);
      });
    }

    $scope.btnChangeName = function() {
      event.preventDefault();
      var profileName = $scope.changeName
      console.log(profileName)

      firebase.auth().currentUser.updateProfile({
        displayName: profileName,
        photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(function() {
          console.log('Name change successful')


          }, function(error) {
            console.error('Name change error', error);
          });



      /*firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser)  {
              console.log(firebaseUser);
              console.log(firebaseUser.displayName)
              loginScreen.classList.add('hide');
              btnLogout.classList.remove('hide');
              profile.classList.remove("hide");
              profileName.innerHTML = firebaseUser.displayName;

            } else {
              console.log('not logged in');
              btnLogout.classList.add('hide');
              profile.classList.add("hide");
              loginScreen.classList.remove('hide');
            }
          });*/


    }

}]);
