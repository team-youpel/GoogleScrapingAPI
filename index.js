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

var j = schedule.scheduleJob('*/10 * * * * *', async function() {
  const runningTasks = await Task.find({
    status: 'running'
  });
  if (runningTasks.length >= 1) {
    console.log('A task is running right now', new Date().toISOString());
  } else if (runningTasks.length === 0) {
    console.log(
      'No task is running right now, the Queued ones will be executed if are they available!',
      new Date().toISOString()
    );

    const firstQueuedTask = await Task.find({
      status: 'queued'
    });
    console.log(firstQueuedTask);

    if (firstQueuedTask.length >= 1) {
      await PremiumProx(
        firstQueuedTask[0].taskName,
        firstQueuedTask[0]._id,
        firstQueuedTask[0].keywordToFocus,
        firstQueuedTask[0].websites,
        firstQueuedTask[0].clickForEachWebsite,
        firstQueuedTask[0].proxyCountry,
        'Desktop',
        firstQueuedTask[0].googleCountry
      );
    }
  }
  //! execute task with that ID

  // } else {
  //   console.log('No task is running, ', new Date().toISOString());
  //   const queuedTask = await Task.find({
  //     status: 'running'
  //   });
  // }
});

app.use('/api', scrapRouter);

http.listen(port, function() {
  console.log('listening on *:' + port);
});
