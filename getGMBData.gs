var API_KEY = '' // Google My Business API Key with Places  API enabled
function myFunction() {
var sheet = SpreadsheetApp.openById("Spreadsheet ID with data to lookup");
  
var range = sheet.getSheetByName('Master File Needed').getDataRange(); // Name of Sheet
var cells = range.getValues();
var start = sheet.getSheetByName('Current').getRange('B2').getValue() // Storing Counter value in a separate sheets to overcome recurrence due to request time out in case of huge data load

  
for (var i = start; i < cells.length+1; i++) {
  
sheet.getSheetByName('Current').getRange('B2').setValue(i)
var address = (cells[i][8]).replace(/ /g, "%20");
    // Utilities.sleep(2000)
var url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input="+address+"&inputtype=textquery&fields=place_id&key="+API_KEY;
var response = UrlFetchApp.fetch(url);
var json = JSON.parse(response.getContentText());

if((json['status'])=="OK")
{
var placeid = json['candidates'][0]['place_id']
var candcount = json['candidates'].length
}
else
{
  sheet.getSheetByName('Master File Needed').getRange('J'+(i+1).toString()).setValue(json['status'])
  continue
}
var locdata = getlocdata(placeid)
//var updaterange = sheet.getRange("J"+(i+1).toString()+":"+"Q"+(i+1).toString()).setValues([[locdata.name,locdata.address,locdata.phone,locdata.url,locdata.reviewcount,locdata.avgrating,locdata.industry,locdata.userratingstotal]])
var updaterange = sheet.getRange("R"+(i+1).toString()+":"+"V"+(i+1).toString()).setValues([[locdata.website,locdata.status,placeid,locdata.name,candcount]])
  
}
}



function getlocdata(place_id) {
//var fields = 'name,rating,formatted_phone_number,formatted_address,user_ratings_total,url,type,review'; // Choose fields needed
var fields = 'name,business_status,website' // Choose Fields needed
var baseUrl = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=';
var queryUrl = baseUrl + place_id + '&fields=' + fields + '&key='+ API_KEY;

// Variables for formatting
var revlen = 0
var avgrat = 0
var usertotal =0
//Utilities.sleep(500)
var response = UrlFetchApp.fetch(queryUrl);
var json = response.getContentText();
var place = JSON.parse(json)
if(place.result==null)
{
  var data = place["results"]
}
else if(place.results==null)
{
var data = place["result"]
}
  Logger.log(data)


// if(data.reviews!=null)
// {
//   revlen = (data.reviews).length
// }
// else
// {
//   revlen= "-"
// }
// if(data.user_ratings_total!=null)
// {
//   usertotal = data.user_ratings_total
// }
// else
// {
//   usertotal= "-"
// }
// if(data.rating!=null)
// {
//   avgrat = data.rating
// }
// else
// {
//   avgrat= "-"
// }
if(data.business_status!=null)
{
  usertotal = data.business_status
}
else
{
  usertotal= "-"
}
  if(data.website!=null)
{
  var web = data.website
}
else
{
  var web= "-"
}
//  return({ "name" : data.name,
//  "address":data.formatted_address,
//  "phone":data.formatted_phone_number,
//  "url":data.url,
//  "reviewcount":revlen,
//  "avgrating":avgrat,
//  "industry" : (data.types).join(),
//  "userratingstotal" :usertotal})

return({"website":web,"status":usertotal,"name":data.name})
}
