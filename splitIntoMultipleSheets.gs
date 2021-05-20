function splitrows()
{
  var master = SpreadsheetApp.openById(templateID).getSheetByName('FinalData')
  var masterrows = master.getDataRange().getValues()
  var rowlimit = 10 // Number of Rows needed per sheet
  // Counter Sheet incase of huge number of rows (go for python if the data is huge) -- Configure in a Sheet named "Config"
  var sheetnum = SpreadsheetApp.openById(templateID).getSheetByName('Config').getRange(1,2).getValue();
  var sheetName = SpreadsheetApp.openById(templateID).getSheetByName('Config').getRange(3,2).getValue();
  var startingvalue=SpreadsheetApp.openById(templateID).getSheetByName('Config').getRange(2,2).getValue();
  for(var i=startingvalue;i<masterrows.length;i++)
  {
    SpreadsheetApp.openById(templateID).getSheetByName("Config").getRange(2,2).setValue(i)
    if(i%rowlimit==1)
    {
      sheetnum = sheetnum+1
      var uploadSheet = SpreadsheetApp.openById(templateID).insertSheet();
      sheetName = "Upload Sheet" + sheetnum.toString()
      SpreadsheetApp.openById(templateID).getSheetByName("Config").getRange(1,2).setValue(sheetnum)
      SpreadsheetApp.openById(templateID).getSheetByName("Config").getRange(3,2).setValue(sheetName)
    uploadSheet.setName("Upload Sheet" + sheetnum.toString());
    
    var headers = [[//*header columns in sheet*]]
    uploadSheet.getRange(1, 1, 1, headers[0].length).setValues(headers);
    }
    uploadSheet = SpreadsheetApp.openById(templateID).getSheetByName(sheetName)
    var lastrow = uploadSheet.getDataRange().getLastRow()
    Logger.log(lastrow)
    // Filter values based on conditions. Here I am removing ",","&","and" and "And"
    if((isNaN(masterrows[i][14])==true)&& (isNaN(masterrows[i][14])==true) )
    {
    if((masterrows[i][7]!="")&& (masterrows[i][14].indexOf(",")==-1) && (masterrows[i][14].indexOf("&")==-1) && (masterrows[i][14].indexOf("and")==-1) && (masterrows[i][14].indexOf("And")==-1) && (masterrows[i][14]!=""))
    {
    uploadSheet.getRange(lastrow+1,1,1, masterrows[i].length).setValues([masterrows[i]])
    }
    else
    {
      continue
    }
    }
  }
}
