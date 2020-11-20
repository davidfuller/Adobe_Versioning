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
   * @typedef {object} dropdownDetail 
   * @property {DropDownList} dropdown
   * @property {StaticText} name
   * @property {Group} group
   * /
/**
 * 
 * @param {Group} parentGrp 
 * @param {string} labelText 
 * @param {string} dropdownDefaultText 
 * @param {boolean} hasName
 * @returns {dropdownDetail}
 */

function addDropDown(parentGrp, labelText, dropdownDefaultText, hasName){
  var grp = parentGrp.add("group");
  grp.orientation = "row";
  grp.alignment = "left"
  
  var label = grp.add("statictext", undefined, labelText)
  label.size = [60,12];

  var dropdown = grp.add("dropdownlist", undefined, []);
  dropdown.add("item", dropdownDefaultText);
  dropdown.selection = 0;
  dropdown.size = [280, 22];

  if (hasName){
    var nameStaticText = grp.add("statictext",undefined,"")
    nameStaticText.size = [280,12];
  }
  
  return {dropdown: dropdown, name: nameStaticText, group: grp}
}