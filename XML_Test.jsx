//@include "comp_stuff.jsx"
//@include "ui_stuff.jsx"
//@include "xmlStuff.jsx"
//@include "Render_Stuff.jsx"
//@include "globals.jsx"
//@include "File_Stuff.jsx"
//@include "json_Stuff.jsx"

//$.writeln(saveSettings(theSettings, settingsFileName));
var theSettings = loadSettingsJson(settingsFilenameJson);

for (var key in theSettings){
  $.writeln(key + ": " + theSettings[key]);
}

$.writeln(saveSettingsJson(theSettings, settingsFilenameJson))
