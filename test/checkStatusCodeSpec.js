var check = require ('../src/js/modules/checkStatusCode');

describe('checking status code', function() {
  it('200 = true', function() {
    expect(check(200)).toBeTruthy();
  });
  it('404 = false', function() {
    expect(check(404)).toBeFalsy();
  });
});
