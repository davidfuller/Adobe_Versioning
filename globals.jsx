var settingsFileName = "settings.xml"
var settingsFilenameJson = "settings.json"
var settingsFolder = File($.fileName).parent.fsName + "/settings/";
var macXMLFolder = "/Users/David/Dropbox/Development/Adobe/Excel/";
var pcXMLFolder = "/C/Users/David/Documents/vscode/Adobe_Versioning/xml/";
var macOutputFolder = "/Users/David/Dropbox/Development/Adobe/Movies/";
var pcOutputFolder = "/C/Users/David/Documents/vscode/Adobe_Versioning/movies/";

var compProfileFileName = "comp_profile.json"
var textLayerNames = ["1L Title", "1L Message", "1L Navigation", "2L Title", "2L Message", "2L Navigation"]
var renderNames = ["Still", "Clip"]

var defaultSettings = {
  macXMLPath: macXMLFolder,
  pcXMLPath: pcXMLFolder,
  macOutputPath: macOutputFolder,
  pcOutputPath: pcOutputFolder
}

function getXMLFolder(){
  if (Folder.fs == "Windows"){
    return new Folder(theSettings.pcXMLPath);
  } else {
    return new Folder(theSettings.macXMLPath);
  }
}
function getOutputFolderName(){
  if (Folder.fs == "Windows"){
    return theSettings.pcOutputPath;
  } else {
    return theSettings.macOutputPath;
  }
}

var archiveSubFolder = "archive/"
