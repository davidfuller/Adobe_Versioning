/**
 * @typedef {Object} ProfileWindow
 * @property {Window} window
 * @property {DropDownList} compDropdown
 * @property {Array<DropDownList>} textLayers
 * @property {Array<DropDownList>} renderDropdowns
 * @property {Array<EditText>} hexColours
 * @property {DropDownList} clipDropdown
 * @property {DropDownList} backgroundDropDown
 * @property {DropDownList} logoDropDown
 */

/**
 * 
 * @param {Array<CompItem>} theComps 
 * @returns {ProfileWindow}
 */
function createCompSettingsWindow(theComps){
  var numTextDropDowns = 6;
  var numRenderTemplates = 2;
  var myWindow = new Window("dialog","Comp and Field Settings")
  myWindow.orientation = "column";
  var rowOne = myWindow.add("group")
  rowOne.add("statictext", undefined, "Main Composition")
  rowOne.alignment = "left"
  
  var rowTwo = myWindow.add("group")
  rowTwo.alignment = "left"
  var mainPanel = rowTwo.add("panel", undefined, "Main Composition", {borderStyle: "etched"});
  mainPanel.alignment = "left"
  mainPanel.orientation = "column"

  var mainCompGroup = mainPanel.add("group");
  mainCompGroup.alignment = "left";
  mainCompGroup.orientation = "row"

  /**
   * @type {dropdownDetail}
   */
  var tempDrop = addDropDown(mainCompGroup, "Comp", "Selected comp will appear here", false, false, "", "");
  var compDropdown = tempDrop.dropdown
  compDropdown.removeAll()
  for (var i = 0; i < theComps.length; i++){
    compDropdown.add("item", theComps[i].name)
  }
  var setActive = tempDrop.group.add("button", undefined, "Select Active Comp")

  var mainMediaGroup = mainPanel.add("group");
  mainMediaGroup.alignment = "left";
  mainMediaGroup.orientation = "column";

  tempDrop = addDropDown(mainMediaGroup, "Promo Clip", "Footage and Comp Layers will appear here", true, false, "", "");
  var myClipDropDown = tempDrop.dropdown
  var clipName = tempDrop.name

  var tempDrop = addDropDown(mainMediaGroup, "Audio", "Footage layers will appear here", true, false, "", "");
  var myAudioDropDown = tempDrop.dropdown;
  var audioName = tempDrop.name;

  var rowThree = myWindow.add("group")
  rowThree.alignment = "left"
  rowThree.orientation = "column"

  var endBoardPanel = rowThree.add("panel", undefined, "End Board", {borderStyle: "Etched"});
  endBoardPanel.alignment = "left"

  var tempDrop = addDropDown(endBoardPanel, "Comp", "Comp layers will appear here", true, false, "", "");
  var endBoardCompDropdown = tempDrop.dropdown
  var endBoardName = tempDrop.name
    
  var textLabel = endBoardPanel.add("statictext", undefined, "Text Layers")
  textLabel.alignment = "left"
  
  var myTextDropDown = []
  var myTextColour = []
  var validColour = []
  var textFromLayer = []
  var myRenderDropDown = [];
  
  for (var i = 0; i < numTextDropDowns; i++){
    if (i < numTextDropDowns){
      tempDrop = addDropDown(endBoardPanel, textLayerNames[i], "Text layers will appear here", true, true, "Hex Colour", "N");
      myTextDropDown[i] = tempDrop.dropdown;
      
      myTextColour[i] = tempDrop.textColour;
      validColour[i] = tempDrop.validColour
      textFromLayer[i] = tempDrop.name
    }
  }
  var mediaLabel = endBoardPanel.add("statictext", undefined, "Media Layers")
  mediaLabel.alignment = "left"
  
  tempDrop = addDropDown(endBoardPanel, "Background", "Comp layers will appear here", true, false, "", "");
  var myBackgroundDropDown = tempDrop.dropdown
  var backgroundName = tempDrop.name
  
  tempDrop = addDropDown(endBoardPanel, "Logo", "Comp layers will appear here", true, false, "", "");
  var myLogoDropDown = tempDrop.dropdown
  var logoName = tempDrop.name

  var renderPanel = rowThree.add("panel", undefined, "Render", {borderStyle: "Etched"});
  renderPanel.alignment = "left"

  var posterGrp = renderPanel.add("group");
  posterGrp.alignment = "left";
  posterGrp.orientation = "row";
  var posterLabel = posterGrp.add("statictext", undefined, "Poster Frame (seconds)");
  posterLabel.alignment = "left"
  var posterFrame = posterGrp.add("edittext", undefined, "5.0")
  posterFrame.size = [50, 22];
  
  for (var i = 0; i < numRenderTemplates; i++){
    if (i < numRenderTemplates){
      tempDrop = addDropDown(renderPanel, renderNames[i], "Render templates will appear here", false, false, "", "");
      myRenderDropDown[i] = tempDrop.dropdown
    }
  }
  
  setActive.onClick = function(){
    if (app.project.activeItem != null){
      compDropdown.selection = compDropdown.find(app.project.activeItem.name)
    }
  }
  
  compDropdown.onChange = function(){
    globalMainComp = compFromDropDown(compDropdown)
    var myFootageAndCompLayers = footageAndCompLayers(globalMainComp)
    var myFootageLayers = footageLayers(globalMainComp)
    var myCompLayers = compLayers(globalMainComp)
    var renderTemplates = availableRenderTemplates(globalMainComp);
    for (var i = 0; i < numRenderTemplates; i++){
      myRenderDropDown[i].removeAll();
      for (var j = 0; j < renderTemplates.length; j++){
        myRenderDropDown[i].add("item", renderTemplates[j]);
      }
    }
    myClipDropDown.removeAll();
    for (var j = 0; j < myFootageAndCompLayers.length; j++){
      myClipDropDown.add("item", footageDisplay(myFootageAndCompLayers[j]));
    }
    myAudioDropDown.removeAll();
    for (var j = 0; j < myFootageLayers.length; j++){
      myAudioDropDown.add("item", myFootageLayers[j].name);
    }
    endBoardCompDropdown.removeAll();
    for (var j = 0; j < myCompLayers.length; j++){
      endBoardCompDropdown.add("item", myCompLayers[j].name);
    }
  }
  endBoardCompDropdown.onChange = function(){
    globalEndBoardComp = compFromDropDown(endBoardCompDropdown);
    if (globalEndBoardComp != null){
      endBoardName.text = globalEndBoardComp.name; 
      var myTextLayers = textLayers(globalEndBoardComp);
      var myCompLayers = compLayers(globalEndBoardComp);
      for (var i = 0; i < numTextDropDowns; i++){
        myTextDropDown[i].removeAll();
        for (var j = 0; j < myTextLayers.length; j++){
          myTextDropDown[i].add("item", myTextLayers[j].name)
        }
      }
      myBackgroundDropDown.removeAll();
      for (var j = 0; j < myCompLayers.length; j++){
        myBackgroundDropDown.add("item", myCompLayers[j].name);
      }
      myLogoDropDown.removeAll();
      for (var j = 0; j < myCompLayers.length; j++){
        myLogoDropDown.add("item", myCompLayers[j].name);
      }
    }
  }
  
  myTextDropDown[0].onChange = function(){
    textDropDownChange(0)
  }
  myTextDropDown[1].onChange = function(){
    textDropDownChange(1)
  }
  myTextDropDown[2].onChange = function(){
    textDropDownChange(2)
  }
  myTextDropDown[3].onChange = function(){
    textDropDownChange(3)
  }
  myTextDropDown[4].onChange = function(){
    textDropDownChange(4)
  }
  myTextDropDown[5].onChange = function(){
    textDropDownChange(5)
  }

  myTextColour[0].onChange = function(){
    changeColourStatus(0)
  }
  myTextColour[1].onChange = function(){
    changeColourStatus(1)
  }
  myTextColour[2].onChange = function(){
    changeColourStatus(2)
  }
  myTextColour[3].onChange = function(){
    changeColourStatus(3)
  }
  myTextColour[4].onChange = function(){
    changeColourStatus(4)
  }
  myTextColour[5].onChange = function(){
    changeColourStatus(5)
  }

  myClipDropDown.onChange = function(){
    if (myClipDropDown.selection != null){
      clipName.text = footageDisplayFilename(selectedFootageAndCompLayer(globalMainComp, myClipDropDown)); 
    }
  }

  myBackgroundDropDown.onChange = function(){
    if (myBackgroundDropDown.selection != null){
      if (globalEndBoardComp != null){
        backgroundName.text = selectedCompLayer(globalEndBoardComp, myBackgroundDropDown).source.name; 
      }
    }
  }
  myLogoDropDown.onChange = function(){
    if (myLogoDropDown.selection != null){
      if (globalEndBoardComp != null){
        logoName.text = selectedCompLayer(globalEndBoardComp, myLogoDropDown).source.name; 
      }
    }
  }
  myAudioDropDown.onChange = function(){
    if (myAudioDropDown.selection != null){
      audioName.text = displayName(selectedFootageLayer(globalMainComp, myAudioDropDown).source.mainSource.file)
    }
  }

  function changeColourStatus(index){
    var isValid = hexToRGBArray(myTextColour[index].text).valid;
    if (isValid){
      validColour[index].text = "Y";
    } else {
      validColour[index].text = "N";
    }
  }
  /**
   * 
   * @param {number} index 
   */
  function textDropDownChange(index){
    if (globalEndBoardComp != null){
      var myTextLayers = textLayers(globalEndBoardComp);
      $.writeln("Text Change No:" + index)
      if (myTextDropDown[index].selection != null){
        var selectedLayer = Number(myTextDropDown[index].selection.valueOf())
        var theTextLayer = myTextLayers[selectedLayer]
        if (theTextLayer instanceof TextLayer){
          textFromLayer[index].text = theTextLayer.sourceText.value.text
        } else {
          textFromLayer[index].text = ""
        }
      }
    }
  }
  var rowFive = myWindow.add("group")

  var saveProfileButton = rowFive.add("button", undefined, "Save Profile")
  var loadProfileButton = rowFive.add("button", undefined, "Load Profile")
  rowFive.add("button", undefined, "OK")
  rowFive.alignment = "right"

  saveProfileButton.onClick = function(){
    if (globalMainComp != null && globalEndBoardComp != null){
      var profile = {
        composition: globalMainComp.name
      }
      profile.endBoardComp = globalEndBoardComp.name;
      var allTextLayers = textLayers(globalEndBoardComp);
      profile.textLayers = [];
      profile.hexColours = [];
      profile.renderTemplates = [];
      for(var i = 0; i < numTextDropDowns; i++){
        var textLayer = allTextLayers[myTextDropDown[i].selection.index].name;
        var textObj = {};
        textObj[textLayerNames[i]] = textLayer;
        profile.textLayers.push(textObj);
        var hexColour = myTextColour[i].text
        var hexObj = {};
        hexObj[textLayerNames[i]] = hexColour;
        profile.hexColours.push(hexObj);
      }
      
      for (var i = 0; i < numRenderTemplates; i++){
        var render = myRenderDropDown[i].selection.text
        var renderObj = {}
        renderObj[renderNames[i]] = render
        profile.renderTemplates.push(renderObj)
      }

      profile.clipLayer = myClipDropDown.selection.toString();
      profile.backgroundLayer = myBackgroundDropDown.selection.toString();
      profile.logoLayer = myLogoDropDown.selection.toString();
      profile.posterFrame = posterFrame.text
      profile.audioFile = myAudioDropDown.selection.toString();

      var profileFileName = getProfileSaveFilename()
      if (profileFileName != null){
        saveSettingsJson(profile, profileFileName.name)
      } else {
        saveSettingsJson(profile, compProfileFileName)
      }
    }
  }
  loadProfileButton.onClick = function(){
    var profileFileName = getProfileLoadName()
    var profile
    if (profileFileName != null){
      profile = loadProfileJson(profileFileName.name);
    } else {
      profile = loadProfileJson(compProfileFileName);
    }
    
    compDropdown.selection = compDropdown.find(profile.composition);
    endBoardCompDropdown.selection = endBoardCompDropdown.find(profile.endBoardComp);
    for (var i = 0; i < numTextDropDowns; i++){
      myTextDropDown[i].selection = myTextDropDown[i].find(profile.textLayers[i][textLayerNames[i]])
      myTextColour[i].text = profile.hexColours[i][textLayerNames[i]]
      changeColourStatus(i)
    }
    for (var i = 0; i < numRenderTemplates; i++){
      myRenderDropDown[i].selection = myRenderDropDown[i].find(profile.renderTemplates[i][renderNames[i]]);
    }
    myClipDropDown.selection = myClipDropDown.find(profile.clipLayer)
    myBackgroundDropDown.selection = myBackgroundDropDown.find(profile.backgroundLayer)
    myLogoDropDown.selection = myLogoDropDown.find(profile.logoLayer)
    posterFrame.text =profile.posterFrame
    myAudioDropDown.selection = myAudioDropDown.find(profile.audioFile)
  }

  return {window: myWindow, compDropdown: compDropdown, textLayers: myTextDropDown, renderDropdowns: myRenderDropDown, hexColours: myTextColour, clipDropdown: myClipDropDown, backgroundDropDown: myBackgroundDropDown, logoDropDown: myLogoDropDown}
}

function getXMLFile(){
  var win = new Window("dialog","Open XML File", undefined);
  win.orientation = "column";

  var grp1 = win.add("group");
  grp1.orientation = "row";
  var fileNameTextBox = grp1.add("edittext", undefined, "Selected File");
  fileNameTextBox.size = [500, 20];
  var fileButton = grp1.add("button", undefined, "File...");

  var grp2 = win.add("group");
  grp2.orientation = "row";
  grp2.alignment = "left";

  var profileButton = grp2.add("button", undefined, "Profiles")


  var grp3 = win.add("group");
  grp3.orientation = "row";
  grp3.alignment = "right"
  var okButton = grp3.add("button", undefined, "OK");
  var cancelButton = grp3.add("button", undefined, "Cancel");

  fileButton.onClick = fileButtonClick ;

  profileButton.onClick = function(){
    showCompWindow()
  }
 
  return win

  function fileButtonClick(){
    file = defaultXMLFolder.openDlg("Open XML file","XML file: *.xml", false);
    if (file != null){
      fileNameTextBox.text = file.fsName
    }
  }
}

function displayPromos(){
  var win = new Window("dialog", "Promo Versions", undefined);
  win.orientation = "column";
  
  var myProject = myXML.attribute("Project").toString()
  var projectText = win.add("statictext",undefined, myProject);
  projectText.alignment = "left"

  var outerGrp = win.add("group");
  outerGrp.orientation = "row";

  var grp1 = outerGrp.add("group")
  var promoList = grp1.add("listbox", undefined, [], 
                              {numberOfColumns: 10, showHeaders: true, 
                               columnTitles: ["Title", "Message", "Navigation", "Promo File", "Background Comp", "Logo Comp", "Profile", "Audio File", "End Board Timecode", "Comp Name"],
                               multiselect: true});
  var pData = null;
  for (var i = 0; i < promoCount(myXML); i++){
    pData = promoData(myXML, i)
    var tempItem = promoList.add("item", pData.title)
    tempItem.subItems[0].text = pData.message
    tempItem.subItems[1].text = pData.navigation
    tempItem.subItems[2].text = pData.displayFile
    tempItem.subItems[3].text = pData.backgroundName
    tempItem.subItems[4].text = pData.logoName
    tempItem.subItems[5].text = pData.profile
    tempItem.subItems[6].text = pData.displayAudio
    tempItem.subItems[7].text = pData.endBoardTimecode
    tempItem.subItems[8].text = promoCompName(pData, false);
    tempItem.selected = true;
  }
  
  var grp2 = win.add("group");
  grp2.orientation = "row";
  grp2.alignment = "right"
  var okButton = grp2.add("button", undefined, "OK");
  var cancelButton = grp2.add("button", undefined, "Cancel");
  
  return {window: win, list: promoList}
}

function getProfileSaveFilename(){
  var mySettingsFolder = new File(settingsFolder + compProfileFileName)
  return mySettingsFolder.saveDlg("Choose profile filename","Json file: *.json");
}

function getProfileLoadName(){
  var mySettingsFolder = new Folder(settingsFolder)
  return mySettingsFolder.openDlg("Choose profile","Json file: *.json", false)
}
/**
 * 
 * @param {CompItem} theComp 
 * @param {DropDownList} theDrop 
 */
function selectedFootageAndCompLayer(theComp, theDrop){
  if (theDrop.selection instanceof ListItem){
    return footageAndCompLayers(theComp)[theDrop.selection.index]
  } else {
    return null;
  }
}
/**
 * 
 * @param {CompItem} theComp 
 * @param {DropDownList} theDrop 
 */
function selectedCompLayer(theComp, theDrop){
  if (theDrop.selection instanceof ListItem){
    return compLayers(theComp)[theDrop.selection.index]
  } else {
    return null;
  }
}
/**
 * 
 * @param {CompItem} theComp 
 * @param {DropDownList} theDrop 
 */
function selectedFootageLayer(theComp, theDrop){
  if (theDrop.selection instanceof ListItem){
    return footageLayers(theComp)[theDrop.selection.index]
  } else {
    return null;
  }
}
