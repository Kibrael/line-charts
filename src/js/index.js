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
  'One',
  'One Bank',
  'Two',
  'Two Bank',
  'Two Bank Inc',
  'My First Bank'
];

var inputBank = document.getElementById('bank-name');
var inputType = document.getElementById('loan-type');
var inputLocation = document.getElementById('bank-location');

new Awesomplete(inputBank, {
  list: bankNames
});
inputBank.addEventListener('awesomplete-selectcomplete', function() {
  removeClass('visually-hidden', 'container-loan-type');
});
inputBank.addEventListener('keydown', function() {
  inputType.value = 'Choose a type';
  addClass(document.getElementById('container-bank-location'), 'visually-hidden');
  inputLocation.value = 'Choose a state';
});

inputType.addEventListener('change', function() {
  removeClass('visually-hidden', 'container-bank-location');
});

inputLocation.addEventListener('change', function() {
  get(buildURL(), testing);
});
