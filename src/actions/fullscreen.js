// Toggles fullscreen class for the Shopify Code editor

if ($('html').hasClass('fullscreen-mode')) {
  $('html').removeClass('fullscreen-mode');
} else if ($('body').hasClass('fullscreen-mode')) {
  $('body').removeClass('fullscreen-mode');
} else {
  $('html').addClass('fullscreen-mode');
}
