//@include "comp_stuff.jsx"
//@include "ui_stuff.jsx"
//@include "xmlStuff.jsx"
//@include "Render_Stuff.jsx"
//@include "globals.jsx"
//@include "File_Stuff.jsx"

var theSettings = {
  macXMLPath: macXMLFolder,
  pcXMLPath: pcXMLFolder
}
$.writeln(XML.ignoreProcessingInstructions = false)
var heading = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
$.writeln(heading)
var testXML = new XML("<settings></settings>");
$.writeln(testXML.elements())

for (var key in theSettings){
  var temp = new XML("<temp>temp</temp>")
  testXML.insertChildBefore(null, temp);
  testXML.children()[testXML.children().length() - 1].setLocalName(key);
  testXML.children()[testXML.children().length() - 1] = theSettings[key];
}

$.writeln(testXML.toString())
var myThing = app.project.activeItem
var fred = 5
$.writeln("Hello")

if (createFolderIfNeeded(Folder(settingsFolder))){
  var myXMLFile = new File(settingsFolder + settingsFileName);
  $.writeln(myXMLFile.fsName);
  $.writeln(myXMLFile.open("w"));
  $.writeln(myXMLFile.writeln(heading));
  $.writeln(myXMLFile.write(testXML.toXMLString()));
  $.writeln(myXMLFile.close());
}
