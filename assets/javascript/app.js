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
