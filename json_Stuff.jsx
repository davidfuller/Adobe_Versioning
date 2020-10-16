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
  function loadSettingsJson(profileName){
    var myJsonFile = new File(settingsFolder + profileName);
    if (myJsonFile.open("r")){
      var settingsStringJson = myJsonFile.read(); 
      var myJSON = {}
      myJSON = JSON.parse(settingsStringJson)
      return myJSON
    } else {
      return defaultSettings;
    }
  }