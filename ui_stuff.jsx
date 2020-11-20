/**
 * @typedef {Object} ProfileWindow
 * @property {Window} window
 * @property {DropDownList} compDropdown
 * @property {DropDownList} endBoardDropdown
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
  var numTextDropDowns = 3;
  var numRenderTemplates = 2;
  var myWindow = new Window("dialog","Comp and Field Settings")
  myWindow.orientation = "column";
  var selectCompIndex = null;
   
  var rowOne = myWindow.add("group")
  rowOne.add("statictext", undefined, "Main Composition")
  rowOne.alignment = "left"
  
  var rowTwo = myWindow.add("group")
  rowTwo.alignment = "left"
  var compDropdown = rowTwo.add("dropdownlist", undefined,[])
  for (var i = 0; i < theComps.length; i++){
    compDropdown.add("item", theComps[i].name)
  }
  var setActive = rowTwo.add("button", undefined, "Select Active Comp")

  var rowThree = myWindow.add("group")
  rowThree.alignment = "left"
  rowThree.orientation = "column"

  /**
   * @type {StaticText}
   */
  var audioName 
  var myAudioDropDown = addDropDown(rowThree, "Audio", "Footage layers will appear here", audioName);

  var posterGrp = rowThree.add("group");
  posterGrp.alignment = "left";
  posterGrp.orientation = "row";
  var posterLabel = posterGrp.add("statictext", undefined, "Poster Frame (seconds)");
  posterLabel.alignment = "left"
  var posterFrame = posterGrp.add("edittext", undefined, "5.0")
  posterFrame.size = [50, 16];
  
  var endBoardLabel = rowThree.add("statictext", undefined, "End Board")
  endBoardLabel.alignment = "left"

  /**
   * @type {StaticText}
   */
  var endBoardName
  var endBoardCompDropdown = addDropDown(rowThree, "Comp", "Comp layers will appear here", endBoardName)
    
  var textLabel = rowThree.add("statictext", undefined, "Text Layers")
  textLabel.alignment = "left"
  
  var myTextDropDown = []
  var myTextColour = []
  var validColour = []
  var textFromLayer = []
  var grp = []
  var myLabel = []
  var myRenderDropDown = [];
  var myRenderLabel = [];
  var myClipDropDown;
  var myBackgroundDropDown;
  /**
   * @type {DropDownList}
   */
  var myLogoDropDown;

  var loopValue = numTextDropDowns;
  if (numRenderTemplates > numTextDropDowns){
    loopValue = numRenderTemplates;
  }

  for (var i = 0; i < loopValue; i++){
    grp[i] = rowThree.add("group")
    grp[i].orientation = "row"
    grp[i].alignment = "left"

    if (i < numTextDropDowns){
      myLabel[i] = grp[i].add("statictext", undefined, textLayerNames[i]);
      myLabel[i].size = [60,12];
  
      myTextDropDown[i] = grp[i].add("dropdownlist",undefined,[])
      myTextDropDown[i].add("item", "Text Layers will appear here")
      myTextDropDown[i].selection = 0
      myTextDropDown[i].size = [280,-1]

      myTextColour[i] = grp[i].add("edittext", undefined, "Hex Colour");
      myTextColour[i].size = [100, 16]
            
      validColour[i] = grp[i].add("statictext", undefined, "N");
      validColour[i].size = [10, 16]

      textFromLayer[i] = grp[i].add("statictext",undefined,"")
      textFromLayer[i].size = [280, 10]
    }
    if (i < numRenderTemplates){
      myRenderLabel[i] = grp[i].add("statictext", undefined, renderNames[i]);
      myRenderLabel[i].size = [60,10];

      myRenderDropDown[i] = grp[i].add("dropdownlist", undefined, []);
      myRenderDropDown[i].add("item", "Render templates will appear here");
      myRenderDropDown[i].selection = 0
      myRenderDropDown[i].size = [280, -1]
    }
  }
  var mediaLabel = rowThree.add("statictext", undefined, "Media Layers")
  mediaLabel.alignment = "left"
  var clipGroupNum = loopValue + 1
  grp[clipGroupNum] = rowThree.add("group")
  grp[clipGroupNum].orientation = "row"
  grp[clipGroupNum].alignment = "left"
  myLabel[clipGroupNum] = grp[clipGroupNum].add("statictext", undefined, "Clip");
  myLabel[clipGroupNum].size = [60,12];
  myClipDropDown = grp[clipGroupNum].add("dropdownlist",undefined,[])
  myClipDropDown.add("item", "Footage and Comp Layers will appear here")
  myClipDropDown.selection = 0
  myClipDropDown.size = [280,-1]
  var clipName = grp[clipGroupNum].add("statictext",undefined,"")
  clipName.size = [280,12]

  var backgroundGroupNum = clipGroupNum + 1;
  grp[backgroundGroupNum] = rowThree.add("group")
  grp[backgroundGroupNum].orientation = "row"
  grp[backgroundGroupNum].alignment = "left"
  myLabel[backgroundGroupNum] = grp[backgroundGroupNum].add("statictext", undefined, "Background");
  myLabel[backgroundGroupNum].size = [60,12];
  myBackgroundDropDown = grp[backgroundGroupNum].add("dropdownlist",undefined,[])
  myBackgroundDropDown.add("item", "Comp Layers will appear here")
  myBackgroundDropDown.selection = 0
  myBackgroundDropDown.size = [280,-1]
  var backgroundName = grp[backgroundGroupNum].add("statictext",undefined,"")
  backgroundName.size = [280,12]

  var logoGroupNum = backgroundGroupNum + 1;
  grp[logoGroupNum] = rowThree.add("group")
  grp[logoGroupNum].orientation = "row"
  grp[logoGroupNum].alignment = "left"
  myLabel[logoGroupNum] = grp[logoGroupNum].add("statictext", undefined, "Logo");
  myLabel[logoGroupNum].size = [60,12];
  myLogoDropDown = grp[logoGroupNum].add("dropdownlist",undefined,[])
  myLogoDropDown.add("item", "Comp Layers will appear here")
  myLogoDropDown.selection = 0
  myLogoDropDown.size = [280,-1]
  var logoName = grp[logoGroupNum].add("statictext",undefined,"")
  logoName.size = [280,12]

  setActive.onClick = function(){
    if (app.project.activeItem != null){
      compDropdown.selection = compDropdown.find(app.project.activeItem.name)
    }
  }
  
  compDropdown.onChange = function(){
    selectCompIndex = selectedComp(compDropdown)
    var myTextLayers = textLayers(theComps[selectCompIndex])
    var myFootageAndCompLayers = footageAndCompLayers(theComps[selectCompIndex])
    var myFootageLayers = footageLayers(theComps[selectCompIndex])
    var myCompLayers = compLayers(theComps[selectCompIndex])
    $.writeln("Change: " + compDropdown.selection.toString())
    
    for (var i = 0; i < numTextDropDowns; i++){
      myTextDropDown[i].removeAll();
      for (var j = 0; j < myTextLayers.length; j++){
        myTextDropDown[i].add("item", myTextLayers[j].name)
      }
    }
    var renderTemplates = availableRenderTemplates(theComps[selectedComp(compDropdown)]);
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
    myBackgroundDropDown.removeAll();
    for (var j = 0; j < myCompLayers.length; j++){
      myBackgroundDropDown.add("item", myCompLayers[j].name);
    }
    myLogoDropDown.removeAll();
    for (var j = 0; j < myCompLayers.length; j++){
      myLogoDropDown.add("item", myCompLayers[j].name);
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
  
  myTextDropDown[0].onChange = function(){
    textDropDownChange(0)
  }
  
  myTextDropDown[1].onChange = function(){
    textDropDownChange(1)
  }
  myTextDropDown[2].onChange = function(){
    textDropDownChange(2)
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

  myClipDropDown.onChange = function(){
    if (myClipDropDown.selection != null){
      clipName.text = footageDisplayFilename(selectedFootageAndCompLayer(theComps[selectCompIndex], myClipDropDown)); 
    }
  }

  myBackgroundDropDown.onChange = function(){
    if (myBackgroundDropDown.selection != null){
      backgroundName.text = selectedCompLayer(theComps[selectCompIndex], myBackgroundDropDown).source.name; 
    }
  }
  myLogoDropDown.onChange = function(){
    if (myLogoDropDown.selection != null){
      logoName.text = selectedCompLayer(theComps[selectCompIndex], myLogoDropDown).source.name; 
    }
  }
  myAudioDropDown.onChange = function(){
    if (myAudioDropDown.selection != null){
      audioName.text = displayName(selectedFootageLayer(theComps[selectCompIndex], myAudioDropDown).source.mainSource.file)
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
  
  function textDropDownChange(index){
    var myTextLayers = textLayers(theComps[selectedComp(compDropdown)])
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
  var rowFive = myWindow.add("group")

  var saveProfileButton = rowFive.add("button", undefined, "Save Profile")
  var loadProfileButton = rowFive.add("button", undefined, "Load Profile")
  rowFive.add("button", undefined, "OK")
  rowFive.alignment = "right"

  saveProfileButton.onClick = function(){
    var mySelection = Number(compDropdown.selection.valueOf())
    var compName = theComps[mySelection].name
    var allTextLayers = textLayers(theComps[mySelection]);
    var profile = {
      composition: compName
    }
    profile.textLayers = [];
    profile.hexColours = [];
    profile.renderTemplates = [];
    for(var i = 0; i < numTextDropDowns; i++){
      var textLayer = allTextLayers[Number(myTextDropDown[i].selection.valueOf())].name;
      var textObj = {};
      textObj[textLayerNames[i]] = textLayer;
      profile.textLayers.push(textObj);
      var hexColour = myTextColour[i].text
      var hexObj = {};
      hexObj[textLayerNames[i]] = hexColour;
      profile.hexColours.push(hexObj);
    }
    
    for (var i = 0; i < numRenderTemplates; i++){
      var render = myRenderDropDown[i].selection.toString()
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

  loadProfileButton.onClick = function(){
    var profileFileName = getProfileLoadName()
    var profile
    if (profileFileName != null){
      profile = loadProfileJson(profileFileName.name);
    } else {
      profile = loadProfileJson(compProfileFileName);
    }
    
    compDropdown.selection = compDropdown.find(profile.composition);
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

  return {window: myWindow, compDropdown: compDropdown, textLayers: myTextDropDown, renderDropdowns: myRenderDropDown, hexColours: myTextColour, clipDropdown: myClipDropDown, backgroundDropDown: myBackgroundDropDown, logoDropDown: myLogoDropDown,
            endBoardDropdown: endBoardCompDropdown}
}

function selectedComp(theDropdown){
  if (theDropdown instanceof DropDownList && theDropdown.selection != null){
    return Number(theDropdown.selection.valueOf())
  } else {
    return 0
  }
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
                              {numberOfColumns: 5, showHeaders: true, 
                               columnTitles: ["Title", "Message", "Navigation", "Promo File", "Comp Name"],
                               multiselect: true});
  var pData = null;
  for (var i = 0; i < promoCount(myXML); i++){
    pData = promoData(myXML, i)
    var tempItem = promoList.add("item", pData.title)
    tempItem.subItems[0].text = pData.message
    tempItem.subItems[1].text = pData.navigation
    tempItem.subItems[2].text = pData.displayFile
    tempItem.subItems[3].text = promoCompName(pData, false);
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
