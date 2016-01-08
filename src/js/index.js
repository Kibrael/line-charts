var get = require ('./getJSON');
var check = require ('./checkStatusCode');
var line = require('./renderLineChart');
var headings = require('./renderLineChartHeadings');
var removeClass = require('./removeClass');
var removeAll = require('./removeClassAll');
var addClass = require('./addClass');
var buildURL = require('./buildURL');

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

var chartData;

String.prototype.capitalizeFirstLetters = function() {
  var pieces = this.split(" ");
  for (var i = 0; i < pieces.length; i++) {
    var j = pieces[i].charAt(0).toUpperCase();
    pieces[i] = j + pieces[i].substr(1);
  }
  return pieces.join(" ");
}

get('data/banks.json', fillBanks);

function createChart(urlParts) {
  inputBank.value = urlParts.params.bank.replace(/-/g, ' ').capitalizeFirstLetters();
  inputType.value = urlParts.params.type;
  inputLocation.value = urlParts.params.location.toUpperCase();
  chartData = urlParts.params.data;

  var pathParts = [];
  pathParts.push(urlParts.params.bank);
  pathParts.push(urlParts.params.type);
  pathParts.push(urlParts.params.location);

  removeClass('visually-hidden', containerLoanType);
  removeClass('visually-hidden', containerLocation);
  removeClass('visibility-hidden', containerHeading);
  removeClass('visually-hidden', containerToggles);

  headings(inputBank.value, inputType.value.replace(/-/g, ' ').capitalizeFirstLetters(), inputLocation.value);

  get(buildURL(pathParts), jsonCallback);
}

router.get(':bank/:type/:location', function(req) {
  createChart(req);
});

// route for toggles
router.get(':bank/:type/:location/:data', function(req) {
  // use currentData if it's available, user has been using the tool
  if (currentData) {
    line(currentData, req.params.data);
  } else { // allow URLs to be shared
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
    // saved to use for toggles
    // don't need to reload json on a toggle
    currentData = json;
    line(json, chartData);
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

inputLocation.addEventListener('change', function() {
  location.hash = inputBank.value.replace(/ /g, '-').toLowerCase()
    + '/'
    + inputType.value.replace(/ /g, '-').toLowerCase()
    + '/'
    + inputLocation.value.replace(/ /g, '-').toLowerCase();
});
