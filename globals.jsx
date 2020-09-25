var settingsFileName = "settings.xml"
var settingsFolder = File($.fileName).parent.fsName + "/settings/";
var macXMLFolder = "/Users/David/Dropbox/Development/Adobe/Excel/";
var pcXMLFolder = "/C/Users/David/Documents/vscode/Adobe_Versioning/xml/";

function getXMLFolder(){
  if (Folder.fs == "Windows"){
    return new Folder(pcXMLFolder);
  } else {
    return new Folder(macXMLFolder);
  }
}