function createMyWindow(theComps){
  var numTextDropDowns = 3;
  var myWindow = new Window("dialog","Hello World")
  myWindow.orientation = "column";
   
  var rowOne = myWindow.add("group")
  rowOne.add("statictext", undefined, "Composition")
  rowOne.alignment = "left"
  
  var rowTwo = myWindow.add("group")
  rowTwo.alignment = "left"
  var myDropdown = rowTwo.add("dropdownlist", undefined,[])
  for (var i = 0; i < theComps.length; i++){
    myDropdown.add("item", theComps[i].name)
  }
  var setActive = rowTwo.add("button", undefined, "Select Active Comp")
  
  var rowThree = myWindow.add("group")
  rowThree.alignment = "left"
  rowThree.orientation = "column"
  rowThree.add("statictext", undefined, "Text Layers")
  
  var myTextDropDown = []
  var textFromLayer = []
  var grp = []
  var myLabel = []
  for (var i = 0; i < numTextDropDowns; i++){
    grp[i] = rowThree.add("group")
    grp[i].orientation = "row"
    myLabel[i] = grp[i].add("statictext", undefined, myFields[i]);
    myLabel[i].size = [60,10]

    myTextDropDown[i] = grp[i].add("dropdownlist",undefined,[])
    myTextDropDown[i].add("item", "Text Layers will appear here")
    myTextDropDown[i].selection = 0
    myTextDropDown[i].size = [280,-1]
    
    textFromLayer[i] = grp[i].add("statictext",undefined,"")
    textFromLayer[i].size = [280, 10]
  }
  
  setActive.onClick = function(){
    if (app.project.activeItem != null){
      myDropdown.selection = myDropdown.find(app.project.activeItem.name)
    }
  }
  
  myDropdown.onChange = function(){
    var myTextLayers = textLayers(theComps[selectedComp(myDropdown)])
    $.writeln("Change: " + myDropdown.selection.toString())
    
    for (var i = 0; i < numTextDropDowns; i++){
      myTextDropDown[i].removeAll()
      for (var j = 0; j < myTextLayers.length; j++){
        myTextDropDown[i].add("item", myTextLayers[j].name)
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
  
  function textDropDownChange(index){
    var myTextLayers = textLayers(theComps[selectedComp(myDropdown)])
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

  rowFive.add("button", undefined, "OK")
  rowFive.add("button", undefined, "Cancel")
  rowFive.alignment = "right"

  return {window: myWindow, dropdown: myDropdown, textLayers: myTextDropDown}
}

function selectedComp(theDropdown){
  if (theDropdown instanceof DropDownList){
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
  grp2.alignment = "right"
  var okButton = grp2.add("button", undefined, "OK");
  var cancelButton = grp2.add("button", undefined, "Cancel");

  fileButton.onClick = fileButtonClick ;
 
  return win

  function fileButtonClick(){
    file = defaultXMLFolder.openDlg("Open XML file","XML file: *.xml", false);
    fileNameTextBox.text = file.fsName
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
                              {numberOfColumns: 4, showHeaders: true, 
                               columnTitles: ["Title", "Message", "Navigation", "Comp Name"],
                               multiselect: true});
  var pData = null;
  for (var i = 0; i < promoCount(myXML); i++){
    pData = promoData(myXML, i)
    var tempItem = promoList.add("item", pData.title)
    tempItem.subItems[0].text = pData.message
    tempItem.subItems[1].text = pData.navigation
    tempItem.subItems[2].text = promoCompName(pData)
    tempItem.selected = true;
  }
  
  var grp2 = win.add("group");
  grp2.orientation = "row";
  grp2.alignment = "right"
  var okButton = grp2.add("button", undefined, "OK");
  var cancelButton = grp2.add("button", undefined, "Cancel");
  
  return {window: win, list: promoList}
}

