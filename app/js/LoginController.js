
//TODO:
// 1. implement Angular: $firebaseAuth
// 2. Change pages with $location?
// 3. Remove onAuthStateChanged, since we should not need to hide/show if we change pages.

spotiQuizApp.controller('LoginController', ['$scope','$firebaseAuth', function($scope, $firebaseObject, $firebaseAuth) {
  //$firebaseAuth(); // Whyyy~?

  var rootRef = firebase.database().ref() // Kirra detta, så kirrar vi

    $scope.btnSignUp = function() {
      console.log('bas')
      event.preventDefault();
      var username = $scope.email;
      var password = $scope.password;

      //$firebaseAuth().$createUserWithEmailAndPassword(username, password).then(function(){
      firebase.auth().createUserWithEmailAndPassword(username, password).then(function(){
        console.log('Successfully registered');
      }, function(error) {
        console.error('Sign up error', error);
      });
    }

    $scope.btnLogin = function() {
      event.preventDefault(); // COPYPASTA = "To prevent form refresh"
      var username = $scope.email;
      var password = $scope.password;

      firebase.auth().signInWithEmailAndPassword(username, password).then(function(){
        console.log('logged in successfully');



      }, function(error) {
        console.error('logged in error', error);
      });
    }

    $scope.btnLogout = function() {
    //$firebaseAuth().$signInWithEmailAndPassword(username,password);   <--- This is what we want
      firebase.auth().signOut().then(function() {
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

    }

      firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser)  {
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
          });
}]);
