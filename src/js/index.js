var get = require ('./modules/getJSON');
var check = require ('./modules/checkStatusCode');
var line = require('./modules/renderLineChart');
var headings = require('./modules/renderLineChartHeadings');
var removeClass = require('./modules/removeClass');
var removeAll = require('./modules/removeClassAll');
var addClass = require('./modules/addClass');
var buildURL = require('./modules/buildURL');

require('awesomplete');

var Grapnel = require('grapnel');
var router = new Grapnel();

var inputBank = document.getElementById('bank-name');
var inputType = document.getElementById('loan-type');
var inputLocation = document.getElementById('bank-location');
var containerLoanType = document.getElementById('container-loan-type');
var containerLocation = document.getElementById('container-bank-location');
var pathParts = [];

String.prototype.capitalizeFirstLetter = function() {
  var pieces = this.split(" ");
  for (var i = 0; i < pieces.length; i++) {
    var j = pieces[i].charAt(0).toUpperCase();
    pieces[i] = j + pieces[i].substr(1);
  }
  return pieces.join(" ");
}

function createChart(urlParts) {
  inputBank.value = urlParts.params.bank.replace(/-/g, ' ').capitalizeFirstLetter();
  inputType.value = urlParts.params.type;
  inputLocation.value = urlParts.params.location.toUpperCase();

  pathParts = [];
  pathParts.push(urlParts.params.bank);
  pathParts.push(urlParts.params.type);
  pathParts.push(urlParts.params.location);

  removeClass('visually-hidden', containerLoanType);
  removeClass('visually-hidden', containerLocation);

  get(buildURL(pathParts), jsonCallback);
}

router.get(':bank/:type/:location', function(req) {
  createChart(req);
});

router.get(':bank/:type/:location/:data', function(req) {
  if (currentData) {
    line(currentData, req.params.data);
  } else {
    createChart(req);
  }
});

// the default view
// should decide on showing something more relevant
router.get('', function(req) {
  get('data/bank/type/state/data.json', jsonCallback);
});

var currentData;

function jsonCallback(response) {
  if (check(response.statusCode)) {
    var json = JSON.parse(response.text);
    currentData = json;
    line(json);
    headings(json);
  } else {
    console.log(response.statusCode);
  }
}

var toggles = document.querySelectorAll('.js-toggle');
for (var i = 0; i < toggles.length; i++) {
  toggles[i].addEventListener('click', function(e) {
    removeAll('.js-toggle', 'active');
    addClass('active', this);
    location.hash = inputBank.value.replace(/ /g, '-').toLowerCase() + '/' + inputType.value.replace(/ /g, '-').toLowerCase() + '/' + inputLocation.value.replace(/ /g, '-').toLowerCase() + '/' + this.getAttribute('data-data');
    e.preventDefault();
  });
}

// should build dynamically from json file
var bankNames = [
  'Quicken Loans',
  'First National Bank Alaska',
  'The Golden 1 Credit Union'
];

new Awesomplete(inputBank, {
  list: bankNames
});
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

inputType.addEventListener('change', function() {
  // if a location is already chosen we can set the hash
  if (inputLocation.selectedIndex !== 0) {
    location.hash = inputBank.value.replace(/ /g, '-').toLowerCase() + '/' + inputType.value.replace(/ /g, '-').toLowerCase() + '/' + inputLocation.value.replace(/ /g, '-').toLowerCase();
  }
  removeClass('visually-hidden', containerLocation);
});

inputLocation.addEventListener('change', function() {
  location.hash = inputBank.value.replace(/ /g, '-').toLowerCase() + '/' + inputType.value.replace(/ /g, '-').toLowerCase() + '/' + inputLocation.value.replace(/ /g, '-').toLowerCase();
});
