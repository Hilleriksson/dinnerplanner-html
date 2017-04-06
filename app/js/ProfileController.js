//TODO:
//Repeating code line 11 and 32 (the $onAuthStateChanged)
//Fix the anuglar instead of route.reload (?)


spotiQuizApp.controller('ProfileController', ['$scope','$firebaseAuth','$location','$route', function($scope, $firebaseAuth, $location, $route) {

	var auth = $firebaseAuth();

	auth.$onAuthStateChanged(function(authData){
		console.log(authData)

		if (authData != null) {
		$scope.displayProfileName = authData.displayName;
		$scope.displayProfilePicture = authData.photoURL;
	}

        $scope.btnChangeName = function() {
      		event.preventDefault();

	        authData.updateProfile({ //Need to fix this to work in angular.
				  displayName: $scope.changeName
					}).then(function() {
					  	console.log('Update successful.')
					  	$route.reload();

					}, function(error) {
				  // An error happened.
					});
				}
   			})

	auth.$onAuthStateChanged(function(authData){
		console.log(authData)

		if (authData != null) {
		$scope.displayProfileName = authData.displayName;
		$scope.displayProfilePicture = authData.photoURL;
	}

    	$scope.btnChangePhoto = function() {
      		event.preventDefault();

	        authData.updateProfile({ //Need to fix this to work in angular
				  photoURL: "https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
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



}])
