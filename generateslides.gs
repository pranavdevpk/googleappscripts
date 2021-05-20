
// Function to create custom button in Google Sheets tool bar
function onOpen(e){
// This line calls the SpreadsheetApp and gets its UI   
// Or DocumentApp or FormApp.
var ui = SpreadsheetApp.getUi();

//These lines create the menu items and 
// tie them to functions we will write in Apps Script

ui.createMenu('Slides Creation')
.addItem('Create Slides', 'readDataFromExcel')
.addToUi();
}

// Function to create duplicates of template slide
function createCopyUsingSlidesApp(Client) {
// The Id of the presentation to copy
// Replace with Slide ID
var templateId = *Google Slides Template ID*;

// Access the template presentation
var template = SlidesApp.openById(templateId);
var fileName = template.getName();
var templateSlides = template.getSlides();

// Create a new presentation first
// (note: SlidesApp does not support a way to create a copy)
var newDeck = SlidesApp.create(Client +" Report");

// Remove default slides
var defaultSlides = newDeck.getSlides();
defaultSlides.forEach(function(slide) {
slide.remove();
});

// Insert slides from template
var index = 0;

templateSlides.forEach(function(slide) {
newDeck.insertSlide(index,slide)

index++;
});
return newDeck.getSlides();
}

function readDataFromExcel()
{
// Change Sheet ID here
var spreadsheetId= *Spreadsheet ID* // Sheet from which data should be used
// Change Sheet Name here
var g_sheet= SpreadsheetApp.openById(spreadsheetId).getSheetByName('DataPage') // Sheet name in the spreadsheet

var rows = g_sheet.getDataRange().getValues();
var slidesData =[]
for(var i =1; i< rows.length;i++) // i starts from the starting row of data
{
payload ={}
for(var j=0;j<rows[0].length;j++)
{
var field = rows[6][j];
var value = rows[i][j];
payload [field]=value
  
}
slidesData.push(payload)
}
loopThroughData(slidesData)

}

function loopThroughData(slidesData)
{var a=0
for (var i=0;i<slidesData.length;i++)
{
payload = slidesData[i]

// Define name of the slide
var slides = createCopyUsingSlidesApp(payload["Client"]);
//Replace data in slide 1
var shape1 = slides[0].getShapes();
shape1.forEach(function(shape){
  shape.getText().replaceAllText('{{period}}',payload["Period"]);
  shape.getText().replaceAllText('{{client}}',payload["Client"].toString());

});
//Replace data in slide 2
  var shapes = (slides[1].getShapes());
shapes.forEach(function(shape){
  shape.getText().replaceAllText('{{period}}',payload["Period"]);

});
//Replace data in slide 3
var shapes = (slides[2].getShapes());
shapes.forEach(function(shape){
  shape.getText().replaceAllText('{{period}}',payload["Period"]);
  shape.getText().replaceAllText('{{orders}}',payload["Orders"].toString());
  shape.getText().replaceAllText('{{roas}}',payload["ROAS"].toString());

});
var shapes = (slides[3].getShapes());
shapes.forEach(function(shape){

  shape.getText().replaceAllText('{{period}}',payload["Period"]);
  shape.getText().replaceAllText('{{sales}}',payload["Sales"].toString());
  shape.getText().replaceAllText('{{units sold}}',payload["Units Sold"].toString());

});

//Replace data in slide 4 - Table
var tables = slides[4].getTables();
// Logger.log(tables)
for(var k =0;k<tables[0].getNumRows();k++)
{
  tables[0].getCell(k,1).getText().replaceAllText('{{itemsrefunded}}',payload["Items Refunded"]);
  tables[0].getCell(k,1).getText().replaceAllText('{{feedbackreceived}}',payload["Feedback Received"].toString());
  tables[0].getCell(k,1).getText().replaceAllText('{{negativefeedback}}',payload["Negative Feedback"].toString());
  tables[0].getCell(k,1).getText().replaceAllText('{{atozclaims}}',payload["A-to-z Claims Granted"].toString());
  tables[0].getCell(k,1).getText().replaceAllText('{{refundrate}}',payload["Refund Rate (Units)"].toString());
} 


}

}
