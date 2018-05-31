var config = {
    apiKey: "AIzaSyDb7poLCVH9HCHKCYwQIiGz-lCwda5rn8s",
    authDomain: "shopsmartfinal.firebaseapp.com",
    databaseURL: "https://shopsmartfinal.firebaseio.com",
    projectId: "shopsmartfinal",
    storageBucket: "",
    messagingSenderId: "673627430003"
  };
  firebase.initializeApp(config);
    
    var dataRef = firebase.database();
    
    // Initial Values
    var name = "";
    
    // Capture Button Click
    $("#add-user").on("click", function(event) {
      event.preventDefault();
      
      name = $("#name-input").val().trim();
 
      
      // Code for the push
      dataRef.ref().push({
        name: name,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    });
    
    // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    dataRef.ref().on("child_added", function(childSnapshot) {
      
      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().name);
  
      
      // full list of items to the well
      $("#full-member-list").append("<div class='well'><span class='member-name'> " + childSnapshot.val().name);
            
      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
        
    dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
      // Change the HTML to reflect
      $("#name-display").text(snapshot.val().name);
    
    });