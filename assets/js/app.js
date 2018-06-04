$("#input-42").fileinput({
  maxFileCount: 10,
  allowedFileExtensions: ["jpg", "gif", "png", "txt"]
}).then(function() {
  $.ajax({
    url:'https://api.cloudsight.ai/v1/images',
    method:'POST',
    headers:{
        'Authorization': 'CloudSight -wslbEXDJIZNwAWW3BOP0g',
        'Content-Type': 'application/json'
    },
  dataType:'json',
  data:JSON.stingify({'remote_image_url': 
  'https://images.kogan.com/image/fetch/s--zV49J_Yh--/b_white,c_pad,f_auto,h_630,q_auto:good,w_1200/https://assets.kogan.com/files/product/iPhone-5S/apple-iphone-5s-gold-front-hires.jpg',
'locale': 'en_US'});
}).then(function(response){
  console.log(response);
})



// Initialize Firebase
var config = {
  apiKey: "AIzaSyDb7poLCVH9HCHKCYwQIiGz-lCwda5rn8s",
  authDomain: "shopsmartfinal.firebaseapp.com",
  databaseURL: "https://shopsmartfinal.firebaseio.com",
  projectId: "shopsmartfinal",
  storageBucket: "shopsmartfinal.appspot.com",
  messagingSenderId: "673627430003"
};
firebase.initializeApp(config);
  
  var dataRef = firebase.database();
  
  // Initial Values
  var item = "";
  
  // Capture Button Click
  $("#Favourite-button").on("click", function(event) {
    event.preventDefault();
    
    item = $("#Favourite-button").val().trim();

    
    // Code for the push
    dataRef.ref().push({
      item: item,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });
  
  // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
  dataRef.ref().on("child_added", function(childSnapshot) {
    
    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().item);

    
    // full list of items to the well
    $("#full-item-list").append("<div class='well'><span class='member-name'> " + childSnapshot.val().item);
          
    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
      
  dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    // Change the HTML to reflect
    $("#item-display").text(snapshot.val().item);
  
  });