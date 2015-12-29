var get = require ('./modules/getJSON');
var check = require ('./modules/checkStatusCode');
var line = require('./modules/renderLineChart');

get('data/bank/type/state/data.json', testing);

function testing(response) {
  if (check(response.statusCode)) {
    var json = JSON.parse(response.text);
    console.log(json);
    line(json);
  } else {
    console.log(response.statusCode)
  }
}
