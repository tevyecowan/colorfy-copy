function _zendeskDarkMode() {
  chrome.storage.sync.get(["darkModeZD", "darkModeSlack", "darkModeGithub", "darkModeGuru"], function(edit) {
    var dmStateZD = edit.darkModeZD;
    var dmStateSlack = edit.darkModeSlack;
    var dmStateGithub = edit.darkModeGithub;
    var dmStateGuru = edit.darkModeGuru;
    var url = window.location.href;
    var zendesk = url.includes(`zendesk`);
    var slack = url.includes(`slack`);
    var github = url.includes(`github`);
    var guru = url.includes(`getguru`);

    if (dmStateZD == true && zendesk == true) {
      document.querySelector('body').classList.add('colorfy__enabled');
      var css = 'body.colorfy__enabled {-webkit-filter: invert(100%);' +
      '-moz-filter: invert(100%);' +
      '-o-filter: invert(100%);' +
      '-ms-filter: invert(100%); }' +
      '.colorfy__enabled img {-webkit-filter: invert(100%);' +
      '-moz-filter: invert(100%);' +
      '-o-filter: invert(100%);' +
      '-ms-filter: invert(100%); }' +
      '.colorfy__enabled #main_navigation {-webkit-filter: invert(100%);' +
      '-moz-filter: invert(100%);' +
      '-o-filter: invert(100%);' +
      '-ms-filter: invert(100%); }' +
      '.colorfy__enabled #main_navigation img {-webkit-filter: invert(0%);' +
      '-moz-filter: invert(0%);' +
      '-o-filter: invert(0%);' +
      '-ms-filter: invert(0%); }' +
      '.colorfy__enabled .pane.right.section {background-color: #fff}' +
      '.colorfy__enabled .ticket_status_label {-webkit-filter: invert(100%);' +
      '-moz-filter: invert(100%);' +
      '-o-filter: invert(100%);' +
      '-ms-filter: invert(100%); }' +
      '.colorfy__enabled .status span {-webkit-filter: invert(100%);' +
      '-moz-filter: invert(100%);' +
      '-o-filter: invert(100%);' +
      '-ms-filter: invert(100%); }' +
      '.colorfy__enabled .comment_input:not(.is-public) textarea:focus {border-color: blue!important; border-width: 3px;}' +
      '.colorfy__enabled .comment_input:not(.is-public) textarea {background-color: #fbdf87!important}',

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
         url: 'https://raw.githubusercontent.com/Shopify/Colorfy/master/css/slack_dark_mode.css?token=AfwS_5b8tHwPVJhZdAcm4FoTOe_24eM8ks5bx3qdwA%3D%3D',
         success: function(css) {
           css += '.inline_message_input_container {background-color: #545454!important};';
           css += '.menu ul li a:not(.inline_menu_link) {color: #e6e6e6!important};';
           $("<style></style>").appendTo('head').html(css);
         }
       });
    }

    else if (dmStateGithub == true && github == true) {
      document.querySelector('body').classList.add('colorfy__enabled');
      var css = 'body.colorfy__enabled {-webkit-filter: invert(100%);' +
      '-moz-filter: invert(100%);' +
      '-o-filter: invert(100%);' +
      '-ms-filter: invert(100%); }' +
      '.colorfy__enabled img {-webkit-filter: invert(100%);' +
      '-moz-filter: invert(100%);' +
      '-o-filter: invert(100%);' +
      '-ms-filter: invert(100%); }' +
      '.colorfy__enabled #main_navigation {-webkit-filter: invert(100%);' +
      '-moz-filter: invert(100%);' +
      '-o-filter: invert(100%);' +
      '-ms-filter: invert(100%); }' +
      '.colorfy__enabled #main_navigation img {-webkit-filter: invert(0%);' +
      '-moz-filter: invert(0%);' +
      '-o-filter: invert(0%);' +
      '-ms-filter: invert(0%); }' +
      '.colorfy__enabled .pane.right.section {background-color: #fff}' +
      '.colorfy__enabled .ticket_status_label {-webkit-filter: invert(100%);' +
      '-moz-filter: invert(100%);' +
      '-o-filter: invert(100%);' +
      '-ms-filter: invert(100%); }' +
      '.colorfy__enabled .status span {-webkit-filter: invert(100%);' +
      '-moz-filter: invert(100%);' +
      '-o-filter: invert(100%);' +
      '-ms-filter: invert(100%); }' +
      'body.colorfy__enabled {background-color: #000;}' +
      'body.colorfy__enabled .btn-primary, body.colorfy__enabled .IssueLabel, body.colorfy__enabled .octicon-issue-opened, body.colorfy__enabled .progress-bar, body.colorfy__enabled g-emoji, body.colorfy__enabled .label-select-menu-item .mr-2, body.colorfy__enabled .State{-webkit-filter: invert(100%);' +
      '-moz-filter: invert(100%);' +
      '-o-filter: invert(100%);' +
      '-ms-filter: invert(100%); }' +
      '.colorfy__enabled img {-webkit-filter: invert(100%);' +
      '-moz-filter: invert(100%);' +
      '-o-filter: invert(100%);' +
      '-ms-filter: invert(100%); }' +
      '.colorfy__enabled #main_navigation {-webkit-filter: invert(100%);' +
      '-moz-filter: invert(100%);' +
      '-o-filter: invert(100%);' +
      '-ms-filter: invert(100%); }' +
      '.colorfy__enabled #main_navigation img, body.colorfy__enabled .State .octicon-issue-opened {-webkit-filter: invert(0%);' +
      '-moz-filter: invert(0%);' +
      '-o-filter: invert(0%);' +
      '-ms-filter: invert(0%); }',
      
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

    else if (dmStateGuru == true && guru == true) {
      document.querySelector('body').classList.add('colorfy__enabled');
      var css = 'body.colorfy__enabled {-webkit-filter: invert(100%);' +
      '-moz-filter: invert(100%);' +
      '-o-filter: invert(100%);' +
      '-ms-filter: invert(100%); }' +
      '.colorfy__enabled img {-webkit-filter: invert(100%);' +
      '-moz-filter: invert(100%);' +
      '-o-filter: invert(100%);' +
      '-ms-filter: invert(100%); }' +
      '.colorfy__enabled #main_navigation {-webkit-filter: invert(100%);' +
      '-moz-filter: invert(100%);' +
      '-o-filter: invert(100%);' +
      '-ms-filter: invert(100%); }' +
      '.colorfy__enabled #main_navigation img {-webkit-filter: invert(0%);' +
      '-moz-filter: invert(0%);' +
      '-o-filter: invert(0%);' +
      '-ms-filter: invert(0%); }' +
      '.colorfy__enabled .pane.right.section {background-color: #fff}' +
      '.colorfy__enabled .ticket_status_label {-webkit-filter: invert(100%);' +
      '-moz-filter: invert(100%);' +
      '-o-filter: invert(100%);' +
      '-ms-filter: invert(100%); }' +
      '.colorfy__enabled .status span {-webkit-filter: invert(100%);' +
      '-moz-filter: invert(100%);' +
      '-o-filter: invert(100%);' +
      '-ms-filter: invert(100%); }' +
      '.colorfy__enabled .comment_input:not(.is-public) textarea:focus {border-color: blue!important; border-width: 3px;}' +
      '.colorfy__enabled .comment_input:not(.is-public) textarea {background-color: #fbdf87!important}',

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
