// ! ***********************************
const dotenv = require('dotenv');
dotenv.config({ path: `./config.env` });
const express = require('express');
var app = require('express')();
const runCluster = require('./methodes/Cluster');
var cors = require('cors');
var http = require('http').Server(app);
global.io = require('socket.io')(http);
var port = process.env.PORT || 3000;
const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');
const scrapRouter = require('./routes/scrapRoutes');
const Task = require('./models/taskModel');
const PremiumProx = require('./methodes/PremiumProx');

app.use(express.json({ limit: '50mb' }));

var schedule = require('node-schedule');

// ! App Middleware
app.use(cors());

app.get('/', (req, res) => {
  res.send({
    message: 'Hi man women 3!!'
  });
});
const timer = ms => new Promise(res => setTimeout(res, ms));

// var j = schedule.scheduleJob('*/5 * * * * *', async function() {
//   const task = await Task.find({
//     status: { $ne: 'running' } && { $ne: 'finished' }
//   });
//   if (task.length >= 1) {
//     console.log(
//       'No Task running right now, now the Queued ones will be executed!',
//       new Date().toISOString()
//     );
//     console.log(task);
//     //! execute task with that ID
//     await PremiumProx(
//       task._id,
//       task.keywordToFocus,
//       task.websites,
//       task.clickForEachWebsite,
//       task.proxyCountry,
//       'Desktop',
//       task.googleCountry
//     );
//   } else {
//     console.log('A task is running right now', new Date().toISOString());
//   }
// });

app.use('/api', scrapRouter);

http.listen(port, function() {
  console.log('listening on *:' + port);
});
