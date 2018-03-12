const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('express-formidable');
const time = require('express-timestamp')
const app = express();
const path = require('path');
const nodemailer = require('nodemailer');
const converter = require('json-2-csv');
const os = require('os');
const fs = require('fs');



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
  var json2csvCallback = function(err, csv) {
    if (err) throw err;

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Mensagem Enviada: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });

  };

  const output = `
  <p><b>Hostname:</b>${os.hostname()}</p>
  <p><b>Filename:</b>${req.timestamp.tz("America/Sao_Paulo").format()}</p>
  <p>${Object.values(req.fields)}</p>`;

  const csvbuilder = `${Object.values(req.fields)}`;

  converter.json2csv(data, json2csvCallback);
  res.header("Content-Disposition", "attachment;filename=" + req.timestamp.tz("America/Sao_Paulo").format() + ".csv");
  res.type("text/csv");
  res.status(200).send(Object.values(req.fields));

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'ameciclo@gmail.com',
      clientId: '620335039624-9rklbrm5g2gs2gqe77bhd9vc68hkkbbn.apps.googleusercontent.com',
      clientSecret: 'UpAeX0YZKvjVzk4EjWysFYqw',
      refreshToken: '1/bIF23qeYfEGokBt5Ln8KO0JJhZdGwWZiOnwrDy81JGk',
      accessToken: 'ya29.Glt7Bbxv24fsksAdDckdEGthtnK1d7tbekKQCgK-PXumhXfqrOqes_v3uc1DUrHD5M1gCV3mGKjDj6v6qRLg-BYtjD4iTZasBUNK-vuqCDUHUJ2yuQI5MiqlV65S',
    },
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Pesquisa OD da Ameciclo" <ameciclo@gmail.com>', // sender address
    to: 'iacapuca@gmail.com, dvalenca@gmail.com', // list of receivers
    subject: 'Nova resposta a pesquisa OD!', // Subject line
    html: output,
    attachments: [{
      filename: 'Resultado da Pesquisa OD.csv',
      content: csvbuilder
    }]
  };


});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
