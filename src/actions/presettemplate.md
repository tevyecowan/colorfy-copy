<!--
// Template for adding new presets. add the ID for the button and the hexcodes
// change the dark mode to true or false if neccessary uncomment and add to the
// optionsData.js file
$('#IDforbutton').on('click', function() {
    chrome.storage.sync.get(["css"], function(update) {
        var cssValue = [
            "#",//CodeMirror-code
            "#",//cm-comment
            "#",//cm-string
            "#",//cm-property
            "#",//cm-liquid
            "#",//cm-liquid-markup-delimiter
            "#",//cm-liquid-string
            "#",//cm-liquid-filter
            "#",//cm-tag
            "#",//cm-bracket
            "#",//cm-attribute
            "#",//cm-qualifier
            "#",//cm-meta
            "#",//cm-def
            "#",//cm-liquid-atom
            "#",//cm-liquid-method
            "#",//cm-variable-2
            "#",//cm-variable-3
            "#",//cm-keyword
            "#",//cm-number
            "#",//cm-error
            "#",//cm-string-2
            "#",//cm-operator
            "#",//cm-variable
            "#",//Active line background Colour
            "#",//Cursor colour
            "#"//cm-builtin
        ];

        var ids = update.css[0];
        var i = 0;

        for (i = 0; i < cssValue.length; i++){
            var element = document.getElementById(ids[i]);
            element.value = cssValue[i];
        };
        $('#dark-mode').prop('checked', true);
        $('#fullscreen').prop('checked', false);

        setTimeout(_updatePreview, 500);
    });
});

//Button HTML template for adding a new preset
<div class="Polaris-ButtonGroup__Item">
    <button id="replacewithid" type="button" class="Polaris-Button">
        <span class="Polaris-Button__Content">
            <span>replace with preset label</span>
        </span>
    </button>
</div>
-->
