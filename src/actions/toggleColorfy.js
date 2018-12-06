// toggle colorfy__enabled class on <body>
document.querySelector('body').classList.toggle('colorfy__enabled');
chrome.storage.sync.get(["darkMode"], function(edit) {
  var darkMode = edit.darkMode;
  if (darkMode === true) {
    var main = document.querySelector('.ui-app-frame__main');
    console.log(main);
    document.querySelector('.ui-app-frame__main').classList.toggle('theme-editor--dark');
  }
});
