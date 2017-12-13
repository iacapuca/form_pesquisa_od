var express = require('express');
var bodyParser = require('body-parser');
const formidable = require('express-formidable');
var app = express();
var path = require('path');

app.set('port', (process.env.PORT || 3000));

app.get('/', function(req, res){
   res.sendFile(path.join(__dirname + '/index.html'));

});
app.use("/js", express.static(__dirname + '/js'));
app.use("/images", express.static(__dirname + '/images'));
app.use("/styles", express.static(__dirname + '/styles'));

app.use(formidable());


// for parsing multipart/form-data
app.use(express.static('public'));

app.post('/', function(req, res){
   console.log(req.fields);
   res.header("Content-Disposition", "attachment;filename="+"teste"+".csv");
    res.type("text/csv");
    res.status(200).send(req.fields);

});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
