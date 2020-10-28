//@include "comp_stuff.jsx"
//@include "ui_stuff.jsx"
//@include "xmlStuff.jsx"
//@include "Render_Stuff.jsx"
//@include "globals.jsx"
//@include "json_Stuff.jsx"
//@include "File_Stuff.jsx"

var theSettings = loadSettingsJson(settingsFilenameJson);
var file = new File;
var defaultXMLFolder = getXMLFolder()
var myXML
var doIt
var hexColour = [];

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


  var projectItems = compItems();
  var compWindow = createCompSettingsWindow(projectItems);
  var myComp = null;

  var selectedTextlayers = []
  
  if (compWindow.window.show() == 1){
    if (compWindow.compDropdown instanceof DropDownList && compWindow.compDropdown.selection != null) {
      myComp = compFromDropDown(compWindow)
      if (myComp != null){
        var allTextLayers = textLayers(myComp);
        for (var i = 0; i < compWindow.textLayers.length; i++){
          if (compWindow.textLayers[i] instanceof DropDownList && compWindow.textLayers[i].selection != null) {
            selectedTextlayers.push(allTextLayers[Number(compWindow.textLayers[i].selection.valueOf())])
            $.write("Text Layer: ")
            $.writeln(Number(compWindow.textLayers[i].selection.valueOf()))
          }
          if (compWindow.hexColours[i] instanceof EditText){
            $.writeln(compWindow.hexColours[i].text)
            hexColour[i] = compWindow.hexColours[i].text;
          }
        }
        var renderProfile ={}
        if (compWindow.renderDropdowns[0] instanceof DropDownList && compWindow.renderDropdowns[0].selection != null){
          renderProfile.still = compWindow.renderDropdowns[0].selection 
        }
        if (compWindow.renderDropdowns[1] instanceof DropDownList && compWindow.renderDropdowns[1].selection != null){
          renderProfile.movie = compWindow.renderDropdowns[1].selection 
        }
      }
    } else {
      $.writeln("Nothing selected")
    }
  } else {
    $.writeln("Cancel")
  }

  $.writeln("============ Text Layers =============")
  for (var i = 0; i < selectedTextlayers.length; i++){
    $.writeln(selectedTextlayers[i].name);
  }

  if (myComp != null){
    var myFolder = findOrCreateFolder("MuVi2 Temp");
    if ((myFolder != null) && (myFolder instanceof FolderItem)){
      var myTempFootageFolder = findOrCreateFolder("Temp Footage")
      if ((myTempFootageFolder != null) && (myTempFootageFolder instanceof FolderItem)){
        myTempFootageFolder.parentFolder = myFolder
        if (myComp instanceof CompItem){
          var baseName = myComp.name
          for (var i= 0; i < promoCount(myXML); i++){
            if (selectedPromos[i]){
              var newComp = myComp.duplicate();
              newComp.parentFolder = myFolder;  
              newComp.name = replacesSpacesWithUnderscores(baseName + "_" + promoCompName(promoData(myXML,i)));
              var newTextLayers = textLayers(newComp)
              for (var layer = 0; layer < newTextLayers.length; layer++){
                for (var promoField = 0; promoField < selectedTextlayers.length; promoField++){
                  if (newTextLayers[layer].name == selectedTextlayers[promoField].name){
                    $.write(layer + ": ");
                    $.writeln(newTextLayers[layer].name);
                    $.writeln(textValue(newTextLayers[layer]))
                    if (promoField == 0){
                      setTextValue(newTextLayers[layer], promoData(myXML, i).title, hexColour[0]) //"FF0D3C")
                    } else if (promoField == 1) {
                      setTextValue(newTextLayers[layer], promoData(myXML, i).message, hexColour[1])
                    } else if (promoField == 2){
                      setTextValue(newTextLayers[layer], promoData(myXML, i).navigation, hexColour[2])
                    }
                  }
                }
              }
              newComp.openInViewer()
              newComp.time = 5;
              saveFrame(newComp, 125, renderProfile.still);
              renderMovie(newComp, renderProfile.movie);
            }
          }
        }
      }
    }
  }
}

app.endUndoGroup()

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
