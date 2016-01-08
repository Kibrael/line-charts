var inputBank = document.getElementById('bank-name');
var inputType = document.getElementById('loan-type');
var inputLocation = document.getElementById('bank-location');

inputLocation.addEventListener('change', function() {
  location.hash = inputBank.value.replace(/ /g, '-').toLowerCase()
    + '/'
    + inputType.value.replace(/ /g, '-').toLowerCase()
    + '/'
    + inputLocation.value.replace(/ /g, '-').toLowerCase();
});
