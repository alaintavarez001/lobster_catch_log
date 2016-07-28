var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var lobsters = [];
var id = 0;

app.get('/lobsters', function(req, res){
  res.json(lobsters);
});

app.get('/lobsters/:id', function(req, res) {
  var lobster = _.find(lobsters, {id: req.params.id});
  res.json(lobster || {});
});

app.post('/lobsters', function(req, res) {
  var lobster = req.body;
  id++;
  lobster.id= id + '';

  lobsters.push(lobster);

  res.json(lobster);
});

app.put('/lobsters/:id', function(req, res) {
  console.log(req)
  var update = req.body;
  if (update.id) {
    delete update.id
  }

  var lobster = _.findIndex(lobsters, {id: req.params.id});

  if (!lobsters[lobster]) {
    res.send();
  } else {
    var updatedlobster = _.assign(lobsters[lobster], update);
    res.json(updatedlobster);
  }
});

app.delete('/lobsters/:id', function(req, res) {
  var lobster = _.findIndex(lobsters, {id: req.params.id});

  if (!lobsters[lobster]) {
    res.send();
  } else {
    var deletedlobster = lobsters[lobster];
    lobsters.splice(lobsters, 1);
    res.json(deletedlobster);
  }
});

app.listen(3000);
console.log('on port 3000');
