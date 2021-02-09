/* global data */
/* exported data */
var $entryForm = document.querySelector('.entry-form');
var $imageInput = document.querySelector('#image-url');
var $entryImage = document.querySelector('.entry-image');

function handleImageUrlInput(event) {
  $entryImage.setAttribute('src', event.target.value);
}

function handleEntrySubmit(event) {
  event.preventDefault();
  var entry = {
    image: $entryForm.elements.image.value,
    title: $entryForm.elements.title.value,
    notes: $entryForm.elements.notes.value,
    entryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.push(entry);
  $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
}

$imageInput.addEventListener('input', handleImageUrlInput);
$entryForm.addEventListener('submit', handleEntrySubmit);
