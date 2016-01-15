var c3 = require('c3');
var chart;
function setYLabel(key) {
  var label = 'Count';
  if (key === 'loan_amount') {
    label = 'Application amount in thousands';
  }

  return label;
}

function setColors(value) {
  var colors = {};
  colors[value] = '#FFFFFF';

  return colors;
}

function renderChart(json, value) {
  value = typeof value !== 'undefined' ? value : 'count';
  if (chart) {
    console.log('test');
    console.log(json.data.years);
    console.log(value);
    chart.load({
      json: json.data.years,
      keys: {
        x: 'year',
        value: [value]
      },
      colors: setColors(value),
      /*data: {
        type: 'area',
        json: json.data.years,
        colors: setColors(value),
        keys: {
          x: 'year',
          value: [value]
        }
      }*/
      unload: true
    });
  } else {
    console.log(json.data.years);
    chart = c3.generate({
      bindto: '#chart',
      transition: {
        duration: 500
      },
      padding: {
        top: 10,
        right: 15,
      },
      data: {
        type: 'area',
        json: json.data.years,
        colors: setColors(value),
        keys: {
          x: 'year',
          value: [value]
        }
      },
      grid: {
        /*x: {
          show: true
        },*/
        y: {
          show: true
        }
      },
      axis: {
        x: {
          padding: {
            left: .1,
            right: .1
          },
          label: {
            position: 'outer-center',
            text: 'Year'
          }
        },
        y: {
          padding: {
            top: 10,
            bottom: 0
          },
          min: 0,
          label: {
            position: 'outer-middle',
            text: setYLabel(value)
          },
          tick: {
            format: function (d) { return d.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            }
          }
        }
      },
      legend: {
        show: false
      }
    });
  }
}

module.exports = renderChart;
