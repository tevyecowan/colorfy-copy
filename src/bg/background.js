function openOrFocusOptionsPage() {
  var optionsUrl = chrome.extension.getURL('options.html');
  chrome.tabs.query({}, function(extensionTabs) {
    var found = false;
    for (var i = 0; i < extensionTabs.length; i++) {
      if (optionsUrl == extensionTabs[i].url) {
        found = true;
        console.log("tab id: " + extensionTabs[i].id);
        chrome.tabs.update(extensionTabs[i].id, {
          "selected": true
        });
      }
    }
    if (found == false) {
      chrome.tabs.create({
        url: "options.html"
      });
    }
  });
}
chrome.extension.onConnect.addListener(function(port) {
  var tab = port.sender.tab;
  // This will get called by the content script we execute in
  // the tab as a result of the user pressing the browser action.
  port.onMessage.addListener(function(info) {
    var max_length = 1024;
    if (info.selection.length > max_length)
      info.selection = info.selection.substring(0, max_length);
    openOrFocusOptionsPage();
  });
});

// Called when the user clicks on the browser action icon.
chrome.browserAction.onClicked.addListener(function(tab) {
  openOrFocusOptionsPage();
});

// Setting up listener for chrome commands
chrome.commands.onCommand.addListener(function(command) {
  try {
    runFullscreen(command);
  } catch (error){
    console.log(`No action for ${command}`);
  }
});

// Runs command javascript on the current tab
function runFullscreen(name) {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.executeScript(tabs[0].id, {file: `/src/actions/${name}.js`})
  })
}
