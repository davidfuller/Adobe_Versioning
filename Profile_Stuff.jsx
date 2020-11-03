function loadProfileFromPromoData(promoData){
  var fileName = promoData.profile
  return loadProfileJson(fileName)
}
/**
 * 
 * @param {string} layerName 
 * @param {profile} profile
 * @returns {string}
 */
function getTextLayer(layerName, profile){
  for (var i = 0; i <= profile.textLayers.length; i++){
    if (profile.textLayers[i][layerName]){
      return profile.textLayers[i][layerName];
    }
  }
  return "";
}
/**
 * 
 * @param {string} layerName 
 * @param {profile} profile
 * @returns {string}
 */
function getHexColour(layerName, profile){
  for (var i = 0; i <= profile.hexColours.length; i++){
    if (profile.hexColours[i][layerName]){
      return profile.hexColours[i][layerName];
    }
  }
  return "";
}
/**
 * 
 * @param {CompItem} theComp 
 * @param {profile} profile 
* @returns {FootageObject}
 */
function getFootageLayer(theComp, profile){
  var layers = footageLayers(theComp);
  for (i = 0; i < layers.length; i++){
    if (footageDisplay(layers[i]) == profile.clipLayer){
      return layers[i]
    }
  }
  return null;
}
/**
 * 
 * @param {CompItem} theComp 
 * @param {string} compName
 * @returns {AVLayer}
 */
function getCompLayer(theComp, compName){
  var layers = compLayers(theComp);
  for (i = 0; i < layers.length; i++){
    if (layers[i].name == compName){
      return layers[i];
    }
  }
    
  return null;
}
/**
 * 
 * @typedef {Object} RenderProfile
 * @property {string} still
 * @property {string} clip
 */

/**
 * 
 * @param {profile} profile
 * @returns {RenderProfile}
 */
function getRenderProfile(profile){

  var temp = {still: "", clip: ""}

  for (var j = 0; j < renderNames.length; j++){
    for (var i = 0; i < profile.renderTemplates.length; i++){
      if (profile.renderTemplates[i][renderNames[j]]){
          temp[renderNames[j].toLowerCase()] = profile.renderTemplates[i][renderNames[j]]
      }
    }
  }
  return temp;

}

