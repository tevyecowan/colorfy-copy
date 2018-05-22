function _customizer() {

  var regex = /(["'])(?:(?=(\\?))\2.)*?\1/g;
  var url = window.location.href;
  url = url.split('/editor')[0].concat('?key=sections/');
  var btn = [];
  // btn[0] = '<a class="btn diffy-section" target="_blank" href="'
  // btn[1] = '">D</a>'

// This finds the active tab panel and looks at the li's inside
  $('.theme-editor-action-list > li').each(function() {
    var section = $(this).attr("data-bind-attribute");
    if (section !== undefined) {
      var res = section.match(regex);
      var file = res[1].replace(/\"/g, '').concat('.liquid');
      file = url.concat(file);
      console.log(file);
      // $(this).append(`<a class="btn diffy-section" target="_blank" href=“${url}”>D</a>`);
      $(this).append($('<a/>', {
        class: 'btn diffy-section',
        target: '_blank',
        href: file
      }).text('D'));
      $(this).addClass("diffy-hover");
    }
  })
}

function _observer() {
  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  var observer = new MutationObserver(function(mutations, observer) {
      // fired when a mutation occurs
      _customizer();
  });

  // define what element should be observed by the observer
  // and what types of mutations trigger the callback
  observer.observe(document.body, {
    childList: true
    //...
  });
}

$(document).ready(function() {
 // setTimeout(_customizer, 3000);
 _observer();
})



//This finds the Section panels after clicking on the section
// $('.te-panel').each(function() {
//   var panelId = $(this).attr("id");
//   console.log(panelId);
// })
