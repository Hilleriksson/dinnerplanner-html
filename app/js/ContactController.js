spotiQuizApp.controller('ContactController', function($scope) {

  // Save contact message in the db
  $scope.saveContactMsg = function(firstName, lastName, email, phone, msg) {
    console.log("saveContactMsg() called.");
    var childName = "contact_msgs";

    var msgData = {
      email: email,
      message: msg,
      name: firstName + " " + lastName,
      phone: phone
    };

    var newMsgKey = firebase.database().ref().child(childName).push().key;
    var updates = {};
    updates["/" + childName + "/" + newMsgKey] = msgData;
    firebase.database().ref().update(updates).then(function() {
      console.log("Saved contact message to database.");
    });

    // Empty the content of the form
    $scope.formName = "";
    $scope.formLastName = "";
    $scope.formEmail = "";
    $scope.formPhone = "";
    $scope.formMsg = "";
    // Bootstrap alert indicating the user the message has been sent
    var bsAlert = document.getElementById("bootstrapAlert");
    bsAlert.classList.remove("hidden");
    // Hide after 2 seconds
    setTimeout(function() {
      bsAlert.classList.add("hidden");
    }, 2000);
  }
});
