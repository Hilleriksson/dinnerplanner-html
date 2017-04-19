

spotiQuizApp.controller('LoginController', ['$scope','$firebaseAuth','$firebaseArray', '$location', function($scope, $firebaseAuth, $firebaseArray, $location, quizService) {

  var auth = $firebaseAuth();

  //var rootRef = firebase.database().ref() // Kirra detta, så kirrar vi

  var dispName = 'first';
  var firstfirst = [];

    $scope.btnSignUp = function() {
      event.preventDefault();
      var username = $scope.email;
      var password = $scope.password;
      var firstTime = document.getElementById('firsttime');
      var passForm = document.getElementById('txtPassword');
      var emailForm = document.getElementById('txtEmail');
      var btnLogin = document.getElementById('btnLogin');
      var btnSignUp = document.getElementById('btnSignUp');
      var errorTxt = document.getElementById('errorTxt');

      auth.$createUserWithEmailAndPassword(username, password).then(function(){
        console.log('Successfully registered');

        auth.$onAuthStateChanged(function(authData){
          if (authData != null){
          if (authData.displayName == null){
            angular.copy(dispName, firstfirst)

            console.log('Welcome!')
             errorTxt.classList.add('hidden');
             firstTime.classList.remove('hidden');
             emailForm.classList.add('hidden');
             passForm.classList.add('hidden');
             btnLogin.classList.add('hidden');
             btnSignUp.classList.add('hidden');

          }
        }
      })

      }, function(error) {
        //console.error('Sign up error', error);
        console.log(error)
        $scope.errorMessage = error.message;
        errorTxt.classList.remove('hidden');
      });
    }


    $scope.btnLogin = function() {
      event.preventDefault(); // COPYPASTA = "To prevent form refresh"
      var username = $scope.email;
      var password = $scope.password;

      if (firstfirst[0] == 'f'){
        auth.$onAuthStateChanged(function(authData){
          if (authData != null){
            if (authData.displayName == null){
              authData.updateProfile({
                displayName: $scope.changeName,
                photoURL: "https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg",
              }).then(function() {

              }, function(error) {

              });
                $firebaseArray(firebase.database().ref().child('users'));

                var newUserDatabase = {
                  name: 'testQuiz',
                  score: 'x points',
                  timestamp: 'date/time'
                };

                var newHistoryKey = firebase.database().ref().child('users').push().key;

                var updates = {};
                   updates["/users/" + authData.uid + "/history/" + newHistoryKey] = newUserDatabase;
                   firebase.database().ref().update(updates).then(function() {
                   console.log("Saved contact message to database.");

                });
               }
             }
           })
         }


      auth.$signInWithEmailAndPassword(username, password).then(function(){   //<--- This is what we want
        console.log('logged in successfully');

        $location.path('/home')

      }, function(error) {
        //console.error('logged in error', error);
        $scope.errorMessage = error.message;
        errorTxt.classList.remove('hidden');
      });
    }

          var user = {};
          auth.$onAuthStateChanged(function(authData){
            angular.copy(authData, user);
            $scope.userids = user.uid;

              });
}]);
