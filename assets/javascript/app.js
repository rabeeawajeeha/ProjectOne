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
$("#add-user").on("click", function (event) {
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
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
    // Change the HTML to reflect
    $("#name-display").text(snapshot.val().name);

});


///////////////////////////////////////////AARON WORKING SECTION////////////////////////////////////////////////////

//InitializePage();
/*
Description: This function Creates a JSON Object of parameter to send to the GetWalmartProduct function to perform an ajax call
Parameters: searchTerm - string for ajax call to search Keyword
            numItems - string to limit the number of results return from ajax call
            categoryId - string an Id provided to seach with in a specific category in the walmart api
Created By: Aaron Colbert
Created: 05/28/2018
LastModified: 06/02/2018
 */
var SendWalmartParams = function (searchTerm, numItems, categoryId,jqueryRef)
{
    console.log(searchTerm);
    console.log(numItems);
    console.log(categoryId);
    if (searchTerm === undefined) {
        console.log("Error, No Search Term Used")
    } else {
        var base = {
            'apiKey': 'c6esnayv43u5sguw64sac6cz',
            'format': 'json',
            'responseGroup': 'full',
            'query': searchTerm
        }
    }

    if (numItems) {
        console.log("ITEM LIMIT")
        var ItemLimit = {
            'numItems': numItems
        }
        Object.assign(base, ItemLimit)
        console.log("Add ItemLimit" + base);
    }

    if (categoryId) {
        var Category = {
            'categoryId': categoryId
        }
        Object.assign(base, Category)
        console.log("CATEGORY")
    }

    console.log("PARAMSEND" + JSON.stringify(base))
    GetWalmartProduct(base,jqueryRef)
}

LastModified: 06/02/2018

var GetWalmartProduct = function (queryParams,jqueryRef)
{
    console.log("GETWLAMARTPROD" + JSON.stringify(queryParams))
    var url = "http://api.walmartlabs.com/v1/search";
    url += '?' + $.param(queryParams);
    console.log(url)
    $.ajax({
        url: url,
        dataType: 'jsonp'
    }).done(function (result)
    {
        var Item = result.items
        if (Item.length == 0)
        {
            //Display a No Results Message
        }
        else
        {
            for (var i = 0; i < Item.length; i++)
            {
                console.log(result);
                console.log(Item[i].name);
                console.log(Item[i].salePrice);
                console.log(Item[i].upc);
                console.log(Item[i].largeImage);
                console.log(Item[i].productUrl);

                DrawProductCard(Item[i].name, Item[i].salePrice, Item[i].upc, Item[i].largeImage, Item[i].productUrl, jqueryRef)
            }
        }
    }).fail(function (err)
    {
        throw err;
    });
}

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

/*
Description: This function Creates the column that displayes a single product and it's information that is added to a row
Parameters: name - stringvalue for the product Title
            price - string value for the Product Price
            upc - string value to be stored in an attribute for Product details
            imageSrc - Source image of product
            siteLink - Link to the actual site of the product
Created By: Aaron Colbert
Created: 06/02/2018
LastModified: 06/02/2018
 */
var DrawProductCard = function (name, price, upc, imageSrc, siteLink, jqueryRef)
{
    var divCol = $("<div class='col-md-3 product-grid'>");
    var divImage = $("<div class='image'>");

    var alink = $("<a>");
    alink.attr("href", "#");

    var img = $("<img class='w-100 cardimage'>");
    img.attr("src", imageSrc);

    var divOverlay = $("<div class='overlay'>");

    var divDetails = $("<div class='detail'>");
    divDetails.text("View Details")

    divOverlay.append(divDetails);
    alink.append(img);
    alink.append(divOverlay);
    divImage.append(alink);
    divCol.append(divImage);

    var h5Title = $("<h5 class='text-center'>")
    h5Title.text(name);
    divCol.append(h5Title);

    var star1 = $("<span class='fa fa-star'>");
    divCol.append(star1);
    var star2 = $("<span class='fa fa-star'>");
    divCol.append(star2);
    var star3 = $("<span class='fa fa-star'>");
    divCol.append(star3);
    var star4 = $("<span class='fa fa-star'>");
    divCol.append(star4);
    var star5 = $("<span class='fa fa-star'>");
    divCol.append(star5);

    var h5Price = $("<h5 class='text-center'>");
    h5Price.text("Price: $" + price);
    divCol.append(h5Price);

    var aSiteLink = $("<a class='btn buy'>");
    aSiteLink.attr("href", siteLink);
    aSiteLink.text("BUY");
    divCol.append(aSiteLink);

    //Category class or ID needed to determine where to put Product card
    // jqueryRef.append(divCol);

}

/*
Description: This ONCLICK function is to execute a search
Created By: Aaron Colbert
Created: 06/02/2018
LastModified: 06/02/2018
 */
$("#submit").on("click", function (event)
{
    event.preventDefault();

    var searchTerm = $("#searchInput").val().trim();
    if (searchTerm)
    {
        ProductSearch(searchTerm);
    }
});

/*
Description: This function calls a set of functions that call ajax requests to populate the view with products
Parameters: searchTerm - string the keyword to be used in the api calls
Created By: Aaron Colbert
Created: 06/02/2018
LastModified: 06/02/2018
 */
var ProductSearch = function (searchTerm)
{
    if (searchTerm)
    {
        jqueryRef = $("");//Somewhere on the SearchResultsPage

        SendWalmartParams(searchTerm, jqueryRef); //Send limit if we want to limit # of search results
        //PAGE Navigtion to search results 
        //Call functions of ajax calls for keyword searchs
        //Pass the jquery of where to populate the products
    }
}

/*
Description: This function calls a set of functions that call ajax requests to Intialize the Productsd within the page
Created By: Aaron Colbert
Created: 06/02/2018
LastModified: 06/02/2018
 */
var InitializePage = function ()
{
    SendWalmartParams("", 3,"",$(""))//Add CategoryId 
    //Add Ebay Initial call for Specified Category

    SendWalmartParams("", 3,"",$(""))//Add CategoryId 
    //Add Ebay Initial call for Specified Category

    SendWalmartParams("", 3,"",$(""))//Add CategoryId 
    //Add Ebay Initial call for Specified Category
}



///////////////////////////////////////////AARON WORKING SECTION END////////////////////////////////////////////////////

function ebayInfoKeyword(keyword,limit) {

var queryUrl = "http://svcs.ebay.com/services/search/FindingService/v1";
queryUrl += "?OPERATION-NAME=findItemsByKeywords";
queryUrl += "&SERVICE-VERSION=1.0.0";
queryUrl += "&SECURITY-APPNAME=OliverPa-ShopSmar-PRD-e2ccf98b2-f4cf0525";
queryUrl += "&GLOBAL-ID=EBAY-ENCA";
queryUrl += "&RESPONSE-DATA-FORMAT=JSON";
//url += "&callback=_cb_findItemsByKeywords";
queryUrl += "&REST-PAYLOAD";
queryUrl += "&keywords=" + keyword;
queryUrl += "&paginationInput.entriesPerPage=" + limit;

    //ajax call method 
    $.ajax({
        url: queryUrl,
        method: "GET",
       dataType: "jsonp"
    }).done(function (response) {

            var results = response.findItemsByKeywordsResponse[0].searchResult[0].item
    
            console.log(results);            

            if (results.length == 0)
            {
                //Display a No Results Message
            }
            else
            {
                for (var i = 0, l=results.length; i < l; i++)
                {
                    var title = results[i].title[0];
                    var price = results[i].sellingStatus[0].currentPrice[0].__value__;
                    var picture = results[i].galleryURL[0];
                    var itemUrl = results[i].viewItemURL[0];
                    var itemId = results[i].itemId[0];

                    console.log(results);
                    console.log(results[i].title[0]);
                    console.log(results[i].sellingStatus[0].currentPrice[0].__value__);
                    console.log(results[i].galleryURL[0]);
                    console.log(results[i].viewItemURL[0]);
                    console.log(results[i].itemId[0])
                    DrawProductCard(title, price, picture, itemUrl, itemId);
                }
            }
        }).fail(function (err)
        {
            throw err;
        });
    }       
    ebayInfoKeyword("sony", 3 );


// category api call
//     function ebayInfoCategory(categoryName, limit){

//    var queryUrl = "http://svcs.ebay.com/services/search/FindingService/v1?"
//    queryUrl += "&OPERATION-NAME=findItemsByCategory";
//    queryUrl += "&SERVICE-VERSION=1.0.0";
//    queryUrl += "&SECURITY-APPNAME=OliverPa-ShopSmar-PRD-e2ccf98b2-f4cf0525";
//    queryUrl += "&RESPONSE-DATA-FORMAT=JSON";
//    queryUrl += "&REST-PAYLOAD";
//    queryUrl += "&categoryName= " + categoryName;
//    queryUrl += "paginationInput.entriesPerPage=" + limit;
   
//    $.ajax({
//     url: queryUrl,
//     method: "GET",
//    dataType: "jsonp"
// }).done(function (response) {

//         console.log(response);  

//         var results = response.findItemsByCategoryResponse[0].searchResult[0].item
        
            
//         console.log(results);
                  

//         if (results.length == 0)
//         {
//             //Display a No Results Message
//         }
//         else
//         {
//             for (var i = 0, l=results.length; i < l; i++)
//             {
//                 var title = results[i].title[0];
//                 var price = results[i].sellingStatus[0].currentPrice[0].__value__;
//                 var picture = results[i].galleryURL[0];
//                 var itemUrl = results[i].viewItemURL[0];
//                 var itemId = results[i].itemId[0];

//                 console.log(results);
//                 console.log(results[i].title[0]);
//                 console.log(results[i].sellingStatus[0].currentPrice[0].__value__);
//                 console.log(results[i].galleryURL[0]);
//                 console.log(results[i].viewItemURL[0]);
//                 console.log(results[i].itemId[0])
//                 DrawProductCard(title, price, picture, itemUrl, itemId);
//             }
//         }
//     }).fail(function (err)
//     {
//         throw err;
//     });
// }
//      ebayInfoCategory("20914", 3);  


// //single api call
//     function ebayInfoSingle(ItemId){

//    var queryUrl = "http://open.api.ebay.com/shopping?"
//    queryUrl += "callname=GetSingleItem";
//    queryUrl += "&responseencoding=JSON";
//    queryUrl += "&appid=OliverPa-ShopSmar-PRD-e2ccf98b2-f4cf0525";
//    queryUrl += "&siteid=0";
//    queryUrl += "&version=967";
//    queryUrl += "&ItemID=" + ItemId;
//    queryUrl += "&IncludeSelector=Description,ItemSpecifics";
//    queryUrl += "&callbackname = ebayInfoSingle"
   
//    //var queryUrl = "http://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=OliverPa-ShopSmar-PRD-e2ccf98b2-f4cf0525&siteid=0&version=967&ItemID=332669346050&IncludeSelector=Description,ItemSpecifics"


//    $.ajax({
//     url: queryUrl,
//     method: "GET",
//     dataType: "jsonp",
//     callback: "parseResponse"
// }).done(function (response) {

//         console.log(JSON.parse(response));  

//         var results = response.Item
         
//         console.log(results);
                  

//         if (results.length == 0)
//         {
//             //Display a No Results Message
//         }
//         else
//         {
//             for (var i = 0, l=results.length; i < l; i++)
//             {
//                 var title = results[i].Title;
//                 var description = results[i].Item.Description;
//                 var price = results[i].ConvertedCurretPrice.Value;
//                 var picture = results[i].GalleryURL;
//                 var itemUrl = results[i].viewItemURLForNaturalSearch;
//                 var itemId = results[i].itemID;
//                 var itemSpecs = results[i].ItemSpecifics.NameValueList[i];

//                 console.log(results);
//                 console.log(results[i].Title);
//                 console.log(results[i].Item.Description);
//                 console.log(results[i].ConvertedCurretPrice.Value);
//                 console.log(results[i].GalleryURL)
//                 console.log(results[i].viewItemURLForNaturalSearch);
//                 console.log(results[i].itemID)
//                 DrawProductCard(title, description, price, picture, itemUrl, itemId, itemSpecs);
//             }
//         }
//     }).fail(function (err)
//     {
//         throw err;
//     });
// }
//     ebayInfoSingle("332669346050");
    




    // Parse the response and build an HTML table to display search results
    // function _cb_findItemsByKeywords(root) {
    //     var items = root.findItemsByKeywordsResponse[0].searchResult[1].item || [];
    //     var html = [];
    //     html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3"><tbody>');
    //     for (var i = 0; i < items.length; ++i) {
    //         var item = items[i];
    //         var title = item.title;
    //         var pic = item.galleryURL;
    //         var viewitem = item.viewItemURL;
    //         if (null != title && null != viewitem) {
    //             html.push('<tr><td>' + '<img src="' + pic + '" border="0">' + '</td>' +
    //                 '<td><a href="' + viewitem + '" target="_blank">' + title + '</a></td></tr>');
    //         }
    //     }
    //     html.push('</tbody></table>');
    //     document.getElementById("results").innerHTML = html.join("");
    // } // End _cb_findItemsByKeywords() function

    // Create a JavaScript array of the item filters you want to use in your request

    // var filterarray = [{
    //         "name": "MaxPrice",
    //         "value": "25",
    //         "paramName": "Currency",
    //         "paramValue": "USD"
    //     },
    //     {
    //         "name": "FreeShippingOnly",
    //         "value": "true",
    //         "paramName": "",
    //         "paramValue": ""
    //     },
    //     {
    //         "name": "ListingType",
    //         "value": ["AuctionWithBIN", "FixedPrice", "StoreInventory"],
    //         "paramName": "",
    //         "paramValue": ""
    //     },
    // ];

    // console.log()

    // // Define global variable for the URL filter
    // var urlfilter = "";

    // // Generates an indexed URL snippet from the array of item filters
    // function buildURLArray() {
    //     // Iterate through each filter in the array
    //     for (var i = 0, l = filterarray.length; i < l; i++) {
    //         //Index each item filter in filterarray
    //         var itemfilter = filterarray[i];
    //         // Iterate through each parameter in each item filter
    //         for (var index in itemfilter) {
    //             // Check to see if the paramter has a value (some don't)
    //             if (itemfilter[index] !== "") {
    //                 if (itemfilter[index] instanceof Array) {
    //                     for (var r = 0; r < itemfilter[index].length; r++) {
    //                         var value = itemfilter[index][r];
    //                         urlfilter += "&itemFilter\(" + i + "\)." + index + "\(" + r + "\)=" + value;
    //                     }
    //                 } else {
    //                     urlfilter += "&itemFilter\(" + i + "\)." + index + "=" + itemfilter[index];
    //                 }
    //             }
    //         }
    //     }
    // } // End buildURLArray() function

    // // Execute the function to build the URL filter
    // buildURLArray(filterarray);

    // // Construct the request




    // var product = "http://svcs.ebay.com/services/search/FindingService/v1?";
    // product += "OPERATION-NAME=findItemsByProduct&";
    // product += "SERVICE-VERSION=1.0.0&";
    // product += "SECURITY-APPNAME=YourAppID&";
    // product += "RESPONSE-DATA-FORMAT=JSON&"
    // product += "REST-PAYLOAD&";
    // product += "paginationInput.entriesPerPage=2&"
    // product += "productId.@type=ReferenceID&"
    // product += "productId=53039031"

    // var productRequest =

    // {
    // "findItemsByProductRequest": {
    // "xmlns": "http://www.ebay.com/marketplace/search/v1/services",
    // "productId": {
    // "type": "ReferenceID",
    // "#text": "53039031"
    //  },
    // "paginationInput": {
    // "entriesPerPage": "2"
    // }
    // }
    // }



    // // Submit the request 
    // s = document.createElement('script'); // create script element
    // s.src = url;
    // s.src = product;
    // document.body.appendChild(s);

    // // Display the request as a clickable link for testing
    // document.write("<a href=\"" + url + "\">" + url + "</a>");
    // document.write("<a href=\"" + product + "\">" + product + "<a>");



// //name 
// //description
// //current price
// //UPC 
// //Image Source 
// //site link
