var get = require ('./modules/getJSON');
var check = require ('./modules/checkStatusCode');
var line = require('./modules/renderLineChart');

get('data/bank/type/state/data.json', testing);

function testing(response) {
  if (check(response.statusCode)) {
    var json = JSON.parse(response.text);
    var config = {
      bindto: '#chart',
      data: {
        type: json.type,
        json: json.data.years,
        colors: {
          count: '#2CB34A'
        },
        keys: {
          x: 'year',
          value: ['count']
        }
      },
      axis: {
        x: {
          label: {
            position: 'outer-center',
            text: 'Year'
          }
        },
        y: {
          label: {
            position: 'outer-middle',
            text: 'Count'
          }
        }
      },
      legend: {
          show: false
      }
    };
    line(config);
  } else {
    console.log(response.statusCode)
  }
}
