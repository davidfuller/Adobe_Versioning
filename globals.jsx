var settingsFileName = "settings.xml"
var settingsFilenameJson = "settings.json"
var settingsFolder = File($.fileName).parent.fsName + "/settings/";
var macXMLFolder = "/Users/David/Dropbox/Development/Adobe/Excel/";
var pcXMLFolder = "/C/Users/David/Documents/vscode/Adobe_Versioning/xml/";

var compProfileFileName = "comp_profile.json"
var textLayerNames = ["Title", "Message", "Navigation"]
var renderNames = ["Still", "Clip"]

var defaultSettings = {
  macXMLPath: macXMLFolder,
  pcXMLPath: pcXMLFolder
}

function getXMLFolder(){
  if (Folder.fs == "Windows"){
    return new Folder(theSettings.pcXMLPath);
  } else {
    return new Folder(theSettings.macXMLPath);
  }
}