/* global data */
/* exported data */

var $urlInput = document.querySelector('#image-url');
var $entryImage = document.querySelector('.entry-image');

$urlInput.addEventListener('input', function (event) {
  $entryImage.setAttribute('src', event.target.value);
});
