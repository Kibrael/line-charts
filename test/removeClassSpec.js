require('jasmine-jquery');
var remove = require ('../src/js/removeClass');

describe('removing a class', function() {
  var removeFrom;

  beforeEach(function() {
    setFixtures('<div class="toggle active" id="remove"></div>');
    removeFrom = document.getElementById('remove');
    remove('active', removeFrom);
  });

  it('should not have class .active', function() {
    expect(removeFrom).not.toHaveClass('active');
  });
});
