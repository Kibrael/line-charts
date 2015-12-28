var Ajax = require('simple-ajax');

function getJSON(path) {
  var ajax = new Ajax({
    url: path,
    method: 'GET'
  });

  ajax.on('success', function(event) {
    console.log('success', event);
    return event;
  });

  ajax.on('error', function(event) {
    console.log('error', event);
    return event;
  });

  ajax.on('complete', function(event) {
    console.log('complete', event);
    return event;
  });
}

module.exports = getJSON;
