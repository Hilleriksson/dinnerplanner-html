
spotiQuizApp.controller('ProfileController', ['$scope','$firebaseAuth', '$firebaseArray', '$location','$route', function($scope, $firebaseAuth, $firebaseArray, $location, $route, $sce, quizService) {

	var auth = $firebaseAuth();
	var ref = firebase.database().ref();
	var list = $firebaseArray(ref);
	runHistory();

	function runHistory() {
	auth.$onAuthStateChanged(function(authData){
		if (authData != null) {
			$scope.displayProfileName = authData.displayName;
			$scope.displayProfilePicture = authData.photoURL;
			history();
			scoreTable();
	}
	function history() {
		var getUserHistory = $firebaseArray(firebase.database().ref().child('users').child(authData.uid).child('history'));
		//$scope.quizName = [];
		var whatQuiz = [];
		var whatScore = [];

		getUserHistory.$loaded()
			.then(function(){
				angular.forEach(getUserHistory, function(user)	{
					whatQuiz.push(user.name)
					whatScore.push(user.score)
				});
				this.repeatData = whatQuiz.map(function(value, index) {
					return {
						data: value,
						value: whatScore[index]
					}
				})
				$scope.repeatData = repeatData.reverse();
			});
		};

	function scoreTable() {
		var getScores = $firebaseArray(firebase.database().ref().child('all_scores'));
		//$scope.whatQuizName = [];
		var whatQuizID = [];
		var whatScoreID = [];
		var arr = [];
		var obj = { };

		var dic = {};

		getScores.$loaded()
			.then(function(){

				angular.forEach(getScores, function(scores)	{
					if (scores.USERID == authData.uid){
						whatQuizID.push(scores.NAME)
						dic[scores.QUIZID] = (dic[scores.QUIZID] || 0) + scores.SCORE;

					}
				});

					for (var i = 0, j = whatQuizID.length; i < j; i++) {
					   obj[whatQuizID[i]] = (obj[whatQuizID[i]] || 0) + 1;
					}
			})
		$scope.obj = obj;

		var getQuizzes = $firebaseArray(firebase.database().ref().child('quizzes'));
		var quizName = [];

		getQuizzes.$loaded()
			.then(function(){
				angular.forEach(getQuizzes, function(quiz)	{


					if ($.inArray(quiz.$id, whatQuizID) !== -1){
							quizName.push(quiz.name)
						}
					});

					this.scoreTableData = whatQuizID.map(function(value, index) {
						return {
							data: value,
							value: whatScoreID[index]
						}
					})
					$scope.scoreTableData = quizName;

				});
			};



		})

}







	/*auth.$onAuthStateChanged(function(authData){
		if (authData != null) {
			$scope.displayProfileName = authData.displayName;
			$scope.displayProfilePicture = authData.photoURL;
		}

	$scope.fakeGame = function() {
		$firebaseArray(firebase.database().ref().child('users').child(authData.uid).child('history'));
		console.log("fakeGame() called.")

		var historyData = {
			name: 'testQuiz',
			score: 'z points',
			timestamp: 'date/time'
		};

		var newHistoryKey = firebase.database().ref().child('users').child(authData.uid).child('history').push().key;

		var updates = {};
		updates["/users/" + authData.uid + "/history/" + newHistoryKey] = historyData;
		firebase.database().ref().update(updates).then(function() {
			console.log("Saved contact message to database.");
	      test1();

	  });

	}
})*/

	auth.$onAuthStateChanged(function(authData){
		if (authData != null) {
			$scope.displayProfileName = authData.displayName;
			$scope.displayProfilePicture = authData.photoURL;
		}

		$scope.btnChangeName = function(changeName) {
			event.preventDefault();
			console.log(changeName)

	        authData.updateProfile({
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

	        authData.updateProfile({
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
