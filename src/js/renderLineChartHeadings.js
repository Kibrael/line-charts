require('./utils/capitalizeFirstLetters');

function renderLineChartHeadings(name, type, location) {
  var chartBank = document.getElementById('chart-bank');
  var chartType = document.getElementById('chart-type');
  var chartLocation = document.getElementById('chart-location');

  chartBank.innerText = name;
  chartType.innerText = type;

  if (location === 'nationwide') {
    location = 'Nationwide'
  } else {
    location = location.toUpperCase();
  }
  chartLocation.innerText = location;
}

module.exports = renderLineChartHeadings;
