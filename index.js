/* eslint-disable no-console */
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

const express = require('express');
const ajaxResquest = require('request');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 8080;
const app = express();
const toneUsername= "apikey";
const tonePassword= "DXnguc0TPIbu5laENNgnNUoOaAUXgb1zErUN_KqMHqGc";
const toneUrl = "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21";

var toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  iam_apikey: 'DXnguc0TPIbu5laENNgnNUoOaAUXgb1zErUN_KqMHqGc',
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21'
});

var LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3');

var languageTranslator = new LanguageTranslatorV3({
    version: '2018-05-01',
    iam_apikey: 'oM_wgsnP-pbQj8_hM5oUZJQH_KwHT657WhlO69Eler0I',
    url: 'https://gateway.watsonplatform.net/language-translator/api'
  });
app.use("/dist", express.static(__dirname + '/dist'));

app.use(bodyParser.json());

app.get('/', function (request, response) {
 response.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/toner', function (request, response) {

  var parameters = {
    text: request.query.data,
    model: 'en-us',
    source: 'pt-br',
    target: 'en-us'
  };
  languageTranslator.translate(
    parameters,
    function(error, response) {
      if (error)
      console.log(error)
      else{
        //console.log(JSON.stringify(response, null, 2));
        const texto = JSON.stringify(response.translations[0].translation, null, 2);
        analyse(texto);
      }

    }
  );
    function analyse(texto){
      var toneParams = {
        tone_input: { 'text': texto },
        content_type: 'application/json',
        accept_language: 'pt-br'
      };

      toneAnalyzer.tone(toneParams, function(error, toneAnalysis){
        if(error){
          console.log(error)
        }
        else{
          let emojis = []
          const tons = toneAnalysis.document_tone.tones;
          //console.log(JSON.stringify(toneAnalysis, null, 2));
          let i;
          /*for(i=0;i<tons.length; i++){
            if(tons[i].tone_id == )
          }*/
          response.send(toneAnalysis.document_tone.tones);
        }
      })
    }

  })

app.listen(PORT);

console.log("server started on PORT " + PORT);
