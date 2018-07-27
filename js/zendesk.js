function _zendeskDarkMode() {
  chrome.storage.sync.get(["darkMode"], function(edit) {
    var dmState = edit.darkMode;

    if (dmState == true) {
      var css = 'html {-webkit-filter: invert(100%);' +
      '-moz-filter: invert(100%);' +
      '-o-filter: invert(100%);' +
      '-ms-filter: invert(100%); }' +
      'img {-webkit-filter: invert(100%);' +
      '-moz-filter: invert(100%);' +
      '-o-filter: invert(100%);' +
      '-ms-filter: invert(100%); }' +
      '#main_navigation {-webkit-filter: invert(100%);' +
      '-moz-filter: invert(100%);' +
      '-o-filter: invert(100%);' +
      '-ms-filter: invert(100%); }' +
      '#main_navigation img {-webkit-filter: invert(0%);' +
      '-moz-filter: invert(0%);' +
      '-o-filter: invert(0%);' +
      '-ms-filter: invert(0%); }' +
      '.pane.right.section {background-color: #fff}',

      head = document.getElementsByTagName('head')[0],
      style = document.createElement('style');

      style.type = 'text/css';
      if (style.styleSheet){
      style.styleSheet.cssText = css;
      } else {
      style.appendChild(document.createTextNode(css));
      }

      //injecting the css to the head
      head.appendChild(style);
    }

  });
}

$(document).ready(function() {
  _zendeskDarkMode();
});
