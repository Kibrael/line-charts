var toggle = require('../src/js/modules/toggleChart');

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

describe('toggling a chart', function() {
  beforeEach(function() {
    setFixtures('<div id="chart"></div><a class="js-toggle" data-data="count" href="#" id="toggle-count">Count</a> and <a class="js-toggle" data-data="loan_amount" href="#" id="toggle-loan-amount">Loan Amount</a>');
  });
  
  it('should render a chart (with default of count)', function() {
    var tCount = document.getElementById('toggle-count');
    tCount.addEventListener('click', function() {
      toggle(json, this);
    });
    var spyEvent = spyOnEvent(tCount, 'click');
    var evObj = document.createEvent('Events');
    evObj.initEvent('click', true, false);

    tCount.dispatchEvent(evObj);

    expect('click').toHaveBeenTriggeredOn(tCount)
    expect(spyEvent).toHaveBeenTriggered();
    expect(document.getElementById('chart')).not.toBeEmpty();
    expect(document.querySelector('.c3-axis-y-label')).toHaveText('Count');
  });
});
