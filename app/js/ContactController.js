spotiQuizApp.controller('ContactController', function($scope, $firebaseObject) {
    // Save contact message in the db
    var dbRef = firebase.database().ref();
    
    $scope.saveContactMsg = function(firstName, lastName, email, phone, msg) {
        
    };
});
