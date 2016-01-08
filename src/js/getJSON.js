var request = require('superagent');

function getJSON(path, cb) {
  request.get(path, function(err, res) {
    cb(res);
  });
}

module.exports = getJSON;
