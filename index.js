var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var botHandler = require('./botHandler');

var app = express();

var jsonParser = bodyParser.json();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/fbBot', function(req, res) {
  if (req.query['hub.verify_token'] === 'davdSalib1996A19') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

app.post('/fbBot', jsonParser, function (req, res) {
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      botHandler(sender, text, "message");
    } else if (event.postback && event.postback.payload) {
      payload = event.postback.payload;
      console.log(payload);
      payloadSplit = payload.split(":");
      id =  payloadSplit[0];
      action = payloadSplit[1];

      botHandler(sender, {id: id, action: action}, "postback");
    }
  }
  res.sendStatus(200);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
