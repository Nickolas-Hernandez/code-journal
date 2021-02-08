/* global data */
/* exported data */

var $entryForm = document.querySelector('.entry-form');

$entryForm.addEventListener('input', function (event) {
  var $entryImage = document.querySelector('.entry-image');
  $entryImage.setAttribute('src', event.target.value);
});

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();

});
