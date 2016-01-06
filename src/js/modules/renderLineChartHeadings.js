function renderLineChartHeadings(name, type, location) {
  var title = document.getElementById('chart-title');
  var desc = document.getElementById('chart-desc');
  title.innerText = name;
  desc.innerText = type + ' loans in ' + location;
}

module.exports = renderLineChartHeadings;
