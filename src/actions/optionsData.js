function saveData(savedCss, dmState) {
    chrome.storage.sync.set({
        "css": savedCss,
        "darkMode": dmState
        
    }, function() {
       console.log('Saved!') 
    });
}

function _updatePickers() {
    chrome.storage.sync.get(["css", "darkMode"], function(update) {
        var ids = update.css[0];
        var values = update.css[1];
        var dmState = update.darkMode;
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
    });
}

function _checkStorage() {
    chrome.storage.sync.get(["css", "darkMode"], function(edit) {
        if (edit.css == undefined) {
            var cssName = $('.css-values').map(function() {
                return $(this).attr("id");
            }).toArray();
            var cssValue = [
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
                "#bf0711"
            ];
            var css = [];
              css[0] = cssName;
              css[1] = cssValue;
            
            if (edit.darkMode == undefined) {
                var darkMode = false;
            }


            saveData(css, darkMode);
        }
    });
}

$(document).ready(function() {
    _checkStorage();
    setTimeout(_updatePickers, 1000);
    

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
        var cssValue = $('.css-values').map(function() {
            return $(this).val();
        }).toArray();

        var css = [];
          css[0] = cssName;
          css[1] = cssValue;
        
        var darkMode = $('#dark-mode').prop('checked');


        saveData(css, darkMode);
    });
    
    $('#oldSchool').on('click', function() {
        chrome.storage.sync.get(["css"], function(update) {
            var cssValue = [
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
                "#ff0000"
            ];
            
            var ids = update.css[0];
            var i = 0;

            for (i = 0; i < cssValue.length; i++){
                var element = document.getElementById(ids[i]);
                element.value = cssValue[i];
            };
            $('#dark-mode').prop('checked', false);
        });
    });
    
    $('#darkMode').on('click', function() {
        chrome.storage.sync.get(["css"], function(update) {
            var cssValue = [
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
                "#DE3618"
            ];
            
            var ids = update.css[0];
            var i = 0;

            for (i = 0; i < cssValue.length; i++){
                var element = document.getElementById(ids[i]);
                element.value = cssValue[i];
            };
            $('#dark-mode').prop('checked', true);
        });
    });
    
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
    
});