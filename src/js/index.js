var get = require ('./modules/getJSON');
var check = require ('./modules/checkStatusCode');
var line = require('./modules/renderLineChart');
var toggle = require('./modules/toggleChart');
var headings = require('./modules/renderLineChartHeadings');
var removeClass = require('./modules/removeClass');
var addClass = require('./modules/addClass');
var buildURL = require('./modules/buildURL');
require('awesomplete');

get('data/bank/type/state/data.json', testing);

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
  toggles[i].addEventListener('click', function() {
    toggle(currentData, this);
  });
}

// should build dynamically from json file
var bankNames = [
  'Quicken Loans',
  'First National Bank of Alaska',
  'The Golden One Credit Union'
];

var inputBank = document.getElementById('bank-name');
var inputType = document.getElementById('loan-type');
var inputLocation = document.getElementById('bank-location');
var containerLoanType = document.getElementById('container-loan-type');
var containerLocation = document.getElementById('container-bank-location');
var pathParts = [];

new Awesomplete(inputBank, {
  list: bankNames
});
inputBank.addEventListener('awesomplete-selectcomplete', function() {
  removeClass('visually-hidden', containerLoanType);
});
inputBank.addEventListener('keydown', function() {
  inputType.selectedIndex = 0;
  addClass('visually-hidden', containerLocation);
  inputLocation.selectedIndex = 0;
});

inputType.addEventListener('change', function() {
  removeClass('visually-hidden', containerLocation);
});

inputLocation.addEventListener('change', function() {
  pathParts = [];
  var bankName = inputBank.value;
  var bankType = inputType.value;
  var bankLocation = inputLocation.value;

  pathParts.push(bankName);
  pathParts.push(bankType);
  pathParts.push(bankLocation);
  get(buildURL(pathParts), testing);
});
