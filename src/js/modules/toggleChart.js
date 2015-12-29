var line = require('./renderLineChart');
var remove = require('./removeClassAll');
var add = require('./addClass');

function toggleChart(json, element) {
  remove('.js-toggle', 'active');
  add(element, 'active');
  line(json, element.getAttribute('data-data'));
}

module.exports = toggleChart;
