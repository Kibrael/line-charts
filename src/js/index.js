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

function createChart(urlParts) {
  // set input values in case of a shared URL
  inputBank.value = urlParts.params.bank.replace(/-/g, ' ').capitalizeFirstLetters();
  inputType.value = urlParts.params.type;
  inputLocation.value = urlParts.params.location.toUpperCase();

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

  headings(inputBank.value, inputType.value.replace(/-/g, ' ').capitalizeFirstLetters(), inputLocation.value);

  get(buildURL(pathParts), callbacks.jsonCallback);
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
  get('data/bank/type/state/data.json', callbacks.jsonCallback);
});

get('data/banks.json', callbacks.fillBanks);
