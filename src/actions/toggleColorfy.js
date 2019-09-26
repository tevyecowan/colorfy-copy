// toggle colorfy__enabled class on <body>
document.querySelector('body').classList.toggle('colorfy__enabled');
chrome.storage.sync.get(["darkMode"], function(edit) {
  var darkMode = edit.darkMode;
  var url = window.location.href;
  var zendesk = url.includes("zendesk");
  if (darkMode === true && zendesk === false) {
    var main = document.querySelector('.ui-app-frame__main');
    main.classList.toggle('theme-editor--dark');
  }
});
