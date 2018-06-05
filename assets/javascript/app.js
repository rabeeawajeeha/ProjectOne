<<<<<<< HEAD
$(document).ready(function() {

// //Creating a function for the URL api key
// function displayInfo()  {

//     var keyword = $(this).attr("keyword");
//     var queryURL = "https://api.ebay.com/buy/browse/v1/item_summary/search?q= + keywords + &limit=3";

// //ajax call method 
//     $.ajax({
//         url: queryURL,
//         method: "GET",



//     }).done(function(response){

//         var results = response.data;


//     }
// });

///////////////////////////////////////////NADIAH WORKING SECTION////////////////////////////////////////////////////

$.ajax({
    url:'https://api.cloudsight.ai/v1/images'
    method:'POST'
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
    //TODO::DO stuff
});

// Parse the response and build an HTML table to display search results
function _cb_findItemsByKeywords(root) {
    var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
    var html = [];
    html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3"><tbody>');
    for (var i = 0; i < items.length; ++i) {
      var item     = items[i];
      var title    = item.title;
      var pic      = item.galleryURL;
      var viewitem = item.viewItemURL;
      if (null != title && null != viewitem) {
        html.push('<tr><td>' + '<img src="' + pic + '" border="0">' + '</td>' + 
        '<td><a href="' + viewitem + '" target="_blank">' + title + '</a></td></tr>');
      }
    }
    html.push('</tbody></table>');
    document.getElementById("results").innerHTML = html.join("");
  }  // End _cb_findItemsByKeywords() function
  
  // Create a JavaScript array of the item filters you want to use in your request
  
  var filterarray = [
    {"name":"MaxPrice", 
     "value":"25", 
     "paramName":"Currency", 
     "paramValue":"USD"},
    {"name":"FreeShippingOnly", 
     "value":"true", 
     "paramName":"", 
     "paramValue":""},
    {"name":"ListingType", 
     "value":["AuctionWithBIN", "FixedPrice", "StoreInventory"], 
     "paramName":"", 
     "paramValue":""},
    ];
  
  console.log()
  
  // Define global variable for the URL filter
  var urlfilter = "";
  
  // Generates an indexed URL snippet from the array of item filters
  function  buildURLArray() {
    // Iterate through each filter in the array
    for(var i=0,l=filterarray.length; i<l; i++) {
      //Index each item filter in filterarray
      var itemfilter = filterarray[i];
      // Iterate through each parameter in each item filter
      for(var index in itemfilter) {
        // Check to see if the paramter has a value (some don't)
        if (itemfilter[index] !== "") {
          if (itemfilter[index] instanceof Array) {
            for(var r=0; r<itemfilter[index].length; r++) {
            var value = itemfilter[index][r];
            urlfilter += "&itemFilter\(" + i + "\)." + index + "\(" + r + "\)=" + value ;
            }
          } 
          else {
            urlfilter += "&itemFilter\(" + i + "\)." + index + "=" + itemfilter[index];
          }
        }
      }
    }
  }  // End buildURLArray() function
  
  // Execute the function to build the URL filter
  buildURLArray(filterarray);
  
  // Construct the request


  var url = "http://svcs.ebay.com/services/search/FindingService/v1";
      url += "?OPERATION-NAME=findItemsByKeywords";
      url += "&SERVICE-VERSION=1.0.0";
      url += "&SECURITY-APPNAME=OliverPa-ShopSmar-PRD-e2ccf98b2-f4cf0525" ;
      url += "&GLOBAL-ID=EBAY-ENCA";
      url += "&RESPONSE-DATA-FORMAT=JSON";
      url += "&callback=_cb_findItemsByKeywords";
      url += "&REST-PAYLOAD";
      url += "&keywords=sony";
      url += "&paginationInput.entriesPerPage=2";
      url += urlfilter;
  
     var product= "http://svcs.ebay.com/services/search/FindingService/v1?";
      product += "OPERATION-NAME=findItemsByProduct&";
      product += "SERVICE-VERSION=1.0.0&";
      product += "SECURITY-APPNAME=YourAppID&";
      product += "RESPONSE-DATA-FORMAT=JSON&"
      product +=  "REST-PAYLOAD&";
      product +=  "paginationInput.entriesPerPage=2&"
      product +=  "productId.@type=ReferenceID&"
      product +=  "productId=53039031"

    //   var productRequest =

    //   {
    //     "findItemsByProductRequest": {
    //     "xmlns": "http://www.ebay.com/marketplace/search/v1/services",
    //     "productId": {
    //     "type": "ReferenceID",
    //     "#text": "53039031"
    //     },
    //     "paginationInput": {
    //     "entriesPerPage": "2"
    //     }
    //     }
    //     }

  
  
  // Submit the request 
  s=document.createElement('script'); // create script element
  s.src= url;
  s.src= product;
  document.body.appendChild(s);
  
  // Display the request as a clickable link for testing
  document.write("<a href=\"" + url + "\">" + url + "</a>");
  document.write("<a href=\"" + product + "\">" + product +"<a>");

});

//name 
//description
//current price
//UPC 
//Image Source 
//site link
=======
var config = {
  // Initialize Firebase
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
var name = "";

// Capture Button Click
$("#add-user").on("click", function (event)
{
    event.preventDefault();

    name = $("#name-input").val().trim();


    // Code for the push
    dataRef.ref().push({
        name: name,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref().on("child_added", function (childSnapshot)
{

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);


    // full list of items to the well
    $("#full-member-list").append("<div class='well'><span class='member-name'> " + childSnapshot.val().name);

    // Handle the errors
}, function (errorObject)
    {
        console.log("Errors handled: " + errorObject.code);
    });

dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot)
{
    // Change the HTML to reflect
    $("#name-display").text(snapshot.val().name);

});


///////////////////////////////////////////AARON WORKING SECTION////////////////////////////////////////////////////

var SendWalmartParams = function (searchTerm, numItems, categoryId)
{
    console.log(searchTerm);
    console.log(numItems);
    console.log(categoryId);
    if (searchTerm === undefined)
    {
        console.log("Error, No Search Term Used")
    }
    else
    {
        var base = {
            'apiKey': 'c6esnayv43u5sguw64sac6cz',
            'format': 'json',
            'responseGroup': 'full',
            'query': searchTerm
        }
    }

    if (numItems)
    {
        console.log("ITEM LIMIT")
        var ItemLimit =
            {
                'numItems': numItems
            }
        Object.assign(base, ItemLimit)
        console.log("Add ItemLimit" + base);
    }

    if (categoryId)
    {
        var Category = {
            'categoryId': categoryId
        }
       Object.assign(base, Category)
       console.log("CATEGORY")
    }
    
    console.log("PARAMSEND" + JSON.stringify(base))
    GetWalmartProduct(base)
}

var GetWalmartProduct = function (queryParams)
{
    console.log("GETWLAMARTPROD" + JSON.stringify(queryParams))
    var url = "http://api.walmartlabs.com/v1/search";
    url += '?' + $.param(queryParams);

    console.log(url)
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'jsonp'
    }).done(function (result)
    {
        console.log(result);

    }).fail(function (err)
    {
        throw err;
    });
}
SendWalmartParams("Ipod", 2);

//If we want to do category search we need to defione the categories
//And then I can use the API to designate category id with in 
// the search criteria

///Return OBJ Values
/*
Card Info on landing
name
salePrice
shortDescription
customerRating


brandName
name
color
customerRating
customerRatingImage
itemId
modelNumber
largeImage - mediumImage - thumbnailImage
longDescription - shortDescription
productUrl
msrp
salePrice
stock
upc
categoryNode
categoryPath
*/


///////////////////////////////////////////AARON WORKING SECTION////////////////////////////////////////////////////



>>>>>>> e1da90aaab5eaf682a0d7947f4940a745cc78bc4
