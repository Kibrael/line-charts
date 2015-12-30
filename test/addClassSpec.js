require('jasmine-jquery');
var addClass = require ('../src/js/modules/addClass');

describe('adding a class', function() {
  beforeEach(function() {
    setFixtures('<div class="toggle"></div>');
  });
  it('should add a class to .toggle', function() {
    addClass(document.querySelector('.toggle'), 'active');
    expect(document.querySelector('.toggle')).toHaveClass('active');
  });
});
