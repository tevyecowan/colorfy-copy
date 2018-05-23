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

      function _cssHover(selector, css) {
        $(selector)
        .css(css, '#c4cdd5')
        .hover(function() {
            $(this).css(css, '#5c6ac4')
        }, function(){
          $(this).css(css, '#c4cdd5')
        });
      }

      // Check if darkmode is enabled and add class and fix diffy button colour
      // if enabled
      if (dmState == true) {
          $('main').addClass('theme-editor--dark');
          addCSSRule(document.styleSheets[cssFile], '.asset-search', 'background-color: inherit !important', 0);
          addCSSRule(document.styleSheets[cssFile], '.CodeMirror-lines', 'background-color: #0e1216 !important', 0);
          $('.ui-app-frame__aside').css('background-color', '#0e1216');
          $('.jkC4a').css('background-color', '#0e1216');
          _cssHover($('._1f6E2'), 'fill');
          _cssHover($('._2Eqdn'), 'color');
          _cssHover($('.ui-nav__link--parent.ui-nav__link--parent.ui-button--link'), 'color');
          _cssHover($('.ui-nav__link--parent.ui-nav__link--parent'), 'color');


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
