function columnNames(theXML){
  var columnArray = []
  var columnLevel = theXML.elements()[0].elements()[0].elements()

  for (var i=0; i < columnLevel.length(); i++){
    columnArray.push(columnLevel[i].name())
  }
  return columnArray
}

/**
 * 
 * @typedef {Object} PromoData
 * @property {string} title
 * @property {string} message
 * @property {string} navigation
 * @property {string} oneLineTitle
 * @property {string} oneLineMessage
 * @property {string} oneLineNavigation
 * @property {string} twoLineTitle
 * @property {string} twoLineMessage
 * @property {string} twoLineNavigation
 * @property {string} fullFile
 * @property {string} displayFile
 * @property {string} backgroundName
 * @property {string} logoName
 * @property {string} profile
 * @property {string} audioFile
 * @property {string} displayAudio
 * @property {string} endBoardTimecode
 */
/**
 * 
 * @param {Object} theXML 
 * @param {number} itemNo 
 * @returns {PromoData}
 */

function promoData(theXML, itemNo){
  var theData = myXML.elements()[0].elements()[itemNo]
  var tempItem = { title: theData.elements()[0],
                    message: theData.elements()[1],
                    navigation: theData.elements()[2],
                    oneLineTitle: theData.elements()[3],
                    oneLineMessage: theData.elements()[4],
                    oneLineNavigation: theData.elements()[5],
                    twoLineTitle: theData.elements()[6],
                    twoLineMessage: theData.elements()[7],
                    twoLineNavigation: theData.elements()[8],
                    fullFile: theData.elements()[9], 
                    displayFile: displayName(theData.elements()[9]),
                    backgroundName: theData.elements()[10],
                    logoName: theData.elements()[11],
                    profile: theData.elements()[12],
                    audioFile: theData.elements()[13],
                    displayAudio: displayName(theData.elements()[13]),
                    endBoardTimecode: theData.elements()[14]}
  return tempItem
}

function saveSettings(settingsObject, profileName){
  XML.ignoreProcessingInstructions = false
  var heading = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
  var testXML = new XML("<settings></settings>");

  for (var key in settingsObject){
    var temp = new XML("<temp>temp</temp>")
    testXML.insertChildBefore(null, temp);
    testXML.children()[testXML.children().length() - 1].setLocalName(key);
    testXML.children()[testXML.children().length() - 1] = settingsObject[key];
  }
  if (createFolderIfNeeded(Folder(settingsFolder))){
    var myXMLFile = new File(settingsFolder + profileName);
    if (myXMLFile.open("w")){
      if (myXMLFile.writeln(heading)){
        if (myXMLFile.write(testXML.toXMLString())){
          if(myXMLFile.close()){
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      } else {
        return false
      }
    }
  } else {
    return false
  } 
}

function loadSettings(profileName){
  var myXMLFile = new File(settingsFolder + profileName);
  if (myXMLFile.open("r")){
    var xmlSettingsString = myXMLFile.read(); 
    var mySettingsXML = new XML(xmlSettingsString);
    $.writeln(mySettingsXML.children())
    var temp = {};
    for (var i = 0; i < mySettingsXML.children().length(); i++){
        temp[mySettingsXML.children()[i].localName()] = mySettingsXML.children()[i].toString();
    }
    return temp;
  } else {
    return defaultSettings;
  }
}

function promoCount(theXML){
  return theXML.elements()[0].elements().length()
}
/**
 * 
 * @param {PromoData} pData 
 * @param {boolean} withProfile
 */
function promoCompName(pData, withProfile){
  var temp = "";
  if (withProfile){
    temp = fileNameWithoutExtension(new File(pData.profile)).toUpperCase() + "_";
  }
  temp = temp + pData.title.toUpperCase() + "_" + pData.message.toUpperCase() + "_" +  pData.navigation.toUpperCase();
  return replacesSpacesWithUnderscores(temp);
}
function replacesSpacesWithUnderscores(theText){
  return theText.replace(/\s/g, "_").replace(/__/g, "_").replace(/\./g,"");
}