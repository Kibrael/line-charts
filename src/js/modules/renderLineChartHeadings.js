var title = document.getElementById('chart-title');
var desc = document.getElementById('chart-desc');

function renderLineChartHeadings(json) {
  title.innerText = json.bank;
  desc.innerText = json.description;
}

module.exports = renderLineChartHeadings;
