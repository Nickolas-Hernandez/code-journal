/* global data */
/* exported data */
var $entryForm = document.querySelector('.entry-form');
var $imageInput = document.querySelector('#image-url');
var $entryImage = document.querySelector('.entry-image');
var $entryList = document.querySelector('.entries');
var $newEntryBtn = document.querySelector('.new-entry-button');
var $divFormEntry = document.querySelector('.entry-form-sec');
var $closeButton = document.querySelector('.close-button');
var $entriesList = document.querySelector('.entries-section');

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
  var tempEntry = createEntry(entry);
  $entryList.prepend(tempEntry);
  closeEntryForm();
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
  return newEntry;
}

function generateEntries(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var entry = createEntry(data.entries[i]);
    $entryList.appendChild(entry);
  }
}

function openEntryForm(event) {
  $divFormEntry.className = 'entry-form-sec';
  $entriesList.className = 'entries-section hidden';
  data.view = 'entry-form';
}

function closeEntryForm(event) {
  $divFormEntry.className = 'entry-form-sec hidden';
  $entriesList.className = 'entries-section';
  data.view = 'entry-list';
}

function openPreviousView(event) {
  if (data.view === 'entry-form') {
    $divFormEntry.className = 'entry-form-sec';
  } else {
    $divFormEntry.className = 'entry-form-sec hidden';
  }
}

$imageInput.addEventListener('input', handleImageUrlInput);
$entryForm.addEventListener('submit', handleEntrySubmit);
$newEntryBtn.addEventListener('click', openEntryForm);
$closeButton.addEventListener('click', closeEntryForm);
window.addEventListener('DOMContentLoaded', generateEntries);
window.addEventListener('load', openPreviousView);
