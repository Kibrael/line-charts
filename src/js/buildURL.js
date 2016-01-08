function buildURL(pathParts) {
  var path = 'data/';
  for (var i = 0; i < pathParts.length; i++) {
    if (i === 2) {
      if (pathParts[i].toLowerCase() !== 'nationwide') {
        path = path + 'statewide/';
      }
    }
    path = path + pathParts[i].replace(/ /g, '-').toLowerCase() + '/';
  }
  path = path + 'data.json';

  return path;
}

module.exports = buildURL;
