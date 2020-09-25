function createFolderIfNeeded(theFolder){
  if (theFolder instanceof Folder){
    if (!theFolder.exists){
      return theFolder.create()
    } else {
      return true
    }
  }
}