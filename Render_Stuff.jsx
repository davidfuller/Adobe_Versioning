function saveFrame(theComp, frameNumber, renderTemplate){
  if (theComp instanceof CompItem){
    var renderItem = app.project.renderQueue.items.add(theComp);
    var outputModule = renderItem.outputModule(1);
    var outputFolder = "/Users/David/Dropbox/Development/Adobe/Stills/";

    outputModule.applyTemplate(renderTemplate);
    var omSettings = outputModule.getSettings(GetSettingsFormat.STRING)
    var omFileInfo = omSettings["Output File Info"]
    
    outputModule.file = File(outputFolder + theComp.name + "_[#]");
    renderItem.timeSpanStart = frameNumber/theComp.frameRate;
    renderItem.timeSpanDuration = 1/theComp.frameRate; 
    app.project.renderQueue.render()

    var ext = getExtension(omFileInfo["Full Flat Path"]);
    if (ext != null){
      var renderedFile = new File(outputFolder + theComp.name + "_" + frameNumber + ext);
      if (renderedFile.exists){
        var renamedFile = new File(outputFolder + theComp.name + ext);
        if (renamedFile.exists){
          renamedFile.remove()
        }
      }
      renderedFile.rename(theComp.name + ext)
    }
  }
}
/**
 * 
 * @param {CompItem} theComp 
 * @param {string} renderTemplate 
 */
function renderMovie(theComp, renderTemplate){
  if (theComp instanceof CompItem){
    var renderItem = app.project.renderQueue.items.add(theComp);
    var outputModule = renderItem.outputModule(1);
    var outputFolder = getOutputFolderName()
    
    outputModule.applyTemplate(renderTemplate);
    var omSettings = outputModule.getSettings(GetSettingsFormat.STRING)
    var omFileInfo = omSettings["Output File Info"]
    var ext = getExtension(omFileInfo["Full Flat Path"]);

    var fileName = theComp.name
    if (ext != null){
      fileName = fileName + ext
    }
    archiveFile(outputFolder, archiveSubFolder, fileName)
    outputModule.file = File(outputFolder + theComp.name);
    app.project.renderQueue.render();
  } 
}
/**
 * 
 * @param {string} filename 
 * @returns {string}
 */
function getExtension(filename){

  var finalDotPosition = filename.lastIndexOf(".");
  if (finalDotPosition > -1){
    return filename.substring(finalDotPosition)
  } else {
    return null
  }

}
