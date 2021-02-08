/* global data */
/* exported data */

var $entryForm = document.querySelector('.entry-form');
var $imageInput = document.querySelector('#image-url');

$imageInput.addEventListener('input', function (event) {
  var $entryImage = document.querySelector('.entry-image');
  $entryImage.setAttribute('src', event.target.value);
});

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var entry = {
    image: $entryForm.elements.image.value,
    title: $entryForm.elements.title.value,
    notes: $entryForm.elements.notes.value,
    entryId: data.nextEntryId
  }
  data.nextEntryId++;

});
