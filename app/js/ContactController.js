spotiQuizApp.controller('ContactController', function($scope, $firebaseObject) {
  // Save contact message in the db
  var messagesRef = firebase.database().ref().child("contact_msgs").;

  $scope.saveContactMsg = function(firstName, lastName, email, phone, msg) {
    console.log("saveContactMsg() called.");
    var contactMsgs = $firebaseArray(messagesRef);
    contactMsgs.$add({
      email: email,
      message: msg,
      name: firstName + " " + lastName,
      phone: phone
    }).then(function(ref) {
        console.log("Saved contact message to database. Id: " + ref.key);
    });
  }
});