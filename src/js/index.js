var get = require ('./modules/getJSON');
var check = require ('./modules/checkStatusCode');
var line = require('./modules/renderLineChart');
var toggle = require('./modules/toggleChart');
require('awesomplete');

get('data/bank/type/state/data.json', testing);

var currentData;

function testing(response) {
  if (check(response.statusCode)) {
    var json = JSON.parse(response.text);
    currentData = json;
    console.log(json);
    line(json);
  } else {
    console.log(response.statusCode)
  }
}

var toggles = document.querySelectorAll('.js-toggle');
for (var i = 0; i < toggles.length; i++) {
  toggles[i].addEventListener('click', function() {
    toggle(currentData, this);
  });
}
