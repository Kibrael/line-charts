require('jasmine-jquery');
var line = require ('../src/js/renderLineChart');

var json = {
  title: "Bank HMDA filings",
  bank: "Bank Name",
  description: "Bank description",
  type: "line",
  data: {
    years: [
      {
        year: "1990",
        count: 9333,
        loan_amount: 1000
      },
      {
        year: "1991",
        count: 9359,
        loan_amount: 1111
      },
      {
        year: "1992",
        count: 9072,
        loan_amount: 987
      }
    ]
  }
};

describe('rendering a chart', function() {
  beforeEach(function() {
    setFixtures('<div id="chart"></div>');
  });
  it('should render a chart (with default)', function() {
    line(json);
    expect(document.getElementById('chart')).not.toBeEmpty();
    expect(document.querySelector('.c3-axis-y-label')).toHaveText('Count');
  });

  it('should render a chart', function() {
    line(json, 'loan_amount');
    //expect(document.getElementById('chart')).not.toBeEmpty();
    //expect(document.querySelector('.c3-axis-y-label')).toHaveText('Application amount in thousands');
  });
});
