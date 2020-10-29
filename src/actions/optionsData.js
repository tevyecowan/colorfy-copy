/* Base Javascript for the Colorfy Chrome extension Settings page */

// Save the current input values to the Chrome storage
function saveData(savedCss, dmState, fsState, dmStateZD, dmStateSlack, dmStateGithub) {
    chrome.storage.sync.set({
        "css": savedCss,
        "darkMode": dmState,
        "darkModeZD": dmStateZD,
        "darkModeSlack": dmStateSlack,
        "fullscreenMode": fsState,
        "darkModeGithub": dmStateGithub,
        "darkModeGuru": dmStateGuru

    }, function() {
       console.log('Saved!')
    });
}

// Grab the colour values in chrome storage and update the inputs
function _updatePickers() {
    chrome.storage.sync.get(["css", "darkMode", "fullscreenMode", "darkModeZD", "darkModeSlack", "darkModeGithub", "darkModeGuru"], function(update) {
        var ids = update.css[0];
        var values = update.css[1];
        // var properties = update.css[2]; Not used in this function
        var dmState = update.darkMode;
        var dmStateZD = update.darkModeZD;
        var dmStateSlack = update.darkModeSlack;
        var fsState = update.fullscreenMode;
        var dmStateGithub = update.darkModeGithub;
        var dmStateGuru = update.darkModeGuru;
        var i = 0;

        for (i = 0; i < values.length; i++){
            var element = document.getElementById(ids[i]);
            element.value = values[i];
        };
        if (dmState == true) {
            $('#dark-mode').prop('checked', true);
        } else {
            $('#dark-mode').prop('checked', false);
        }
        if (dmStateZD == true) {
            $('#dark-mode-zd').prop('checked', true);
        } else {
            $('#dark-mode-zd').prop('checked', false);
        }
        if (dmStateSlack == true) {
            $('#dark-mode-slack').prop('checked', true);
        } else {
            $('#dark-mode-slack').prop('checked', false);
        }
        if (fsState == true) {
            $('#fullscreen').prop('checked', true);
        } else {
            $('#fullscreen').prop('checked', false);
        }
        if (dmStateGithub == true) {
            $('#dark-mode-github').prop('checked', true);
        } else {
            $('#dark-mode-github').prop('checked', false);
        }
        if (dmStateGuru == true) {
            $('#dark-mode-guru').prop('checked', true);
        } else {
            $('#dark-mode-guru').prop('checked', false);
        }
        setTimeout(_updatePreview, 500);
    });
}

// Check Chrome storage for values and set defaults if none are saved
function _checkStorage() {
    chrome.storage.sync.get(["css", "darkMode", "fullscreenMode", "darkModeZD", "darkModeSlack", "darkModeGithub", "darkModeGuru"], function(edit) {
      // console.log(edit);
        if (edit.css === undefined) {
            var cssName = $('.css-values').map(function() {
                return $(this).attr("id");
            }).toArray();
            var cssProperties = $('.css-values').map(function() {
                return $(this).data("css");
            }).toArray();
            var cssValue = [
                "#212b36", //CodeMirror-code
                "#919eab", //cm-comment
                "#de3618", //cm-string
                "#50248f", //cm-property
                "#50248f", //cm-liquid
                "#212b36", //cm-liquid-markup-delimiter
                "#00848e", //cm-liquid-string
                "#9c6ade", //cm-liquid-filter
                "#212b36", //cm-tag
                "#212b36", //cm-bracket
                "#108043", //cm-attribute
                "#00848e", //cm-qualifier
                "#212b36", //cm-meta
                "#108043", //cm-def
                "#de3618", //cm-liquid-atom
                "#202e78", //cm-liquid-method
                "#c05717", //cm-variable-2
                "#50b83c", //cm-variable-3
                "#9c6ade", //cm-keyword
                "#00848e", //cm-number
                "#bf0711", //cm-error
                "#ff5500", //cm-string-2
                "#212B36", //cm-operator
                "#212B36", //cm-variable
                "#f4f6f8", //Active line background Colour
                "#000000", //Cursor colour
                "#3300aa", //cm-builtin
                "#bbe5b3", //Diffy added background
                "#feaf9a" //Diffy removed background
            ];
            var css = [];
              css[0] = cssName;
              css[1] = cssValue;
              css[2] = cssProperties;

            if (edit.darkMode == undefined) {
                var darkMode = false;
            }
            if (edit.darkModeZD == undefined) {
                var darkModeZD = false;
            }
            if (edit.darkModeSlack == undefined) {
                var darkModeSlack = false;
            }
            if (edit.fullscreenMode == undefined) {
                var fullscreenMode = false;
            }
            if (edit.darkModeGithub == undefined) {
                var darkModeGithub = false;
            }
            if (edit.darkModeGuru == undefined) {
                var darkModeGuru = false;
            }


            saveData(css, darkMode, fullscreenMode, darkModeZD, darkModeSlack, darkModeGithub, darkModeGuru);
        }
    });
}

//Update the preview colours on page load
function _updatePreview() {

    $('.css-values').each(function() {
        var previewClass = `.${$(this).prop("id")}`;
        var previewValue = $(this).prop("value");
        var previewStyle = $(this).data('css');
        $(previewClass).css(previewStyle, previewValue);
    })
    if ($("#dark-mode").prop("checked") == true) {
            $(".code-block").addClass("preview-dark_mode");
        } else {
            $(".code-block").removeClass("preview-dark_mode");
        }
}

// function _updateClassColour(cssClass, colour) {
//     $(cssClass).css("color", colour);
// }

$(document).ready(function() {
    _checkStorage();
    setTimeout(_updatePickers, 1000);

    $(".css-values").change(function(){
        var i = "." + $(this).prop("id");
        var c = $(this).prop("value");
        $(i).css("color", c);
    })

    $("#dark-mode").change(function(){
        if ($("#dark-mode").prop("checked") == true) {
            $(".code-block").addClass("preview-dark_mode");
        } else {
            $(".code-block").removeClass("preview-dark_mode");
        }
    })


    $('#save').on('click', function() {

        var save_button = $('#save');
        var originalText = save_button.text();
        save_button.text('Saved').css('background-color', '#50248F');

        // set timeout on click, to show user changes have been saved
        setTimeout(function() {
          save_button.text(originalText).css('background-color', '');
        }, 3000);

        var cssName = $('.css-values').map(function() {
            console.log($(this).attr("id"));
            return $(this).attr("id");
        }).toArray();
        var cssProperties = $('.css-values').map(function() {
            console.log($(this).data("css"));
            return $(this).data("css");
        }).toArray();
        var cssValue = $('.css-values').map(function() {
            console.log($(this).val());
            return $(this).val();
        }).toArray();

        var css = [];
          css[0] = cssName;
          css[1] = cssValue;
          css[2] = cssProperties;

        var darkMode = $('#dark-mode').prop('checked');
        var darkModeZD = $('#dark-mode-zd').prop('checked');
        var darkModeSlack = $('#dark-mode-slack').prop('checked');
        var fullscreenMode = $('#fullscreen').prop('checked');
        var darkModeGithub = $('#dark-mode-github').prop('checked');
        var darkModeGuru = $('#dark-mode-guru').prop('checked');

        saveData(css, darkMode, fullscreenMode, darkModeZD, darkModeSlack, darkModeGithub, darkModeGuru);
        setTimeout(_updatePreview, 500);
    });

    // Click function for Old school editor colours preset
    $('#oldSchool').on('click', function() {
        chrome.storage.sync.get(["css"], function(update) {
            var cssValue = [
                "#212b36",//CodeMirror-code
                "#aa5500",//cm-comment
                "#aa1111",//cm-string
                "#50248f",//cm-property
                "#212b36",//cm-liquid
                "#212b36",//cm-liquid-markup-delimiter
                "#228811",//cm-liquid-string
                "#212b36",//cm-liquid-filter
                "#117700",//cm-tag
                "#999977",//cm-bracket
                "#0000cc",//cm-attribute
                "#555555",//cm-qualifier
                "#555555",//cm-meta
                "#0000ff",//cm-def
                "#221199",//cm-liquid-atom
                "#202e78",//cm-liquid-method
                "#0055aa",//cm-variable-2
                "#008855",//cm-variable-3
                "#770088",//cm-keyword
                "#116644",//cm-number
                "#ff0000",//cm-error
                "#ff5500",//cm-string-2
                "#212B36",//cm-operator
                "#212B36",//cm-variable
                "#f4f6f8",//Active line background Colour
                "#000000",//Cursor colour
                "#3300aa",//cm-builtin
                "#bbe5b3",//Diffy added background
                "#feaf9a"//Diffy removed background
            ];

            var ids = update.css[0];
            var i = 0;

            for (i = 0; i < cssValue.length; i++){
                var element = document.getElementById(ids[i]);
                element.value = cssValue[i];
            };
            $('#dark-mode').prop('checked', false);
            $('#fullscreen').prop('checked', false);

            setTimeout(_updatePreview, 500);
        });
    });

    // Click function for Dark Mode editor colours preset
    $('#darkMode').on('click', function() {
        chrome.storage.sync.get(["css"], function(update) {
            var cssValue = [
                "#e0f5f5",//CodeMirror-code
                "#919EAB",//cm-comment
                "#F49342",//cm-string
                "#9C6ADE",//cm-property
                "#47C1BF",//cm-liquid
                "#e0f5f5",//cm-liquid-markup-delimiter
                "#EEC200",//cm-liquid-string
                "#9C6ADE",//cm-liquid-filter
                "#E0F5F5",//cm-tag
                "#e0f5f5",//cm-bracket
                "#FFC58B",//cm-attribute
                "#B7ECEC",//cm-qualifier
                "#e0f5f5",//cm-meta
                "#FFC58B",//cm-def
                "#F49342",//cm-liquid-atom
                "#B7ECEC",//cm-liquid-method
                "#FFC58B",//cm-variable-2
                "#BBE5B3",//cm-variable-3
                "#9c6ade",//cm-keyword
                "#EEC200",//cm-number
                "#DE3618",//cm-error
                "#ff5500",//cm-string-2
                "#E0F5F5",//cm-operator
                "#61afef",//cm-variable
                "#212b36",//Active line background Colour
                "#ABB2BF",//Cursor colour
                "#3300aa",//cm-builtin
                "#bbe5b3",//Diffy added background
                "#feaf9a"//Diffy removed background
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

    // Click function for Atom editor colours preset
    $('#atompreset').on('click', function() {
        chrome.storage.sync.get(["css"], function(update) {
            var cssValue = [
                "#ABB2BF",//CodeMirror-code
                "#ABB2BF",//cm-comment
                "#98C379",//cm-string
                "#C678DD",//cm-property
                "#61AFEF",//cm-liquid
                "#ABB2BF",//cm-liquid-markup-delimiter
                "#EEC200",//cm-liquid-string
                "#C678DD",//cm-liquid-filter
                "#E06C75",//cm-tag
                "#ABB2BF",//cm-bracket
                "#D19A66",//cm-attribute
                "#56B6C2",//cm-qualifier
                "#56B6C2",//cm-meta
                "#61AFEF",//cm-def
                "#F49342",//cm-liquid-atom
                "#56B6C2",//cm-liquid-method
                "#FFC58B",//cm-variable-2
                "#BBE5B3",//cm-variable-3
                "#C678DD",//cm-keyword
                "#EEC200",//cm-number
                "#DE3618",//cm-error
                "#FF5500",//cm-string-2
                "#56B6C2",//cm-operator
                "#61AFEF",//cm-variable
                "#212b36",//Active line background Colour
                "#ABB2BF",//Cursor colour
                "#9579e2",//cm-builtin
                "#bbe5b3",//Diffy added background
                "#feaf9a"//Diffy removed background
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

    // Click function for Dracula Dark Theme colours preset
    $('#draculapreset').on('click', function() {
        chrome.storage.sync.get(["css"], function(update) {
            var cssValue = [
                "#ABB2BF",//CodeMirror-code
                "#6272A4",//cm-comment
                "#F1FA8C",//cm-string
                "#66D9EF",//cm-property
                "#61AFEF",//cm-liquid
                "#50FA7B",//cm-liquid-markup-delimiter
                "#FF79C6",//cm-liquid-string
                "#66D9EF",//cm-liquid-filter
                "#FF79C6",//cm-tag
                "#ABB2BF",//cm-bracket
                "#50FA7B",//cm-attribute
                "#50FA7B",//cm-qualifier
                "#F8F8F2",//cm-meta
                "#50FA7B",//cm-def
                "#BD93F9",//cm-liquid-atom
                "#DEF993",//cm-liquid-method
                "#FFFFFF",//cm-variable-2
                "#FFB86C",//cm-variable-3
                "#FF79C6",//cm-keyword
                "#BD93F9",//cm-number
                "#DE3618",//cm-error
                "#F1FA8C",//cm-string-2
                "#FF79C6",//cm-operator
                "#50FA7B",//cm-variable
                "#212B36",//Active line background Colour
                "#ABB2BF",//Cursor colour
                "#50FA7B",//cm-builtin
                "#bbe5b3",//Diffy added background
                "#feaf9a"//Diffy removed background
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

    // Default reset button function
    $('#reset').on('click', function() {
        if ($(this).text() == 'Are you sure?') {
          chrome.storage.sync.remove(["css", "darkMode", "fullscreenMode", "darkModeZD", "darkModeSlack", "darkModeGithub"], function() {
            $('#reset').text('Reset to default');
            _checkStorage();
            setTimeout(_updatePickers, 1000);
          });
        } else {
          $(this).text('Are you sure?');
        }
    });

    $('span').each(function() {
        var t = $(this).prop("class");
        $(this).prop('title', t);
    })

});
