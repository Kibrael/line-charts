require('jasmine-jquery');
var headings = require ('../src/js/renderLineChartHeadings');

describe('rendering chart headings', function() {
  beforeEach(function() {
    setFixtures('<h6 class="margin-bottom-0">Financial Institution</h6><h1 id="chart-bank"></h1><h6 class="margin-top-8 margin-bottom-0">Application Type</h6><h1 id="chart-type"></h1><h6 class="margin-top-8 margin-bottom-0">Location</h6><h1 id="chart-location"></h1>');
  });
  it('should render the chart headings', function() {
    headings('Bank Name', 'Single Family', 'AK');
    expect(document.getElementById('chart-bank')).not.toBeEmpty();
    expect(document.getElementById('chart-bank')).toHaveText('Bank Name');
    expect(document.getElementById('chart-type')).not.toBeEmpty();
    expect(document.getElementById('chart-type')).toHaveText('Single Family');
    expect(document.getElementById('chart-location')).not.toBeEmpty();
    expect(document.getElementById('chart-location')).toHaveText('AK');
  });
});
