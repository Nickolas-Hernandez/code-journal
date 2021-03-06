/* global data */
/* exported data */
var $entryForm = document.querySelector('.entry-form');
var $imageInput = document.querySelector('#image-url');
var $entryImage = document.querySelector('.entry-image');
var $entryList = document.querySelector('.entries');
var $newEntryBtn = document.querySelector('.new-entry-button');
var $divFormEntry = document.querySelector('.entry-form-sec');
var $entriesList = document.querySelector('.entries-section');
var $entriesNav = document.querySelector('.entries-nav');
var $formTitle = document.querySelector('.form-title');
var $deleteBtn = document.querySelector('.delete-button');
var $saveBtn = document.querySelector('#save-button');
var $modalSection = document.querySelector('.modal-section');

function handleImageUrlInput(event) {
  $entryImage.setAttribute('src', event.target.value);
}

function handleEntrySubmit(event) {
  event.preventDefault();
  if ($formTitle.textContent === 'Edit Entry') {
    if (event.submitter === $saveBtn) {
      var entryID = data.editing.entryId;
      var index = data.entries.length - entryID;
      var oldEntries = $entryList.querySelectorAll('li');
      for (var i = 0; i < oldEntries.length; i++) {
        if (entryID.toString() === oldEntries[i].dataset.entryId) {
          var selectedEntry = oldEntries[i];
        }
      }
      data.editing.image = $entryForm.elements.image.value;
      data.editing.title = $entryForm.elements.title.value;
      data.editing.notes = $entryForm.elements.notes.value;
      data.entries[index] = data.editing;
      var updatedEntry = createEntry(data.editing);
      selectedEntry.replaceWith(updatedEntry);
    } else if (event.submitter === $deleteBtn) {
      $modalSection.className = 'modal-section';
      return;
    }
  } else {
    var entry = {
      image: $entryForm.elements.image.value,
      title: $entryForm.elements.title.value,
      notes: $entryForm.elements.notes.value,
      entryId: data.nextEntryId
    };
    data.nextEntryId++;
    data.entries.unshift(entry);
    var tempEntry = createEntry(entry);
    $entryList.prepend(tempEntry);
  }
  $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
  closeEntryForm();
}

function createEntry(entry) {
  var newEntry = document.createElement('li');
  var entryImage = document.createElement('img');
  var entryTitle = document.createElement('h3');
  var entryNotes = document.createElement('p');
  var columnHalf = document.createElement('div');
  var columnOtherHalf = document.createElement('div');
  var imageContainer = document.createElement('div');
  var titleRow = document.createElement('div');
  var editIcon = document.createElement('i');
  newEntry.className = 'entry row';
  columnHalf.className = 'column-half';
  columnOtherHalf.className = 'column-half';
  imageContainer.className = 'image-container';
  entryImage.className = 'saved-entry-image';
  titleRow.className = 'title-row row';
  editIcon.className = 'fas fa-pencil-alt';
  entryImage.setAttribute('src', entry.image);
  entryImage.setAttribute('alt', 'entry image');
  entryTitle.textContent = entry.title;
  entryNotes.textContent = entry.notes;
  imageContainer.appendChild(entryImage);
  columnHalf.appendChild(imageContainer);
  newEntry.appendChild(columnHalf);
  titleRow.appendChild(entryTitle);
  titleRow.appendChild(editIcon);
  columnOtherHalf.appendChild(titleRow);
  columnOtherHalf.appendChild(entryNotes);
  newEntry.appendChild(columnOtherHalf);
  newEntry.setAttribute('data-entry-id', entry.entryId);
  return newEntry;
}

function generateEntries(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var entry = createEntry(data.entries[i]);
    $entryList.appendChild(entry);
  }
}

function openEntryForm(event) {
  $entryForm.className = 'entry-form';
  $entryForm.reset();
  $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $saveBtn.className = '';
  $deleteBtn.className = 'delete-button hidden';
  $divFormEntry.className = 'entry-form-sec';
  $entriesList.className = 'entries-section hidden';
  data.view = 'entry-form';
  $formTitle.textContent = 'New Entry';
}

function closeEntryForm(event) {
  $divFormEntry.className = 'entry-form-sec hidden';
  $entriesList.className = 'entries-section';
  data.view = 'entry-list';
}

function openPreviousView(event) {
  if (data.view === 'entry-form-edit') {
    $divFormEntry.className = 'entry-form';
    $entriesList.className = 'entries-section hidden';
    $entryForm.elements['image-url'].value = data.editing.image;
    $entryImage.setAttribute('src', data.editing.image);
    $entryForm.elements['entry-title'].value = data.editing.title;
    $entryForm.elements['notes-entry'].value = data.editing.notes;
    $formTitle.textContent = 'Edit Entry';
    $deleteBtn.className = 'delete-button';
    $saveBtn.className = 'edit';
  } else if (data.view === 'entry-form') {
    $divFormEntry.className = 'entry-form-sec';
    $entriesList.className = 'entries-section hidden';
  } else {
    $divFormEntry.className = 'entry-form-sec hidden';
  }
}

function handleEdit(event) {
  if (event.target.tagName === 'I') {
    openEntryForm();
    data.view = 'entry-form-edit';
    $deleteBtn.className = 'delete-button';
    $saveBtn.className = 'edit';
    $formTitle.textContent = 'Edit Entry';
    var entry = event.target.closest('.entry');
    var entryID = entry.getAttribute('data-entry-id');
    for (var i = 0; i < data.entries.length; i++) {
      if (entryID === data.entries[i].entryId.toString()) {
        data.editing = data.entries[i];
      }
    }
    $entryForm.elements['image-url'].value = data.editing.image;
    $entryImage.setAttribute('src', data.editing.image);
    $entryForm.elements['entry-title'].value = data.editing.title;
    $entryForm.elements['notes-entry'].value = data.editing.notes;
  }
}

function handleDelete(event) {
  if (event.target.className === 'cancel-button') {
    $modalSection.className = 'modal-section hidden';
  } else if (event.target.className === 'modal-delete-button') {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing === data.entries[i]) {
        data.entries.splice(i, 1);
      }
    }
    var listItems = $entryList.querySelectorAll('li');
    for (var j = 0; j < listItems.length; j++) {
      if (data.editing.entryId.toString() === listItems[j].dataset.entryId) {
        listItems[j].remove();
      }
    }
    data.editing = null;
    $modalSection.className = 'modal-delete-button hidden';
    $entryForm.className = 'entry-form-sec hidden';
    $entriesList.className = 'entries-section';
    data.view = 'entry-list';
  }
}

$imageInput.addEventListener('input', handleImageUrlInput);
$entryForm.addEventListener('submit', handleEntrySubmit);
$newEntryBtn.addEventListener('click', openEntryForm);
$entriesNav.addEventListener('click', closeEntryForm);
$entryList.addEventListener('click', handleEdit);
$modalSection.addEventListener('click', handleDelete);
window.addEventListener('DOMContentLoaded', generateEntries);
window.addEventListener('load', openPreviousView);
