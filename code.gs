// Code muss mit einer Tabelle verknüpft sein mit den Spalten (in der Reihenfolge)
// Name, Bestand, Aktueller Bestand, Verantwortlich

var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
var url = spreadSheet.getUrl();
var sheetList = spreadSheet.getSheets();
var sheet = sheetList[0];

function Check() {
  var lastRow = sheet.getLastRow();
  var data = sheet.getSheetValues(2, 1, lastRow, 4);
  for (var i = 0; i < data.length; i++) {
    if (data[i][1] < data[i][2]) { 
      sheet.getRange(i+2, 1, 1, 4).setFontColor("red");
      Logger.log("Schicke eine Infomail!", data[i][0]);
      infoMail(data[i]);
    }
    else {
      sheet.getRange(i+2, 1, 1, 4).setFontColor("black");
    }
  }
}

function infoMail(product) {
  var name = product[0];
  var currentNumber = product[1];
  var requiredNumber = product[2];
  var recipient = product[3];
  
  var subject = name + " muss nach bestellt werden";
  
  var body = "Hallo,\n\n"
  + name + " muss nachbestellt werden. Derzeit beträgt der Bestand " + currentNumber
  + ", wir brauchen aber mindestens " + requiredNumber + ".\n\n"
  + "Die Differenz beträgt " + (requiredNumber - currentNumber) + ".\n\n"
  + "Link zur Tabelle: " + url + "\n\n"
  + "--\n"
  + "Dies ist eine automatisch erstellte E-Mail.";
  
  GmailApp.sendEmail(recipient, subject, body);
  
}
