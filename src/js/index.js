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
var containerToggles = document.getElementById('container-toggles');
var containerHeading = document.getElementById('container-heading');

String.prototype.capitalizeFirstLetter = function() {
  var pieces = this.split(" ");
  for (var i = 0; i < pieces.length; i++) {
    var j = pieces[i].charAt(0).toUpperCase();
    pieces[i] = j + pieces[i].substr(1);
  }
  return pieces.join(" ");
}

get('data/banks.json', fillBanks);

function createChart(urlParts) {
  inputBank.value = urlParts.params.bank.replace(/-/g, ' ').capitalizeFirstLetter();
  inputType.value = urlParts.params.type;
  inputLocation.value = urlParts.params.location.toUpperCase();

  var pathParts = [];
  pathParts.push(urlParts.params.bank);
  pathParts.push(urlParts.params.type);
  pathParts.push(urlParts.params.location);

  removeClass('visually-hidden', containerLoanType);
  removeClass('visually-hidden', containerLocation);
  removeClass('visibility-hidden', containerHeading);
  removeClass('visually-hidden', containerToggles);

  headings(inputBank.value, inputType.value.replace(/-/g, ' ').capitalizeFirstLetter(), inputLocation.value);

  get(buildURL(pathParts), jsonCallback);
}

router.get(':bank/:type/:location', function(req) {
  console.log('router 3 ' + inputLocation.value);
  createChart(req);
  console.log('router 3 2nd time ' + inputLocation.value);
});

// route for toggles
router.get(':bank/:type/:location/:data', function(req) {
  console.log('router 4 ' + inputLocation.value);
  // use currentData if it's available, user has been using the tool
  if (currentData) {
    line(currentData, req.params.data);
  } else { // allow URLs to be shared
    createChart(req);
  }

  console.log('router 4 2nd time' + inputLocation.value);
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
    // saved to use for toggles
    // don't need to reload json on a toggle
    currentData = json;
    line(json);
  } else {
    addClass('visually-hidden', containerToggles);
    addClass('visibility-hidden', containerHeading);
    document.getElementById('chart').innerHTML = '<h3>Sorry, we couldn\'t find that data.</h3>';
  }
}

function fillBanks(response) {
  var json = JSON.parse(response.text);
  new Awesomplete(inputBank, {
    list: json.financialInstitutionNames
  });
}

// toggles set the hash to use the 4 param router
// defaults to 'count'
var toggles = document.querySelectorAll('.js-toggle');
for (var i = 0; i < toggles.length; i++) {
  toggles[i].addEventListener('click', function(e) {
    removeAll('.js-toggle', 'active');
    addClass('active', this);
    console.log('toggle ' + inputLocation.value);
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

// should build dynamically from json file
/*var bankNames = [
  'Quicken Loans',
  'First National Bank Alaska',
  'The Golden 1 Credit Union'
];*/

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
    location.hash = inputBank.value.replace(/ /g, '-').toLowerCase()
      + '/'
      + inputType.value.replace(/ /g, '-').toLowerCase()
      + '/'
      + inputLocation.value.replace(/ /g, '-').toLowerCase();
  }
  removeClass('visually-hidden', containerLocation);
});

inputLocation.addEventListener('change', function() {
  console.log(inputLocation.value);
  location.hash = inputBank.value.replace(/ /g, '-').toLowerCase()
    + '/'
    + inputType.value.replace(/ /g, '-').toLowerCase()
    + '/'
    + inputLocation.value.replace(/ /g, '-').toLowerCase();
});
