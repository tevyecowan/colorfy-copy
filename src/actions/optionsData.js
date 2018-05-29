/* Base Javascript for the Colorfy Chrome extension Settings page */

// Save the current input values to the Chrome storage
function saveData(savedCss, dmState, fsState) {
    chrome.storage.sync.set({
        "css": savedCss,
        "darkMode": dmState,
        "fullscreenMode": fsState

    }, function() {
       console.log('Saved!')
    });
}

// Grab the colour values in chrome storage and update the inputs
function _updatePickers() {
    chrome.storage.sync.get(["css", "darkMode", "fullscreenMode"], function(update) {
      // console.log(update.css);
        var ids = update.css[0];
        var values = update.css[1];
        var properties = update.css[2];
        var dmState = update.darkMode;
        var fsState = update.fullscreenMode;
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
        if (fsState == true) {
            $('#fullscreen').prop('checked', true);
        } else {
            $('#fullscreen').prop('checked', false);
        }
        setTimeout(_updatePreview, 500);
    });
}

// Check Chrome storage for values and set defaults if none are saved
function _checkStorage() {
    chrome.storage.sync.get(["css", "darkMode", "fullscreenMode"], function(edit) {
      // console.log(edit);
        if (edit.css === undefined) {
            var cssName = $('.css-values').map(function() {
                return $(this).attr("id");
            }).toArray();
            var cssProperties = $('.css-values').map(function() {
                return $(this).data("css");
            }).toArray();
            var cssValue = [
                "#212b36",
                "#919eab",
                "#de3618",
                "#50248f",
                "#50248f",
                "#212b36",
                "#00848e",
                "#9c6ade",
                "#212b36",
                "#212b36",
                "#108043",
                "#00848e",
                "#212b36",
                "#108043",
                "#de3618",
                "#202e78",
                "#c05717",
                "#50b83c",
                "#9c6ade",
                "#00848e",
                "#bf0711",
                "#ff5500",
                "#212B36",
                "#212B36",
                "#f4f6f8",
                "#000000"
            ];
            var css = [];
              css[0] = cssName;
              css[1] = cssValue;
              css[2] = cssProperties;

            if (edit.darkMode == undefined) {
                var darkMode = false;
            }
            if (edit.fullscreenMode == undefined) {
                var fullscreenMode = false;
            }


            saveData(css, darkMode, fullscreenMode);
        }
    });
}

//Update the preview colours on page load
function _updatePreview() {

    $('.css-values').each(function() {
        var i = "." + $(this).prop("id");
        var c = $(this).prop("value");
        $(i).css("color", c);
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
            return $(this).attr("id");
        }).toArray();
        var cssProperties = $('.css-values').map(function() {
            return $(this).data("css");
        }).toArray();
        var cssValue = $('.css-values').map(function() {
            return $(this).val();
        }).toArray();

        var css = [];
          css[0] = cssName;
          css[1] = cssValue;
          css[2] = cssProperties;

        var darkMode = $('#dark-mode').prop('checked');
        var fullscreenMode = $('#fullscreen').prop('checked');


        saveData(css, darkMode, fullscreenMode);
    });

    // Click function for Old school editor colours preset
    $('#oldSchool').on('click', function() {
        chrome.storage.sync.get(["css"], function(update) {
            var cssValue = [
                "#212b36",
                "#aa5500",
                "#aa1111",
                "#50248f",
                "#212b36",
                "#212b36",
                "#228811",
                "#212b36",
                "#117700",
                "#999977",
                "#0000cc",
                "#555555",
                "#555555",
                "#0000ff",
                "#221199",
                "#202e78",
                "#0055aa",
                "#008855",
                "#770088",
                "#116644",
                "#ff0000",
                "#ff5500",
                "#212B36",
                "#212B36",
                "#f4f6f8",
                "#000000"
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
                "#e0f5f5",
                "#919EAB",
                "#F49342",
                "#9C6ADE",
                "#47C1BF",
                "#e0f5f5",
                "#EEC200",
                "#9C6ADE",
                "#E0F5F5",
                "#e0f5f5",
                "#FFC58B",
                "#B7ECEC",
                "#e0f5f5",
                "#FFC58B",
                "#F49342",
                "#B7ECEC",
                "#FFC58B",
                "#BBE5B3",
                "#9c6ade",
                "#EEC200",
                "#DE3618",
                "#ff5500",
                "#E0F5F5",
                "#61afef",
                "#212b36",
                "#ABB2BF"
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

    // Click function for Old school editor colours preset
    $('#atompreset').on('click', function() {
        chrome.storage.sync.get(["css"], function(update) {
            var cssValue = [
                "#ABB2BF",
                "#ABB2BF",
                "#98C379",
                "#C678DD",
                "#61AFEF",
                "#ABB2BF",
                "#EEC200",
                "#C678DD",
                "#E06C75",
                "#ABB2BF",
                "#D19A66",
                "#56B6C2",
                "#56B6C2",
                "#61AFEF",
                "#F49342",
                "#56B6C2",
                "#FFC58B",
                "#BBE5B3",
                "#C678DD",
                "#EEC200",
                "#DE3618",
                "#FF5500",
                "#56B6C2",
                "#61AFEF",
                "#212b36",
                "#ABB2BF"
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
          chrome.storage.sync.remove(["css", "darkMode"], function() {
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
