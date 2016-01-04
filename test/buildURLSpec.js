var buildURL = require ('../src/js/modules/buildURL');

describe('removing a class', function() {
  jasmine.getFixtures().fixturesPath = 'test/fixtures';
  var path;
  var name, location, type;
  var pathParts = [];

  beforeEach(function(){
    loadFixtures('form.html');
    name = document.getElementById('bank-name').value;
    type = document.getElementById('loan-type').value;
    location = document.getElementById('bank-location').value;
    pathParts = [];
  });

  it('path should be set for a state', function() {
    pathParts.push(name);
    pathParts.push(type);
    pathParts.push(location);
    path = buildURL(pathParts);
    expect(path).toMatch('data/bank-name/sales/statewide/al/data.json');
  });

  it('path should be set for all', function() {
    pathParts.push(name);
    pathParts.push(type);
    pathParts.push('nationwide');
    path = buildURL(pathParts);
    expect(path).toMatch('data/bank-name/sales/nationwide/data.json');
  });
});
