//@include "comp_stuff.jsx"
//@include "ui_stuff.jsx"
//@include "xmlStuff.jsx"
//@include "Render_Stuff.jsx"
//@include "globals.jsx"
//@include "File_Stuff.jsx"

$.writeln(XML.ignoreProcessingInstructions = false)
var heading = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
$.writeln(heading)
var testXML = new XML("<settings><name>David</name><xmlPath>/Users/David/Dropbox/Development/Adobe/Excel/</xmlPath></settings>");
$.writeln(testXML.elements())


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
