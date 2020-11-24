const PremiumProx = require('../methodes/PremiumProx');
const CustomProx = require('../methodes/CustomProx');
const scrapMod = require('./../models/scrapModel');
const errorsMod = require('./../models/errorsModel');
const bandwidthFun = require('./../bandwidth');
const Task = require('../models/taskModel');

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({}).sort({ _id: 'desc' });
  res.status(201).json({
    status: 'success',
    results: tasks.length,
    data: tasks
  });
};

// ! Scrap with Proxy

const runCustomProx = async (req, res) => {
  keyword = req.body.keyword;
  website = req.body.website;
  proxies = req.body.proxies;
  protocol = req.body.protocol;
  whatMethod = {
    method: 'custom'
  };
  if (!keyword || !website || !req.body.proxies) {
    res.status(500).json({
      success: false,

      message: 'Please, be sure you provide a Website/Keyword/Proxies ...'
    });
  } else {
    res.status(201).json({
      success: true,
      proxy: req.body.proxies,
      message: 'The process is starting...'
    });
    await CustomProx(keyword, website, req.body.proxies, protocol);
  }
};

// ! Scrap with Premium Proxy

const runPremiumProxyScrap = async (req, res) => {
  keywordToFocus = req.body.keywordtofocus;
  websites = req.body.websites;
  clickForEachWebsite = req.body.clickforeachwebsite;
  proxyCountry = req.body.proxycountry;
  platform = 'Desktop';
  googleCountry = req.body.googlecountry;

  if (!req.body.keywordtofocus || !req.body.clickforeachwebsite || !req.body.websites) {
    res.status(500).json({
      success: false,

      message:
        'Pleaseee, be sure you provide a Website/Keyword/Number of Proxies ...'
    });
  } else {
    res.status(201).json({
      success: true,
      message: 'The process is starting...'
    });
  }
  //? Check if there is a current working task
  const task = await Task.find({
    status: { $ne: 'running' }
  });
  if (task.length >= 1) {
    console.log(
      'No Task running right now, you can execute a new one',
      new Date().toISOString()
    );
    await PremiumProx(
      keywordToFocus,
      websites,
      clickForEachWebsite,
      proxyCountry,
      platform,
      googleCountry
    );
  } else {
    console.log(
      'A task is running right now, Yours will be added to the Queued',
      new Date().toISOString()
    );
    const newTask = await Task.create({
      websites: websites,
      status: 'queued',
      clickForEachWebsite: clickForEachWebsite,
      keywordToFocus: keywordToFocus
    });
  }
};

// ! Scrap with server IP

const runIpScrap = async (req, res) => {
  keyword = req.body.keyword;
  website = req.body.website;
  whatMethod = {
    method: 'ip'
  };
  if (!keyword || !website) {
    res.status(500).json({
      success: false,

      message: 'Please, be sure you provide a Website/Keyword.'
    });
  } else {
    res.status(201).json({
      success: true,
      IP: 'Server IP',
      message: 'The process is starting...'
    });
    await runScrapWithProxy(keyword, website, [], 1, whatMethod);
  }
};

// ! Get All Results

const getAll = async (req, res) => {
  const data = await scrapMod.find({}).sort({ _id: 'desc' });
  const len = await scrapMod.count({});

  res.send({
    length: len,
    success: 'True',
    data
  });
};

const getbadresults = async (req, res) => {
  const data = await errorsMod.find({}).sort({ dateTime: 'desc' });

  const len = await errorsMod.count({});
  res.send({
    length: len,
    success: 'false',
    data
  });
};

const deletebadresults = async (req, res) => {
  errorsMod
    .deleteMany({})
    .then(function() {
      res.send({
        success: true
      });
    })
    .catch(function(error) {
      res.send({
        success: false
      });
    });
};
const deleteokresults = async (req, res) => {
  scrapMod
    .deleteMany({})
    .then(function() {
      res.send({
        success: true
      });
    })

    .catch(function(error) {
      res.send({
        success: false
      });
    });
};

const bandwidth = async (req, res) => {
  const Fulldata = await bandwidthFun();
  res.send({
    message: 'Hello for bandwidth',
    data: Fulldata
  });
};

module.exports = {
  runCustomProx,
  runIpScrap,
  getAll,
  getbadresults,
  runPremiumProxyScrap,
  bandwidth,
  deletebadresults,
  deleteokresults,
  getAllTasks
};
