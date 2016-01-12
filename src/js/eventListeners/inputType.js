var inputBank = document.getElementById('bank-name');
var inputType = document.getElementById('loan-type');

inputType.addEventListener('change', function() {
  location.hash = inputBank.value.replace(/ /g, '-').toLowerCase()
    + '/'
    + inputType.value.replace(/ /g, '-').toLowerCase();
});
