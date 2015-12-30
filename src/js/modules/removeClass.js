function removeClass(cssClass, elementId) {
  document.getElementById(elementId).classList.remove(cssClass);
}

module.exports = removeClass;
