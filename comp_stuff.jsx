/**
 * @param {string} [folderName]
 * @returns {Array<CompItem>}
 */
function compItems(folderName){
  var comps = []
  var myItems = app.project.items
  for (var i = 1; i <= myItems.length; i++){
    var test = myItems[i];
    if (test instanceof CompItem){
      if (!folderName){
        comps.push(test)
      } else {
        if (compItemWithinFolder(test, folderName)){
          comps.push(test)
        }
      }
    }
  }
  return comps
}

/**
 * 
 * @param {CompItem} comp 
 */
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
/**
 * 
 * @typedef {Object} FootageObject
 * @property {AVLayer} layer
 * @property {string} type
 */
/**
 * 
 * @param {CompItem} comp 
 * @returns {Array<FootageObject>}
 */
function footageAndCompLayers(comp){
  var footage = []
  if (comp instanceof CompItem){
    var myLayers = comp.layers
    for (var i = 1; i <= myLayers.length; i++){
      var testLayer = myLayers[i]
      if (testLayer instanceof AVLayer){
        if (testLayer.source instanceof FootageItem){
          if (testLayer.source.mainSource instanceof FileSource){
            var temp = {layer: testLayer, type: "FOOT"}
            footage.push(temp)
          }
        } else {
          if (testLayer.source instanceof CompItem){
            var temp = {layer: testLayer, type: "COMP"}
            footage.push(temp)
          }
        }
      }
    }
  }
  return footage
}
/**
 * 
 * @param {CompItem} comp 
 * @returns {Array<AVLayer>}
 */
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
        }
      }
    }
  }
  return footage
}

/**
 * 
 * @param {CompItem} comp 
 */
function compLayers(comp){
  var myComps = []
  if (comp instanceof CompItem){
    var myLayers = comp.layers
    for (var i = 1; i <= myLayers.length; i++){
      var testLayer = myLayers[i]
      if (testLayer instanceof AVLayer){
        if (testLayer.source instanceof CompItem){
          myComps.push(testLayer)
        }
      }
    }
  }
  return myComps
}

function footageDisplayFilename(myFootage){
  var theFile = footageFile(myFootage)
  if (theFile != null){
    return displayName(theFile)
  } else {
    return "Footage layer not found"
  }
}

function footageFile(myFootage){
  if (myFootage.type == "FOOT"){
    return myFootage.layer.source.mainSource.file;
  } else {
    var theLayers = footageAndCompLayers(myFootage.layer.source);
    if (theLayers.length > 0){
      var found = false;
      for (var i = 0; i < theLayers.length; i++){
        var testLayer = theLayers[i].layer;
        if ((testLayer instanceof AVLayer) && (testLayer.source instanceof FootageItem)){
          found = true;
          return testLayer.source.mainSource.file;
        }
      }
      if (!found){
        return null
      }
    } else {
      return null
    }
  }
}

/**
 * 
 * @param {FootageObject} footageObj 
 */
function footageDisplay(footageObj){
  if (footageObj.layer instanceof AVLayer){
    return footageObj.type +  ": " + footageObj.layer.source.name
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

/**
 * 
 * @param {string} folderName 
 * @returns {FolderItem}
 */
function findOrCreateFolder(folderName){
  var myFolder = null;
  for (var i = 1; i <= app.project.numItems; i++){
    var temp = app.project.item(i)
    if (temp.name == folderName){
      if (temp instanceof FolderItem){ 
        myFolder = temp;
        break;
      }
    }
  }
  if (myFolder == null){
    myFolder = app.project.items.addFolder(folderName)
  }
  return myFolder
}
/**
 * 
 * @param {*} compWindow 
 * @param {*} projectItems 
 */

function compFromDropDown(compWindow, projectItems){
  var mySelection = compWindow.compDropdown.selection.index
  
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

/**
 * 
 * @param {CompItem} comp 
 * @param {string} folderName 
 * @returns {boolean}
 */
function compItemWithinFolder(comp, folderName){

  var testFolder = comp.parentFolder
  while (testFolder != app.project.rootFolder){
    if (testFolder.name == folderName){
      return true
    }
    testFolder = testFolder.parentFolder
  }
  return false
}

/**
 * 
 * @param {string} compName 
 * @returns {CompItem}
 */
function compFromName(compName){
  var theComps = compItems()
  for (var i = 0; i < theComps.length; i++){
    if (theComps[i].name == compName){
      return theComps[i]
    }
  }
  return null;
}
/**
 * 
 * @param {DropDownList} drop 
 * @returns {CompItem}
 */
function compFromDropDown(drop){
  if (drop.selection != null){
    return compFromName(drop.selection.toString())
  } else {
    return null
  }
}

function processData(){
  
  var myFolder = findOrCreateFolder("MuVi2 Temp");
  var myTempFootageFolder = findOrCreateFolder("Temp Footage");
  myTempFootageFolder.parentFolder = myFolder
  for (var i= 0; i < promoCount(myXML); i++){
    if (selectedPromos[i]){
      var promo = promoData(myXML,i);
      var profile = loadProfileFromPromoData(promo);
      var myComp = compFromName(profile.composition);
      var baseName = myComp.name
      var newComp = myComp.duplicate();
      newComp.parentFolder = myFolder;  
      newComp.name = replacesSpacesWithUnderscores(promoCompName(promoData(myXML,i), true));
      var newTextLayers = textLayers(newComp)
      for (var textLayer = 0; textLayer < textLayerNames.length; textLayer++){
        var thisTextLayer = getTextLayer(textLayerNames[textLayer],profile)
        for (var layer = 0; layer < newTextLayers.length; layer++){
          if (newTextLayers[layer].name == thisTextLayer){
            setTextValue(newTextLayers[layer],promoData(myXML,i)[textLayerNames[textLayer].toLowerCase()], getHexColour(textLayerNames[textLayer], profile))
          }
        }
      }
      doThePromoClip(i, myTempFootageFolder, myComp, newComp, profile);
      var bgCompName = promoData(myXML, i).backgroundName;
      var logoCompName = promoData(myXML, i).logoName;
      doBackgroundAndLogo(myComp, newComp, profile, bgCompName, logoCompName);
      doTheAudioClip(i, myTempFootageFolder, myComp, newComp, profile);
      newComp.openInViewer()
      newComp.time = Number(profile.posterFrame);

      var renderProfile = getRenderProfile(profile)
      saveFrame(newComp, Number(profile.posterFrame) * newComp.frameRate, renderProfile.still);
      renderMovie(newComp, renderProfile.clip); 
    }
  }
}
/**
 * 
 * @param {number} promoNum 
 * @param {FolderItem} tempFolder 
 * @param {CompItem} originalComp
 * @param {CompItem} newComp
 * @param {profile} profile
 */
function doThePromoClip(promoNum, tempFolder, originalComp, newComp, profile){
  var myFile = new File(promoData(myXML, promoNum).fullFile)
  var impOpts = new ImportOptions(myFile);
  if (impOpts.canImportAs(ImportAsType.FOOTAGE)){
    impOpts.importAs = ImportAsType.FOOTAGE;
    var newFootage = app.project.importFile(impOpts);
    newFootage.parentFolder = tempFolder;
  }
  var footageObj = getFootageAndCompLayer(originalComp, profile);
  if (footageObj.type == "COMP"){
    var footageComp = footageObj.layer.source;
    var newFootageComp =footageComp.duplicate();
    newFootageComp.parentFolder = tempFolder;
    newFootageComp.name = fileNameWithoutExtension(impOpts.file)

    var newCompFootageLayers = footageAndCompLayers(newComp)
    for (var j = 0; j < newCompFootageLayers.length; j++){
      if (newCompFootageLayers[j].type == "COMP"){
        if (newCompFootageLayers[j].layer.source.name == footageObj.layer.source.name){
          newCompFootageLayers[j].layer.replaceSource(newFootageComp, false)
        }
      }
    }
    var newFootageLayers = footageAndCompLayers(newFootageComp)
    for (var j = 0; j < newFootageLayers.length; j++){
      if (newFootageLayers[j].type == "FOOT"){
        if (newFootage instanceof FootageItem){
          newFootageLayers[j].layer.replaceSource(newFootage, false)
        }
      }
    }
  }
}
/**
 * 
 * @param {CompItem} originalComp 
 * @param {CompItem} newComp 
 * @param {profile} profile 
 * @param {string} backgroundName 
 * @param {string} logoName 
 */
function doBackgroundAndLogo(originalComp, newComp, profile, backgroundName, logoName){
  var backgroundLayer = getCompLayer(originalComp, profile.backgroundLayer);
  var logoLayer = getCompLayer(originalComp, profile.logoLayer);
  
  var bgComp = backgroundLayer.source
  var logoComp = logoLayer.source

  var possComps = compItems("CHANNEL_PACKS")
  
  for (var j = 0; j < possComps.length; j++){
    if (possComps[j].name == backgroundName){
      var newBgComp = possComps[j]
    }
    if (possComps[j].name == logoName){
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
}
/**
 * 
 * @param {number} promoNum 
 * @param {FolderItem} tempFolder 
 * @param {CompItem} originalComp
 * @param {CompItem} newComp
 * @param {profile} profile
 */
function doTheAudioClip(promoNum, tempFolder, originalComp, newComp, profile){
  var myFile = new File(promoData(myXML, promoNum).audioFile);
  var impOpts = new ImportOptions(myFile);
  if (impOpts.canImportAs(ImportAsType.FOOTAGE)){
    impOpts.importAs = ImportAsType.FOOTAGE;
    var newFootage = app.project.importFile(impOpts);
    newFootage.parentFolder = tempFolder;

    var footageLayer = getFootageLayer(newComp, profile);
    if (newFootage instanceof FootageItem){
      footageLayer.replaceSource(newFootage, false);
    }
  }
  
}