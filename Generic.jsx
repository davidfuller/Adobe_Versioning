/**
 * 
 * @param {File} theFile 
 * @returns {string}
 */
function fileNameWithoutExtension(theFile){
  var theName = theFile.name;
  var finalDot = theName.lastIndexOf(".");
  if (finalDot > -1){
    return theName.substring(0, finalDot);
  }
  return theName;
}

/**
 * 
 * @param {Group} parentGrp 
 * @param {string} labelText 
 * @param {string} dropdownDefaultText 
 * @param {StaticText} nameStaticText
 * @returns {DropDownList}
 */

function addDropDown(parentGrp, labelText, dropdownDefaultText, nameStaticText){
  var grp = parentGrp.add("group");
  grp.orientation = "row";
  grp.alignment = "left"
  
  var label = grp.add("statictext", undefined, labelText)
  label.size = [60,12];

  var dropdown = grp.add("dropdownlist", undefined, []);
  dropdown.add("item", dropdownDefaultText);
  dropdown.selection = 0;
  dropdown.size = [280, 22];

  nameStaticText = grp.add("statictext",undefined,"")
  nameStaticText.size = [280,12]


  return dropdown
}