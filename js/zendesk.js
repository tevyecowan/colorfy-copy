function _zendeskDarkMode() {
  chrome.storage.sync.get(["darkModeZD", "darkModeSlack"], function(edit) {
    var dmStateZD = edit.darkModeZD;
    var dmStateSlack = edit.darkModeSlack;
    var url = window.location.href;
    var zendesk = url.includes("zendesk");
    var slack = url.includes("slack");

    if (dmStateZD == true && zendesk == true) {
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
      '.pane.right.section {background-color: #fff}' +
      '.ticket_status_label {-webkit-filter: invert(100%);' +
      '-moz-filter: invert(100%);' +
      '-o-filter: invert(100%);' +
      '-ms-filter: invert(100%); }' +
      '.status span {-webkit-filter: invert(100%);' +
      '-moz-filter: invert(100%);' +
      '-o-filter: invert(100%);' +
      '-ms-filter: invert(100%); }',

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

    else if (dmStateSlack == true && slack == true) {

       $.ajax({
         url: 'https://raw.githubusercontent.com/laCour/slack-night-mode/master/css/raw/black.css',
         success: function(css) {
           css += '.inline_message_input_container {background-color: #545454!important};';
           css += '.menu ul li a:not(.inline_menu_link) {color: #e6e6e6!important};';
           css += '.comment_input:not(.is-public) textarea:focus {border-color: blue!important; border-width: 3px;}';
           $("<style></style>").appendTo('head').html(css);
         }
       });

    }

  });
}

$(document).ready(function() {
  _zendeskDarkMode();
});
