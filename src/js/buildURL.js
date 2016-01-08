function replaceSpace(string) {
  return string.replace(/ /g, '-');
}

function toLower(string) {
  return string.toLowerCase();
}

function buildURL(pathParts) {
  var path = 'data/';
  for (var i = 0; i < pathParts.length; i++) {
    if (i === 2) {
      if (toLower(pathParts[i]) !== 'nationwide') {
        path = path + 'statewide/';
      }
    }
    path = path + toLower(replaceSpace(pathParts[i])) + '/';
  }
  path = path + 'data.json';

  return path;
}

module.exports = buildURL;
