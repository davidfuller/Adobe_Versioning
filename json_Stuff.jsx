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
  /**
   * @typedef {object} profile 
   * @property {string} composition
   * @property {Array} textLayers
   * @property {Array} hexColours
   * @property {Array} renderTemplates
   * @property {string} clipLayer
   * @property {string} backgroundLayer
   * @property {string} logoLayer
   * @property {string} posterFrame
   * @property {string} audioFile
   * /
  
   /**
   * @param {string} profileName 
   * @returns {profile}
   */
  function loadProfileJson(profileName){
    var myJsonFile = new File(settingsFolder + profileName);
    if (myJsonFile.open("r")){
      var settingsStringJson = myJsonFile.read(); 
      /**
       * @type {profile}
       */
      var myJSON;
      myJSON = JSON.parse(settingsStringJson)
      return myJSON
    }
  }
  /**
   * @param {string} profileName 
   */
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