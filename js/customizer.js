function _customizer() {

  var regex = /(["'])(?:(?=(\\?))\2.)*?\1/g;
  var url = window.location.href;
  url = url.split('/editor')[0].concat('?key=sections/');
  var openSVG = `<svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="white" d="M17 2c.553 0 1 .448 1 1v4c0 .552-.447 1-1 1s-1-.448-1-1V5.414l-7.293 7.293c-.195.195-.45.293-.707.293s-.512-.098-.707-.293c-.39-.39-.39-1.023 0-1.414L14.586 4H13c-.553 0-1-.448-1-1s.447-1 1-1h4zm-4 9c.553 0 1 .448 1 1v5c0 .552-.447 1-1 1H3c-.553 0-1-.448-1-1V7c0-.552.447-1 1-1h5c.553 0 1 .448 1 1s-.447 1-1 1H4v8h8v-4c0-.552.447-1 1-1z"></path></svg>`

// This finds the active tab panel and looks at the li's inside
  $('.theme-editor-action-list > li').each(function() {
    var section = $(this).attr("data-bind-attribute");
    if (section !== undefined) {
      var res = section.match(regex);
      var file = res[1].replace(/\"/g, '').concat('.liquid');
      file = url.concat(file);
      $(this)
      .append($('<a/>', {
        class: 'btn btn-primary diffy-section',
        target: '_blank',
        href: file
      }).append(openSVG));
      $(this).addClass("diffy-hover");
    }
  });
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
  });
}

$(document).ready(function() {
 _observer();
})
