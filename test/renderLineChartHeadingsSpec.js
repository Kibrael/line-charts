require('jasmine-jquery');
var headings = require ('../src/js/renderLineChartHeadings');

describe('rendering chart headings', function() {
  beforeEach(function() {
    setFixtures('<hgroup class="padding-top-8"><h3 id="chart-title"></h3><h4 id="chart-desc"></h4></hgroup>');
  });
  it('should render the chart headings', function() {
    headings('Bank Name', 'Single Family', 'AK');
    expect(document.getElementById('chart-title')).not.toBeEmpty();
    expect(document.getElementById('chart-title')).toHaveText('Bank Name');
    expect(document.getElementById('chart-desc')).not.toBeEmpty();
    expect(document.getElementById('chart-desc')).toHaveText('Single Family loans in AK');
  });
});
