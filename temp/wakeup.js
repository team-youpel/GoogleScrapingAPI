const cron = require('node-cron');
const express = require('express');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config({ path: `./config.env` });
var cloudinary = require('cloudinary').v2;
const axios = require('axios').default;

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD
  }
});
app = express();

console.warn('START AT:', Date());
// schedule tasks to be run on the server
cron.schedule('*/20 * * * *', function() {
  var now = new Date();
  var pretty = [
    now.getFullYear(),
    '-',
    now.getMonth() + 1,
    '-',
    now.getDate(),
    ' ',
    now.getHours(),
    ':',
    now.getMinutes(),
    ':',
    now.getSeconds()
  ].join('');
  console.log(pretty);
  console.log('Running Cron Job');
  axios
    .get('https://aut5.herokuapp.com/api/runcustomprox')
    .then(function(response) {
      console.log(response.data);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });
});

app.listen(8000);
