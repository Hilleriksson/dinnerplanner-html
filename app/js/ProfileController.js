//TODO:
//Repeating code line 11 and 32 (the $onAuthStateChanged)
//Fix the anuglar instead of route.reload (?)


spotiQuizApp.controller('ProfileController', ['$scope','$firebaseAuth', '$firebaseArray', '$location','$route', function($scope, $firebaseAuth, $firebaseArray, $location, $route, $sce) {

	var auth = $firebaseAuth();
	var ref = firebase.database().ref();
	var list = $firebaseArray(ref);

	console.log($firebaseArray(ref.child('users')))


	$scope.smoer = function(){
		ref.push('vov');
		ref.child('vov').push('round one')
		ref.child('vov').child('round one').push(test)

	}




	auth.$onAuthStateChanged(function(authData){

		if (authData != null) {
		$scope.displayProfileName = authData.displayName;
		$scope.displayProfilePicture = authData.photoURL;
	}

        $scope.btnChangeName = function(changeName) {
      		event.preventDefault();
      		console.log(changeName)

	        authData.updateProfile({ //Need to fix this to work in angular.
				  displayName: changeName,
					}).then(function() {
					  	console.log('Update successful.')
					  	$route.reload();

					}, function(error) {
				  // An error happened.
					});
				}
   			})

	auth.$onAuthStateChanged(function(authData){

		if (authData != null) {
		$scope.displayProfileName = authData.displayName;
		$scope.displayProfilePicture = authData.photoURL;
	}

    	$scope.btnChangePhoto = function(changePhoto) {
      		event.preventDefault();
      		console.log(changePhoto)

	        authData.updateProfile({ //Need to fix this to work in angular
				  photoURL: changePhoto,
					}).then(function() {
					 	console.log('Update successful.')
					  	$route.reload();

					}, function(error) {
					  // An error happened.
					});
				}
    	})

        $scope.btnLogout = function() {
      auth.$signOut().then(function() {
        console.log('Signed Out');
        $location.path('/login')
      }, function(error) {
        console.error('Sign Out Error', error);
      });
    }

  $scope.photoPopover = {
    content: 'Insert photo-URL',
    templateUrl: 'myPopoverTemplates.html'
      };

   $scope.namePopover = {
   	content: 'Insert new name',
   	templateUrl: 'myPopoverTemplate.html'
   };


}])
