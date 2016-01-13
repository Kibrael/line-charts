var get = require ('./getJSON');
var check = require ('./checkStatusCode');
var line = require('./renderLineChart');
var headings = require('./renderLineChartHeadings');
var removeClass = require('./removeClass');
var removeAll = require('./removeClassAll');
var addClass = require('./addClass');
var buildURL = require('./buildURL');

require('awesomplete');
require('./utils/capitalizeFirstLetters');
require('./eventListeners/inputBank');
require('./eventListeners/inputType');
require('./eventListeners/inputLocation');
require('./eventListeners/chartToggles');

var Grapnel = require('grapnel');
var router = new Grapnel();

var inputBank = document.getElementById('bank-name');
var inputType = document.getElementById('loan-type');
var inputLocation = document.getElementById('bank-location');
var containerLoanType = document.getElementById('container-loan-type');
var containerLocation = document.getElementById('container-bank-location');
var containerToggles = document.getElementById('container-toggles');
var containerHeading = document.getElementById('container-heading');

var chartType;
var currentData;

window.callbacks = {};

callbacks.jsonCallback = function(response) {
  if (check(response.statusCode)) {
    var json = JSON.parse(response.text);
    // saved to use for toggles
    // don't need to reload json on a toggle
    currentData = json;
    line(json, chartType);
  } else {
    addClass('visually-hidden', containerToggles);
    addClass('visibility-hidden', containerHeading);
    document.getElementById('chart').innerHTML = '<h3>Sorry, we couldn\'t find that data.</h3>';
  }
}

callbacks.fillBanks = function(response) {
  var json = JSON.parse(response.text);
  new Awesomplete(inputBank, {
    list: json.financialInstitutionNames
  });
}

callbacks.fillLocations = function(response) {
  // remove existing options
  inputLocation.innerHTML = '';

  var urlHash = location.hash.split('/');
  var locationHash = urlHash[2];

  var option = document.createElement('option');
  option.text = 'Choose a location';
  option.value = 'choose';
  inputLocation.add(option);

  var option2 = document.createElement('option');
  option2.text = 'Nationwide';
  option2.value = 'nationwide';
  if (locationHash === 'nationwide') {
    option2.selected = true;
  }
  inputLocation.add(option2);

  if (check(response.statusCode)) {
    var json = JSON.parse(response.text);
    for (var i = 0; i < json.states.length; i++) {
      var option = document.createElement('option');
      option.text = json.states[i].toUpperCase();
      option.value = json.states[i];
      if (locationHash === json.states[i]) {
        option.selected = true;
      }
      inputLocation.add(option);
    }
  }

  if (urlHash[2]) {
    inputLocation.value = urlHash[2];
  } else {
    inputLocation.value = 'choose';
  }
}

function createChart(urlParts) {
  // set input values in case of a shared URL
  inputBank.value = urlParts.params.bank.replace(/-/g, ' ').capitalizeFirstLetters();
  inputType.value = urlParts.params.type;
  inputLocation.value = urlParts.params.location;

  // save the type of chart (eg count or loan_amount)
  // for use in callback, tells which one to render
  chartType = urlParts.params.data;

  var pathParts = [];
  pathParts.push(urlParts.params.bank);
  pathParts.push(urlParts.params.type);
  pathParts.push(urlParts.params.location);

  removeClass('visually-hidden', containerLoanType);
  removeClass('visually-hidden', containerLocation);
  removeClass('visibility-hidden', containerHeading);
  removeClass('visually-hidden', containerToggles);

  get(buildURL(pathParts), callbacks.jsonCallback);
}

router.get(':bank', function(req) {
  inputBank.value = req.params.bank.replace(/-/g, ' ').capitalizeFirstLetters();
  // TODO: get data for types and fill the types dropdown
  removeClass('visually-hidden', containerLoanType);
});

router.get(':bank/:type', function(req) {
  inputBank.value = req.params.bank.replace(/-/g, ' ').capitalizeFirstLetters();
  inputType.value = req.params.type;
  removeClass('visually-hidden', containerLoanType);
  removeClass('visually-hidden', containerLocation);
  get('data/' + req.params.bank + '/' + req.params.type + '/statewide/locations.json', callbacks.fillLocations);
});

router.get(':bank/:type/:location', function(req) {
  if (inputLocation.options.length === 0) {
    get('data/' + req.params.bank + '/' + req.params.type + '/statewide/locations.json', callbacks.fillLocations);
  } else {
    inputLocation.value = req.params.location;
  }

  createChart(req);
  headings(req.params.bank.replace(/-/g, ' ').capitalizeFirstLetters(), req.params.type.replace(/-/g, ' ').capitalizeFirstLetters(), req.params.location);
});

// route for toggles
router.get(':bank/:type/:location/:data', function(req) {
  // use currentData if it's available, user has been using the tool
  if (currentData) {
    line(currentData, req.params.data);
  } else { // allow URLs to be shared
    if (inputLocation.options.length === 0) {
      get('data/' + req.params.bank + '/' + req.params.type + '/statewide/locations.json', callbacks.fillLocations);
    } else {
      inputLocation.value = req.params.location;
    }
    createChart(req);
    headings(req.params.bank.replace(/-/g, ' ').capitalizeFirstLetters(), req.params.type.replace(/-/g, ' ').capitalizeFirstLetters(), req.params.location);
  }
});

// the default view
// should decide on showing something more relevant
router.get('', function(req) {
  //get('data/all/All/nationwide/data.json', callbacks.jsonCallback);
});

get('data/fi.json', callbacks.fillBanks);
