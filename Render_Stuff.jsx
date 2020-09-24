function saveFrame(theComp, frameNumber){
  if (theComp instanceof CompItem){
    var renderItem = app.project.renderQueue.items.add(theComp);
    var outputModule = renderItem.outputModule(1);
    var outputFolder = "/Users/David/Dropbox/Development/Adobe/Stills/";

    outputModule.applyTemplate("PNG");
    outputModule.file = File(outputFolder + theComp.name + "_[#]");
    renderItem.timeSpanStart = frameNumber/25;
    renderItem.timeSpanDuration = 1/25; 
    app.project.renderQueue.render()

    var renderedFile = new File(outputFolder + theComp.name + "_" + frameNumber +".png");
    $.writeln(renderedFile.rename(theComp.name + ".png"))
  }
}
function renderMovie(theComp){
  if (theComp instanceof CompItem){
    var renderItem = app.project.renderQueue.items.add(theComp);
    var outputModule = renderItem.outputModule(1);
    var outputFolder = "/Users/David/Dropbox/Development/Adobe/Movies/";

    outputModule.applyTemplate("PRORES 422");
    outputModule.file = File(outputFolder + theComp.name);
    app.project.renderQueue.render();
  } 
}