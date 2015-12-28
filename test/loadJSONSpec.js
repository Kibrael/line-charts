var getJSON = require ('../src/js/modules/getJSON');

describe('load json', function() {
  it('should load json', function() {
    json = getJSON('test/data/bank/type/al/data.json');

    expect(json.not.toBe(null));
  });
});
