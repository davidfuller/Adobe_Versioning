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

function findOrCreateFoler(folderName){

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
