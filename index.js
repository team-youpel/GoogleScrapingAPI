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

app.use(express.json({ limit: '50mb' }));
io.emit('process', `Server is UP 👨‍💻`);

// ! App Middleware
app.use(cors());

app.use('/api', scrapRouter);

http.listen(port, function() {
  console.log('listening on *:' + port);
});
