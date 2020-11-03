/*
var text = "<bookstore><book>" +
"<title>Everyday Italian</title>" +
"<author>Giada De Laurentiis</author>" +
"<year>2005</year>" +
"</book><book>" +
"<title>Everyday Italian 2</title>" +
"<author>Giada De Laurentiis 2</author>" +
"<year>2005</year>" +
"</book></bookstore>";


var xmlDoc = new XML(text)
//@ts-ignore
$.writeln(xmlDoc.book.toString())
app.beginUndoGroup("MuVi2 Javascript")

alert("Hello Matt");

var projectItems = compItems()
var layers
var selected_comp = 9


/*
var stuff = selectedItemAndLayer()
if (stuff.valid){
  $.writeln(stuff.item.name)
  $.writeln(stuff.layer.name)
  $.writeln(textValue(stuff.layer))
  
} else {
  $.writeln("Not selected")
}


for(var i=0; i< projectItems.length; i++){
  $.write(i +": ")
  $.write(projectItems[i].name)
  $.write(": " + projectItems[i].typeName)
  $.writeln(" ID: " + projectItems[i].id)
}


layers = getLayers(selected_comp)

for(var i=1; i<= layers.length; i++){
  $.write(i +": ")
  $.write(layers[i].name)
  $.writeln(" ID: " + layers[i].index)
  if (layers[i].source != null){
    $.writeln(layers[i].source.typeName)
  }
}

//layers[2].text = "Hello Matt. Fancy a game"
$.writeln(layers[2].sourceText.value)
layers[2].sourceText.setValue("Hello Matt\rThis has two lines")

var myWindow = new Window("palette","Hello World")
var message = myWindow.add("statictext")
message.text = projectItems[3].name
myWindow.show()

unction showCompWindow(){
  
  var projectItems = compItems();
  var compWindow = createCompSettingsWindow(projectItems);
  var myComp = null;

  var selectedTextlayers = []
  
  if (compWindow.window.show() == 1){
    if (compWindow.compDropdown instanceof DropDownList && compWindow.compDropdown.selection != null) {
      myComp = compFromDropDown(compWindow, projectItems)
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
        var footageObj = selectedFootageLayer(myComp, compWindow.clipDropdown)
        var backgroundLayer = selectedCompLayer(myComp, compWindow.backgroundDropDown)
        var logoLayer = selectedCompLayer(myComp, compWindow.logoDropDown)
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
              var impOpts = new ImportOptions(promoData(myXML,i).fullFile);
              if (impOpts.canImportAs(ImportAsType.FOOTAGE)){
                impOpts.importAs = ImportAsType.FOOTAGE;
                var newFootage = app.project.importFile(impOpts);
                newFootage.parentFolder = myTempFootageFolder;
              }
              if (footageObj.type == "COMP"){
                var footageComp = footageObj.layer.source
                var newFootageComp =footageComp.duplicate()
                newFootageComp.name = "Clip " + i
                newFootageComp.parentFolder = myTempFootageFolder

                var newCompFootageLayers = footageLayers(newComp)
                for (var j = 0; j < newCompFootageLayers.length; j++){
                  if (newCompFootageLayers[j].type == "COMP"){
                    if (newCompFootageLayers[j].layer.source.name == footageObj.layer.source.name){
                      newCompFootageLayers[j].layer.replaceSource(newFootageComp, false)
                    }
                  }
                }
                var newFootageLayers = footageLayers(newFootageComp)
                for (var j = 0; j < newFootageLayers.length; j++){
                  if (newFootageLayers[j].type == "FOOT"){
                    if (newFootage instanceof FootageItem){
                      newFootageLayers[j].layer.replaceSource(newFootage, false)
                    }
                  }
                }

              }
              var bgComp = backgroundLayer.source
              var logoComp = logoLayer.source

              var possComps = compItems("CHANNEL_PACKS")
              var bgCompName = promoData(myXML, i).backgroundName
              var logoCompName = promoData(myXML, i).logoName
              for (var j = 0; j < possComps.length; j++){
                if (possComps[j].name == bgCompName){
                  var newBgComp = possComps[j]
                }
                if (possComps[j].name == logoCompName){
                  var newLogoComp = possComps[j]
                }
              }

              var newLayers = compLayers(newComp)
              for (var j = 0; j < newLayers.length; j++){
                if (newLayers[j].source.name == bgComp.name){
                  newLayers[j].replaceSource(newBgComp, false)
                }
                if (newLayers[j].source.name == logoComp.name){
                  newLayers[j].replaceSource(newLogoComp, false)
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

*/