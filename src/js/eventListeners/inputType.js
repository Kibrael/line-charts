var removeClass = require('../removeClass');

var inputBank = document.getElementById('bank-name');
var inputType = document.getElementById('loan-type');
var inputLocation = document.getElementById('bank-location');
var containerLocation = document.getElementById('container-bank-location');

inputType.addEventListener('change', function() {
  removeClass('visually-hidden', containerLocation);
  // if a location is already chosen we can set the hash
  if (inputLocation.selectedIndex !== 0) {
    location.hash = inputBank.value.replace(/ /g, '-').toLowerCase()
      + '/'
      + inputType.value.replace(/ /g, '-').toLowerCase()
      + '/'
      + inputLocation.value.replace(/ /g, '-').toLowerCase();
  }
});
