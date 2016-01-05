var get = require ('./modules/getJSON');
var check = require ('./modules/checkStatusCode');
var line = require('./modules/renderLineChart');
var toggle = require('./modules/toggleChart');
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
  for ( var i = 0; i < pieces.length; i++ )
  {
      var j = pieces[i].charAt(0).toUpperCase();
      pieces[i] = j + pieces[i].substr(1);
  }
  return pieces.join(" ");
}

router.get(':bank/:type/:location', function(req) {
  inputBank.value = req.params.bank.replace(/-/g, ' ').capitalizeFirstLetter();
  inputType.value = req.params.type;
  inputLocation.value = req.params.location.toUpperCase();

  pathParts = [];
  pathParts.push(req.params.bank);
  pathParts.push(req.params.type);
  pathParts.push(req.params.location);

  removeClass('visually-hidden', containerLoanType);
  removeClass('visually-hidden', containerLocation);

  get(buildURL(pathParts), testing);
});

router.get(':bank/:type/:location/:data', function(req) {
  if (currentData) {
    line(currentData, req.params.data);
  } else {
    inputBank.value = req.params.bank.replace(/-/g, ' ').capitalizeFirstLetter();
    inputType.value = req.params.type;
    inputLocation.value = req.params.location.toUpperCase();

    pathParts = [];
    pathParts.push(req.params.bank);
    pathParts.push(req.params.type);
    pathParts.push(req.params.location);

    removeClass('visually-hidden', containerLoanType);
    removeClass('visually-hidden', containerLocation);

    get(buildURL(pathParts), testing);
  }
});

// the default view
// should decide on showing something more relevant
router.get('', function(req) {
  get('data/bank/type/state/data.json', testing);
});

var currentData;

function testing(response) {
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
    //console.log(currentData);
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
inputBank.addEventListener('awesomplete-selectcomplete', function() {
  removeClass('visually-hidden', containerLoanType);

  //location.hash = inputBank.value.replace(/ /g, '-').toLowerCase();
});
inputBank.addEventListener('keydown', function() {
  inputType.selectedIndex = 0;
  inputLocation.selectedIndex = 0;
  addClass('visually-hidden', containerLocation);
});

inputType.addEventListener('change', function() {
  if (inputLocation.selectedIndex !== 0) {
    pathParts = [];
    var bankName = inputBank.value;
    var bankType = inputType.value;
    var bankLocation = inputLocation.value;

    pathParts.push(bankName);
    pathParts.push(bankType);
    pathParts.push(bankLocation);
    get(buildURL(pathParts), testing);
    location.hash = inputBank.value.replace(/ /g, '-').toLowerCase() + '/' + inputType.value.replace(/ /g, '-').toLowerCase() + '/' + inputLocation.value.replace(/ /g, '-').toLowerCase();
  }
  removeClass('visually-hidden', containerLocation);
  //location.hash = '/' + inputBank.value.replace(/ /g, '-').toLowerCase() + '/' + inputType.value.replace(/ /g, '-').toLowerCase();
});

inputLocation.addEventListener('change', function() {
  location.hash = inputBank.value.replace(/ /g, '-').toLowerCase() + '/' + inputType.value.replace(/ /g, '-').toLowerCase() + '/' + inputLocation.value.replace(/ /g, '-').toLowerCase();
});
