//@include "comp_stuff.jsx"
//@include "ui_stuff.jsx"
//@include "xmlStuff.jsx"
//@include "Render_Stuff.jsx"
//@include "globals.jsx"
//@include "json_Stuff.jsx"
//@include "File_Stuff.jsx"
//@include "Profile_stuff.jsx"
//@include "Generic.jsx"

var theSettings = loadSettingsJson(settingsFilenameJson);
var file = new File;
var defaultXMLFolder = getXMLFolder()
var myXML
var doIt
var hexColour = [];
/**
 * @type {CompItem}
 */
var globalMainComp
/**
 * @type {CompItem}
 */
var globalEndBoardComp

var fileWindow = getXMLFile();
if (fileWindow.show() == 1){
  $.writeln(file.fsName);
  if (file.open("r")){
    var xmlString = file.read(); 
    myXML = new XML(xmlString);
    //

    var promoWindow = displayPromos();
    var selectedPromos = [];
    if (promoWindow.window.show() == 1){
      $.writeln(columnNames(myXML));
      for (var i = 0; i< promoWindow.list.items.length; i++){
        $.writeln(promoWindow.list.items[i].selected)
        selectedPromos.push(promoWindow.list.items[i].selected)
      }
      doIt = true;
    } else {
      doIt = false;
    }
  } else {
    doIt = false
  }
 } else {
   $.writeln("No file");
   doIt = false
 }


if (doIt){
  var myFields = columnNames(myXML)
  var pData = promoData(myXML,1)
  $.writeln(pData.title)

  processData()
}

function showCompWindow(){
  var projectItems = compItems();
  var compWindow = createCompSettingsWindow(projectItems);
  compWindow.window.show() 
}

function getItems(){
  return app.project.items
}

function getLayers(index){
  var item = app.project.items[index] 
  if (item instanceof CompItem){
    return item.layers
  } else {
    return null
  }
}


function selectedItemAndLayer(){

  //var currItem = new CompItem;
  var currItem = app.project.activeItem
  
  if (currItem instanceof CompItem){
    var currLayers = currItem.selectedLayers
    if (currLayers.length == 1){
      var currLayer = currLayers[0]
      return {item: currItem, layer: currLayer, valid: true }
    } else {
      return {valid: false }
    }
  } else {
    return { valid: false }
  }
}

function textValue(layer){
  if (layer == null){
    return ""
  } else {
    if (layer.matchName == "ADBE Text Layer"){
      return layer.sourceText.value
    } else {
      return ""
    }
  }
}
function setTextValue(layer, text, hexColour){
  if ((layer != null) && layer.matchName == "ADBE Text Layer"){
    var textDoc = layer.sourceText.value
    textDoc.text = text
    textDoc.fillColor = hexToRGBArray(hexColour).colour;
    layer.sourceText.setValue(textDoc);
  }
}
