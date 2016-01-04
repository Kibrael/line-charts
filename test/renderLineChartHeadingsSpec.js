require('jasmine-jquery');
var headings = require ('../src/js/modules/renderLineChartHeadings');

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

describe('rendering chart headings', function() {
  beforeEach(function() {
    setFixtures('<hgroup class="padding-top-8"><h3 id="chart-title"></h3><h4 id="chart-desc"></h4></hgroup>');
  });
  it('should render the chart headings', function() {
    headings(json);
    expect(document.getElementById('chart-title')).not.toBeEmpty();
    //expect(document.getElementById('chart-title')).toHaveText('Bank Name');
    expect(document.getElementById('chart-desc')).not.toBeEmpty();
    //expect(document.getElementById('chart-desc')).toHaveText('Bank description');
  });
});
