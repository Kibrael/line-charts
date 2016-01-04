function removeClassAll(cssClass, selector) {
  var toggles = document.querySelectorAll(selector);
  for (var i = 0; i < toggles.length; i++) {
    toggles[i].classList.remove(cssClass);
  }
}

module.exports = removeClassAll;
