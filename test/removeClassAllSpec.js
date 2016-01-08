require('jasmine-jquery');
var remove = require ('../src/js/removeClassAll');

describe('removing a class from all', function() {
  var toggles;

  beforeEach(function() {
    setFixtures('<div class="toggle active"></div><div class="toggle active"></div>');
    remove('active', '.toggle');
    toggles = document.querySelectorAll('.toggle');
  });
  it('should not have class .active', function() {
    for (var i = 0; i < toggles.length; i++) {
      expect(toggles[i]).not.toHaveClass('active');
    }
  });
  it('should have happened twice', function() {
    expect(toggles.length).toBe(2);
  });
});
