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