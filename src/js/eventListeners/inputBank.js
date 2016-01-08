var addClass = require('../addClass');
var removeClass = require('../removeClass');

var inputBank = document.getElementById('bank-name');
var inputType = document.getElementById('loan-type');
var inputLocation = document.getElementById('bank-location');
var containerLocation = document.getElementById('container-bank-location');
var containerLoanType = document.getElementById('container-loan-type');

// custom awesomplete event
inputBank.addEventListener('awesomplete-selectcomplete', function() {
  removeClass('visually-hidden', containerLoanType);
});
// new bank picked, reset loan type and location selects and hide location
inputBank.addEventListener('keydown', function() {
  inputType.selectedIndex = 0;
  inputLocation.selectedIndex = 0;
  addClass('visually-hidden', containerLocation);
});
