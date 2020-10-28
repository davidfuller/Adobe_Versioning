function compItems(){
  var comps = []
  var myItems = app.project.items
  for (var i = 1; i <= myItems.length; i++){
    if (myItems[i] instanceof CompItem){
      comps.push(myItems[i])
    }
  }
  return comps
}

function textLayers(comp){
  var text = []
  if (comp instanceof CompItem){
    var myLayers = comp.layers
    for (var i = 1; i <= myLayers.length; i++){
      if (myLayers[i] instanceof TextLayer){
        text.push(myLayers[i])
      }
    }
  }
  return text
}

function footageLayers(comp){
  var footage = []
  if (comp instanceof CompItem){
    var myLayers = comp.layers
    for (var i = 1; i <= myLayers.length; i++){
      var testLayer = myLayers[i]
      if (testLayer instanceof AVLayer){
        if (testLayer.source instanceof FootageItem){
          if (testLayer.source.mainSource instanceof FileSource){
            footage.push(testLayer)
          }
        } else {
          if (testLayer.source instanceof CompItem){
            footage.push(testLayer)
          }
        }
      }
    }
  }
  return footage
}

function footageDisplay(layer){
  if (layer instanceof AVLayer){
    if ((layer.source instanceof FootageItem) && (layer.source.mainSource instanceof FileSource)){
      return "FOOT: " + layer.source.name
    } else {
      if (layer.source instanceof CompItem){
        return "COMP: " + layer.source.name
      }
    }
  }
}


function availableRenderTemplates(comp){
  var templates = [];
  if (comp instanceof CompItem){
    var renderItem = app.project.renderQueue.items.add(comp);
    var outputModule = renderItem.outputModule(1);
    templates = outputModule.templates
    renderItem.remove();
  }
  return templates
}

function findOrCreateFolder(folderName){

  var myFolder = null;
  for (var i = 1; i <= app.project.numItems; i++){
    if ((app.project.item(i) instanceof FolderItem) && app.project.item(i).name == folderName){
      myFolder = app.project.item(i);
      break;
    }
  }
  if (myFolder == null){
    myFolder = app.project.items.addFolder(folderName)
  }

  return myFolder
}

function compFromDropDown(compWindow){
  var mySelection = Number(compWindow.compDropdown.selection.valueOf())
  return projectItems[mySelection]
}
function hexToRGBArray(hex){
  var rgb = parseInt(hex, 16); 
  var red;
  var green;
  var blue;
  var valid;

  if (isNaN(rgb)){
    red = 255.0;
    green = 255.0;
    blue = 255.0;
    valid = false;
  } else {
    red   = (rgb >>16) & 0xFF; 
    green = (rgb >>8) & 0xFF; 
    blue  = rgb & 0xFF;
    valid = true;
  }
   	
	var colorArray = [red/255.0, green/255.0, blue/255.0];
	
	return {colour: colorArray, valid: valid}
}
