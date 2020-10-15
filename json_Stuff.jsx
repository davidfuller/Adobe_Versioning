function saveSettingsJson(settingsObject, profileName){
  if (createFolderIfNeeded(Folder(settingsFolder))){
    var myJsonFile = new File(settingsFolder + profileName);
    if (myJsonFile.open("w")){
      var theJson = JSON.stringify(settingsObject, null, 2)
      if (myJsonFile.write(theJson)){
          if(myJsonFile.close()){
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
  }