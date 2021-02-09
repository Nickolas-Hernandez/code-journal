/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};
var previousEntryData = localStorage.getItem('entry-data');

if (previousEntryData !== null) {
  data = JSON.parse(previousEntryData);
}

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('entry-data', dataJSON);
});
