var colorfySettings = {};

// gather button settings in popup
var settingToggleColorfy = document.querySelector('.toggleColorfy');
var settingOpenOptions = document.querySelector('.openOptions');

// get data from sendDOM.js to display settings correctly
chrome.tabs.query({
  active: true,
  currentWindow: true
}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {
    popup: "active"
  }, function(response) {
    // add disbled button style if settings are false
    if (!response.colorfyStyled) {
      settingToggleColorfy.classList.add('disabled');
    };
  });
});

// define each setting's actions:
colorfySettings.toggleColorfy = function() {
  // toggle showColorfy and button style
  colorfySettings.showColorfy = !colorfySettings.showColorfy;
  this.classList.toggle('disabled');
  // execute script on tab
  console.log("This ran first");
  chrome.tabs.executeScript({
    file: 'src/actions/toggleColorfy.js'
  })

  if (!colorfySettings.showColorfy) {
    chrome.runtime.sendMessage({
      track: ['send', 'event', 'Settings', 'Show Colorfy']
    });
  } else {
    chrome.runtime.sendMessage({
      track: ['send', 'event', 'Settings', 'Hide Colorfy']
    });
  }
}

colorfySettings.openOptions = function() {
  chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
}

// bind click event to each setting:
settingToggleColorfy.addEventListener('click', colorfySettings.toggleColorfy);
settingOpenOptions.addEventListener('click', colorfySettings.openOptions);
