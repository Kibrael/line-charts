var getJSON = require ('./modules/getJSON');

getJSON('data/bank/type/al/data.json', testing);

function testing(response) {
  console.log(JSON.parse(response));
}
