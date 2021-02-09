/* global data */
/* exported data */
var $entryForm = document.querySelector('.entry-form');
var $imageInput = document.querySelector('#image-url');
var $entryImage = document.querySelector('.entry-image');
var $entryList = document.querySelector('.entries');

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
  data.entries.unshift(entry);
  $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
}

function createEntry(entry) {
  var newEntry = document.createElement('li');
  var entryImage = document.createElement('img');
  var entryTitle = document.createElement('h3');
  var entryNotes = document.createElement('p');
  var columnHalf = document.createElement('div');
  var columnOtherHalf = document.createElement('div');
  newEntry.className = 'row';
  columnHalf.className = 'column-half';
  columnOtherHalf.className = 'column-half';
  entryImage.setAttribute('src', entry.image);
  entryImage.setAttribute('alt', 'entry image');
  entryTitle.textContent = entry.title;
  entryNotes.textContent = entry.notes;
  columnHalf.appendChild(entryImage);
  newEntry.appendChild(columnHalf);
  columnOtherHalf.appendChild(entryTitle);
  columnOtherHalf.appendChild(entryNotes);
  newEntry.appendChild(columnOtherHalf);
  $entryList.appendChild(newEntry);
}

function generateEntries(event) {
  for (var i = 0; i < data.entries.length; i++) {
    createEntry(data.entries[i]);
  }
}

$imageInput.addEventListener('input', handleImageUrlInput);
$entryForm.addEventListener('submit', handleEntrySubmit);
window.addEventListener('DOMContentLoaded', generateEntries);
