var inputBank = document.getElementById('bank-name');
var inputType = document.getElementById('loan-type');
var inputLocation = document.getElementById('bank-location');

function replaceSpace(string) {
  return string.replace(/ /g, '-');
}

function toLower(string) {
  return string.toLowerCase();
}

function buildURL() {
  var bankName = inputBank.value;
  var loanType = inputType.value;
  var bankLocation = inputLocation.value;

  return 'data/'
    + toLower(replaceSpace(bankName))
    + '/' + toLower(replaceSpace(loanType))
    + '/' + toLower(replaceSpace(bankLocation))
    + '/data.json';
}

module.exports = buildURL;
