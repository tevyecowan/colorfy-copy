// Function to create a new stylesheet and add the custom colours that are
// currently stored in chrome storage
function _applyCss() {
  $('body').addClass('colorfy__enabled');
  // Create new stylesheet for custom colours to be added to
  var ColorfyCss = (function() {
    // Create the <style> tag
    var style = document.createElement("style");

    // Add the <style> element to the page
    document.head.appendChild(style);

    return style.ColorfyCss;
  })();

  chrome.storage.sync.get(["css", "darkMode", "fullscreenMode"], function(edit) {
      var classes = edit.css[0];

      var values = edit.css[1];

      var properties = edit.css[2];

      var dmState = edit.darkMode;

      var fsState = edit.fullscreenMode;

      var cssFile = document.styleSheets.length - 1;

      function _cssHover(selector, css) {
        selector = `.colorfy__enabled ${selector}`;
        // $(selector)
        // .css(css, '#c4cdd5')
        // .hover(function() {
        //     $(this).css(css, '#5c6ac4')
        // }, function(){
        //   $(this).css(css, '#c4cdd5')
        // });
        addCSSRule(document.styleSheets[cssFile], selector, `${css}: #c4cdd5!important`);
        addCSSRule(document.styleSheets[cssFile], `${selector}:hover`, `${css}: #5c6ac4`);
      }

      // Check if darkmode is enabled and add class and fix diffy button colour
      // if enabled
      if (dmState == true) {
          $('main.ui-app-frame__main').addClass('theme-editor--dark');
          addCSSRule(document.styleSheets[cssFile], '.colorfy__enabled .asset-search', 'background-color: inherit !important', 0);
          addCSSRule(document.styleSheets[cssFile], '.colorfy__enabled .CodeMirror-lines', 'background-color: #0e1216 !important', 0);
          addCSSRule(document.styleSheets[cssFile], '.colorfy__enabled #AppFrameNav nav', 'background-color: #0e1216 !important', 0);
            addCSSRule(document.styleSheets[cssFile], '.colorfy__enabled .jkC4a', 'background-color: #0e1216 !important', 0);
          // $('.colorfy__enabled #AppFrameNav nav').css('background-color', '#0e1216');
          // $('.colorfy__enabled .jkC4a').css('background-color', '#0e1216');
          _cssHover('._1f6E2', 'fill');
          _cssHover('#AppFrameNav nav button', 'fill')
          _cssHover('#AppFrameNav nav span', 'color');
          _cssHover('.ui-nav__link--parent.ui-nav__link--parent.ui-button--link', 'color');
          _cssHover('.ui-nav__link--parent.ui-nav__link--parent', 'color');


      }

      // check if fullscreenmode is enabled and add class to make editor load fullscreen
      if (fsState == true) {
        $('html').addClass('fullscreen-mode');
      }

      //Run through the custom colours and add css overrides to the stylesheet
      var index = 0;
      for (index = 0; index < classes.length; index++){
          // var cssClass = "." + classes[index];
          var cssClass = `.colorfy__enabled .${classes[index]}`
          // var cssValue = properties[index] + ": " + values[index] + " !important";
          var cssValue = `${properties[index]}: ${values[index]}!important`;
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
