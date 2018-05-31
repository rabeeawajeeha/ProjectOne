
var GetWalmartProduct = function ()
{
    var url = "http://api.walmartlabs.com/v1/search";
    url += '?' + $.param({
        'apiKey': 'c6esnayv43u5sguw64sac6cz',
        'format': 'json',
       'responseGroup': 'full',//or base
        'query': 'ipod'
        // 'categoryId': '',
        // 'numItems': '' //Default is 10


        
    });

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
GetWalmartProduct();

//If we want to do category search we need to defione the categories
//And then I can use the API to designate category id with in 
// the search criteria

///Return OBJ Values
/*
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