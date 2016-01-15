var inputLocation = document.getElementById('bank-location');
var inputBank = document.getElementById('bank-name');
var inputType = document.getElementById('loan-type');

window.addEventListener('keydown', checkKey, false);

function checkKey(e) {
  if (e.keyCode === 39 || e.keyCode === 37 || e.keyCode === 190 || e.keyCode === 188) {
    var urlParts = location.hash.split('/');
    var locationIndex;
    for (var i = 0; i < inputLocation.length; i++) {
      if(inputLocation.options[i].value === urlParts[2]) {
        locationIndex = i;
      }
    }
    var newLocation = urlParts[2];

    var typeIndex;
    for (var i = 0; i < inputType.length; i++) {
      if(inputType.options[i].value === urlParts[1]) {
        typeIndex = i;
      }
    }
    var newType = urlParts[1];

    if (e.keyCode === 39) { // right arrow
      if(inputLocation.selectedIndex+1 !== inputLocation.length) {
        locationIndex = inputLocation.selectedIndex+1;
      } else {
        locationIndex = 1;
      }
    }

    if (e.keyCode === 37) { // left arrow
      if(inputLocation.selectedIndex === 1) {
        locationIndex = inputLocation.length-1;
      } else {
        locationIndex = inputLocation.selectedIndex-1;
      }
    }

    if (e.keyCode === 190) { // period
      if(inputType.selectedIndex+1 !== inputType.length) {
        typeIndex = inputType.selectedIndex+1;
      } else {
        typeIndex = 1;
      }
    }

    if (e.keyCode === 188) { // comma
      if(inputType.selectedIndex === 1) {
        typeIndex = inputType.length-1;
      } else {
        typeIndex = inputType.selectedIndex-1;
      }
    }

    newLocation = inputLocation.options[locationIndex].value;
    newType = inputType.options[typeIndex].value;

    var newHash = inputBank.value.replace(/ /g, '-').toLowerCase()
      + '/'
      + newType.replace(/ /g, '-').toLowerCase()
      + '/'
      + newLocation.replace(/ /g, '-').toLowerCase();
    console.log(newHash);
    if (urlParts[3]) {
      newHash = newHash + '/' + urlParts[3];
    }
    console.log(newHash);

    location.hash = newHash;
  }
}
