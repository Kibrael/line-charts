function renderLineChartHeadings(name, type, location) {
  var title = document.getElementById('chart-title');
  var desc = document.getElementById('chart-desc');
  var outputLocation = location;
  if (location === 'NATIONWIDE') {
    outputLocation = 'Nationwide';
  }
  title.innerText = name;
  desc.innerText = type + ' loans in ' + outputLocation;
}

module.exports = renderLineChartHeadings;
