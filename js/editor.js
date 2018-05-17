// Function to create a new stylesheet and add the custom colours that are
// currently stored in chrome storage
function _applyCss() {

  // Create new stylesheet for custom colours to be added to
  var ColorfyCss = (function() {
    // Create the <style> tag
    var style = document.createElement("style");

    // Add the <style> element to the page
    document.head.appendChild(style);

    return style.ColorfyCss;
  })();

  chrome.storage.sync.get(["css", "darkMode"], function(edit) {
      var classes = edit.css[0];

      var values = edit.css[1];

      var dmState = edit.darkMode;

      var cssFile = document.styleSheets.length - 1;

      // Check if darkmode is enabled and add class and fix diffy button colour
      // if enabled
      if (dmState == true) {
          $('body').addClass('theme-editor--dark');
          addCSSRule(document.styleSheets[cssFile], '.asset-search', 'background-color: inherit !important', 0);
          addCSSRule(document.styleSheets[cssFile], '.CodeMirror-lines', 'background-color: #0e1216 !important', 0);
          $('.ui-nav__link--parent.ui-nav__link--parent')
          .css('color', '#c4cdd5')
          .hover(function() {
              $(this).css('color', '#5c6ac4')
          }, function(){
            $(this).css('color', '#c4cdd5')
          });
          $('.ui-nav__link--parent.ui-nav__link--parent.ui-button--link')
          .css('color', '#c4cdd5')
          .hover(function() {
              $(this).css('color', '#5c6ac4')
          }, function(){
            $(this).css('color', '#c4cdd5')
          });
          $('.ui-app-frame__aside').css('background-color', '#0e1216');

      }

      //Run through the custom colours and add css overrides to the stylesheet
      var index = 0;
      for (index = 0; index < classes.length; index++){
          var cssClass = "." + classes[index];
          var cssValue = "color: " + values[index] + " !important";
          addCSSRule(document.styleSheets[cssFile], cssClass, cssValue, 0);
      }

  });

}

// Add the custom colours to the stylesheet
function addCSSRule(sheet, selector, rules, index) {
		sheet.insertRule(selector + '{' + rules + '}', sheet.cssRules.length);
	}

$(document).ready(function() {
    _applyCss();
})
