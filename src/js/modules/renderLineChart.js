var c3 = require('c3');

function setYLabel(key) {
  var label = 'Count';
  if (key === 'loan_amount') {
    label = 'Loan Amount';
  }

  return label;
}

function renderChart(json, value) {
  value = typeof value !== 'undefined' ? value : 'count';

  c3.generate({
    bindto: '#chart',
    data: {
      type: json.type,
      json: json.data.years,
      colors: {
        count: '#2CB34A'
      },
      keys: {
        x: 'year',
        value: [value]
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
          text: setYLabel(value)
        }
      }
    },
    legend: {
      show: false
    }
  });
}

module.exports = renderChart;
