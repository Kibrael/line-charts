function renderLineChartHeadings(name, type, location) {
  var title = document.getElementById('chart-title');
  var desc = document.getElementById('chart-desc');
  title.innerText = name;
  var descText = type + ' applications ';
  if (location !== 'nationwide') {
    descText = descText + 'in '
  }
  descText = descText + location;
  desc.innerText = descText;
}

module.exports = renderLineChartHeadings;
