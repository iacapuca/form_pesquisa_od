const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('express-formidable');
const time = require('express-timestamp')
const app = express();
const path = require('path');
const nodemailer = require('nodemailer');
const converter = require('json-2-csv');


app.set('port', (process.env.PORT || 3000));
app.use(time.init);


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));

});
app.use("/js", express.static(__dirname + '/js'));
app.use("/images", express.static(__dirname + '/images'));
app.use("/styles", express.static(__dirname + '/styles'));


app.use(formidable());


// for parsing multipart/form-data
app.use(express.static('public'));

app.post('/', function(req, res) {
  let data = req.fields;
  var json2csvCallback = function (err, csv) {
    if (err) throw err;
    console.log(csv);
};

converter.json2csv(data, json2csvCallback);
  console.log(data);
  res.header("Content-Disposition", "attachment;filename=" + req.timestamp.tz("America/Sao_Paulo").format() + ".csv");
  res.type("text/csv");
  res.status(200).send(Object.values(req.fields));

});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
