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
