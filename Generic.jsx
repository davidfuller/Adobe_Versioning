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
   * @property {EditText} textColour
   * @property {StaticText} validColour
   * /
/**
 * 
 * @param {Group} parentGrp 
 * @param {string} labelText 
 * @param {string} dropdownDefaultText 
 * @param {boolean} hasName
 * @param {boolean} hasColour
 * @param {string} defaultColourText
 * @param {string} defaultColourStatus
 * @returns {dropdownDetail}
 */

function addDropDown(parentGrp, labelText, dropdownDefaultText, hasName, hasColour, defaultColourText, defaultColourStatus){
  var grp = parentGrp.add("group");
  grp.orientation = "row";
  grp.alignment = "left"
  
  var label = grp.add("statictext", undefined, labelText)
  label.size = [75,12];

  var dropdown = grp.add("dropdownlist", undefined, []);
  dropdown.add("item", dropdownDefaultText);
  dropdown.selection = 0;
  dropdown.size = [280, 22];

  if (hasColour){
    var textColour = grp.add("edittext", undefined, defaultColourText);
    textColour.size = [100, 22]
            
    var validColour = grp.add("statictext", undefined, defaultColourStatus);
    validColour.size = [10, 22]
  }
  if (hasName){
    var nameStaticText = grp.add("statictext",undefined,"")
    nameStaticText.size = [280,22];
  }
  
  return {dropdown: dropdown, name: nameStaticText, group: grp, textColour: textColour, validColour: validColour}
}

/**
 * 
 * @param {string} timecodeString 
 * @param {number} frameRate 
 * @returns {number}
 */

function timecodeToSeconds(timecodeString, frameRate){
// Expects timecode as "10:00:00:00" return seconds and fraction of seconds
  var items = timecodeString.split(":");
  if (items.length == 4){
    var hours = parseInt(items[0]);
    var minutes = parseInt(items[1]);
    var seconds = parseInt(items[2]);
    var frames = parseInt(items[3]);
    var theTime 
    if (hours != NaN){
      theTime = hours * 3600;
    }
    if (minutes != NaN){
      theTime = theTime + (minutes * 60);
    }
    if (seconds != NaN){
      theTime = theTime + seconds;
    }
    if (frames != NaN){
      theTime = theTime + (frames/frameRate);
    }
    return theTime;
  } else {
    return null;
  }
}
/**
 * 
 * @param {string} outputFolder 
 * @param {string} archiveSubFolder 
 * @param {string} fileName 
 */
function archiveFile(outputFolder, archiveSubFolder, fileName){
  var tempFile = new File(outputFolder + fileName);
  if (tempFile.exists){
    var archiveFolder = new Folder(outputFolder + archiveSubFolder);
    if (!archiveFolder.exists){
      archiveFolder.create();
    }
    var archiveFile = new File(outputFolder + archiveSubFolder + fileName);
    var loop = 0;
    while (archiveFile.exists){
      loop = loop + 1;
      if (loop > 99){
        break;
      }
      archiveFile = new File(outputFolder + archiveSubFolder + fileNameWithoutExtension(tempFile) + "_" + ("0000" + loop).slice(-4) + getExtension(fileName))
    }
    if (tempFile.copy(archiveFile.fullName)){
      tempFile.remove()
    }
  }
}
