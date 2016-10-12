const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// Nodemailer
const nodemailer = require('nodemailer');
const emailConfig = require('./.config.js');
const transporter = nodemailer.createTransport('SMTP', {
  service: "Gmail",
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass
  }
});

app.set('port', 8082);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  console.log('got a request to the server root');
  res.sendFile(__dirname + '/view/email-form.html');
});

app.post('/', function(req, res) {
  console.log('Receives post request');
  console.log(req.body);
  var mailOptions = {
    to: req.body.to,
    from: 'carlosmelcon1993@gmail.com',
    subject: req.body.subject,
    html: req.body.message
  };
  transporter.sendMail(mailOptions, function(err, info){
    if (err) return res.status(500).send(err.message);
    res.send("Email sent: " + info);
  });
});

app.listen(app.get('port'), function() {
  console.log('Server listening at '+app.get('port'));
});
