var express = require('express');
var bodyParser = require('body-parser');
const formidable = require('express-formidable');
var app = express();

app.get('/', function(req, res){
   res.render('form');
});

app.set('view engine', 'pug');
app.set('views', './views');

app.use(formidable());


// for parsing multipart/form-data
app.use(express.static('public'));

app.post('/', function(req, res){
   console.log(req.fields);
   res.header("Content-Disposition", "attachment;filename="+"teste"+".csv");
    res.type("text/csv");
    res.status(200).send(req.fields);

});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');})
