var line = require('./renderLineChart');
var remove = require('./removeClassAll');
var add = require('./addClass');

function toggleChart(json, element) {
  remove('.js-toggle', 'active');
  add('active', element);
  line(json, element.getAttribute('data-data'));
}

module.exports = toggleChart;
