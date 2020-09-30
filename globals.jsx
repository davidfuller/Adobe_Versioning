var settingsFileName = "settings.xml"
var settingsFolder = File($.fileName).parent.fsName + "/settings/";
var macXMLFolder = "/Users/David/Dropbox/Development/Adobe/Excel/";
var pcXMLFolder = "/E/Development/xml/";

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