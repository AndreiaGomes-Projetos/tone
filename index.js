/* eslint-disable no-console */
const express = require('express');
const ajaxResquest = require('request');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 8080;
const app = express();
const toneUsername= "apikey";
const tonePassword= "DXnguc0TPIbu5laENNgnNUoOaAUXgb1zErUN_KqMHqGc";
const toneUrl = "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21";

app.use("/dist", express.static(__dirname + '/dist'));

app.use(bodyParser.json());

app.get('/', function (request, response) {
 response.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/toner', function (request, response) {
  ajaxResquest.post({
    url: toneUrl,
    json: {
      text: request.query.data,
    },
    auth: {
      user: toneUsername,
      pass: tonePassword
    }
  }, function (err, res, body){
    response.json(body); 
  });
});

app.listen(PORT);
console.log("server started on PORT " + PORT);