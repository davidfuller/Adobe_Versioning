(function(thisObj) {

  // Any code you write here will execute before the panel is built.
  
  buildUI(thisObj); // Calling the function to build the panel
  
  function buildUI(thisObj) {
  
  var windowName = "your script name"; 
  
    var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("window", windowName, undefined, {resizeable: true});
  
    myPanel.text = "Promo Versioning"; 
    myPanel.orientation = "row"; 
    myPanel.alignChildren = ["center","top"]; 
    myPanel.spacing = 10; 
    myPanel.margins = 16; 
      
    var btnVersion = myPanel.add("button", undefined, undefined, {name: "btnVersion"}); 
    btnVersion.text = "Versioning"; 
      
    var btnProfile = myPanel.add("button", undefined, undefined, {name: "btnProfile"}); 
    btnProfile.text = "Profiles"; 
    // Write any UI code here. Note: myPanel is your window panel object. If you add groups, buttons, or other UI objects make sure you use myPanel as their parent object, especially if you are using the only ScriptUI panel builder.
    
    myPanel.onResizing = myPanel.onResize = function() {
      this.layout.resize();
    }
    
    if (myPanel instanceof Window) {
        myPanel.center();
        myPanel.show();
    } else {
        myPanel.layout.layout(true);
        myPanel.layout.resize();
    }
    btnVersion.onClick = function(){
      $.evalFile(File("~/Dropbox/Development/Adobe/mainVersion.jsx"))
    }
    btnVersion.onClick = function(){
      $.evalFile(File("~/Dropbox/Development/Adobe/profileForm.jsx"))
    }
  }
  
  // Write your helper functions here
  
  })(this);