function _applyCss() {
    
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
        
        console.log(dmState)
        if (dmState == true) {
            $('body').addClass('theme-editor--dark');
        }
        
        var cssFile = document.styleSheets.length - 1;
        
        var i = 0;
        for (i = 0; i < classes.length; i++){
            var cssClass = "." + classes[i];
            var cssValue = "color: " + values[i] + " !important";
         addCSSRule(document.styleSheets[cssFile], cssClass, cssValue, 0);   
        }
        
        
        
    });
    
}

function addCSSRule(sheet, selector, rules, index) {
	
		sheet.insertRule(selector + '{' + rules + '}', sheet.cssRules.length);
	}

$(document).ready(function() {
    _applyCss();
})