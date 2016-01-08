var addClass = require('../addClass');
var removeAll = require('../removeClassAll');

var inputBank = document.getElementById('bank-name');
var inputType = document.getElementById('loan-type');
var inputLocation = document.getElementById('bank-location');
var toggles = document.querySelectorAll('.js-toggle');

// toggles set the hash to use the 4 param router
// defaults to 'count'
for (var i = 0; i < toggles.length; i++) {
  toggles[i].addEventListener('click', function(e) {
    removeAll('.js-toggle', 'active');
    addClass('active', this);
    location.hash = inputBank.value.replace(/ /g, '-').toLowerCase()
      + '/'
      + inputType.value.replace(/ /g, '-').toLowerCase()
      + '/'
      + inputLocation.value.replace(/ /g, '-').toLowerCase()
      + '/'
      + this.getAttribute('data-data');
    e.preventDefault();
  });
}
