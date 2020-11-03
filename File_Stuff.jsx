/**
 * @param {Folder} theFolder 
 */
function createFolderIfNeeded(theFolder){
  if (theFolder instanceof Folder){
    if (!theFolder.exists){
      return theFolder.create()
    } else {
      return true
    }
  }
}
/** 
 *  @param {string} fullPath
 */
function displayName(fullPath){
  var temp = new File(fullPath)
  if (temp.exists){
    return temp.displayName
  } else {
    return "[NO PROMO FILE]"
  }
  
}