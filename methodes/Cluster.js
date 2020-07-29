// const { Cluster } = require('puppeteer-cluster');
// const puppeteer = require('puppeteer-extra');
// const { v1: uuidv1 } = require('uuid');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// const scrapMod = require('../models/scrapModel');
// const errorsMod = require('../models/errorsModel');
// const ScrapFunctions = require('../functions/scrapFunctions');
// const blockResourcesPlugin = require('puppeteer-extra-plugin-block-resources')();
// const dotenv = require('dotenv');
// dotenv.config({ path: `./config.env` });
// var cloudinary = require('cloudinary').v2;
// let scrapObj = [];

// // ! Puppeteer Middlewares
// puppeteer.use(blockResourcesPlugin);
// puppeteer.use(StealthPlugin());

// let browser;
// let page;
// let pageTitle;
// let page2;
// let liveStepCount;
// async function PremiumProx(keyword, website, numproxies, country = 'Spain') {
//   for (var j = 0; j < numproxies; j++) {
//     liveStepCount = j + 1 + '/' + numproxies;

//     try {
//       scrapObj = [];
//       browser = await ScrapFunctions.initiateBrowser(
//         `--proxy-server=proxy.proxy-cheap.com:31112`,
//         'PREMIUM',
//         liveStepCount
//       );

//       page = await browser.newPage();

//       await page.waitFor(2000);

//       io.emit('process', `Proxy : Premium 🔥`);

//       await page.setViewport({ width: 1280, height: 800 });

//       await page.setRequestInterception(true);
//       blockResourcesPlugin.blockedTypes.add('image');
//       blockResourcesPlugin.blockedTypes.add('media');

//       await page.waitFor(3000);
//       io.emit(
//         'process',
//         `${liveStepCount} ⌛ Block all images and other media files 🚫 aaaaaaaa`
//       );
//       await page.waitFor(3000);

//       await page.setDefaultNavigationTimeout(0);
//       await page.waitFor(2000);
//       io.emit('process', `${liveStepCount} ⌛ Proxy Authentication 🔓`);
//       await page.waitFor(2000);
//       await page.authenticate({
//         username: 'k9o9jsow',
//         password: `iSQkDTUPyChhujxf_country-${country}`
//       });
//       blockResourcesPlugin.blockedTypes.add('image');
//       blockResourcesPlugin.blockedTypes.add('media');
//       io.emit('process', `${liveStepCount} ⌛ Opening Google Search Page 🟩`);
//       await page
//         .goto('https://google.com', {
//           waitUntil: 'networkidle2'
//         })
//         .catch(async err => {
//           throw err;
//         });

//       await page.waitFor(5000);
//       io.emit(
//         'process',
//         `${liveStepCount} ⌛ Typing the keyword: ${keyword} 🔠`
//       );
//       await page.waitFor(1000);
//       await page.click('[name=q]').catch(err => {
//         throw err;
//       });
//       await page.keyboard.type(keyword, {
//         delay: 80
//       });

//       await page.keyboard.press('Enter');

//       await page.waitFor(5000);

//       await page.waitFor(2000);
//       io.emit(
//         'process',
//         `${liveStepCount} ⌛ Search then select matches results 🔍`
//       );

//       await page.waitFor(9000);
//       const elements = await page.$x(
//         "//li/div[contains(@class, 'ad_cclk') ]/a [not(contains(@style,'display:none')) and contains(.,'" +
//           website +
//           "')]"
//       );
//       const captcha = await page.$x(`//*[@id="recaptcha"]`);

//       if (captcha.length !== 0) {
//         throw 'Captcha detected';
//       }
//       if (elements.length === 0) {
//         io.emit('process', `${liveStepCount} ⌛ No ads found for this keyword`);
//         throw 'No ads found for this keyword';
//       }

//       await page.waitFor(9000);

//       const newPagePromise = new Promise(x =>
//         browser.once('targetcreated', target => x(target.page()))
//       ); // declare promise
//       await elements[0].click({ button: 'middle' });
//       blockResourcesPlugin.blockedTypes.add('stylesheet');
//       blockResourcesPlugin.blockedTypes.add('font');
//       blockResourcesPlugin.blockedTypes.add('texttrack');
//       blockResourcesPlugin.blockedTypes.add('xhr');
//       blockResourcesPlugin.blockedTypes.add('fetch');
//       blockResourcesPlugin.blockedTypes.add('eventsource');
//       blockResourcesPlugin.blockedTypes.add('websocket');
//       blockResourcesPlugin.blockedTypes.add('manifest');
//       blockResourcesPlugin.blockedTypes.add('script');
//       blockResourcesPlugin.blockedTypes.add('document');
//       blockResourcesPlugin.blockedTypes.add('other');
//       page2 = await newPagePromise;

//       await page2.bringToFront();

//       blockingWait(25);
//       function blockingWait(seconds) {
//         let waitTill = new Date(new Date().getTime() + seconds * 1000);
//         while (waitTill > new Date()) {}
//       }

//       io.emit('process', `${liveStepCount} ⌛ Clicking on ${j + 1} element 🖱️`);
//       var randomnumber = uuidv1();
//       await page.screenshot({
//         path: `./pictures/${randomnumber}.png`
//       });
//       io.emit('process', `${liveStepCount} ⌛ Taking a screenshot... 🖼️`);
//       const CurrentPageTitle = await page.title();
//       pageTitle = CurrentPageTitle;
//       const CurrentPageLink = await page.url();
//       io.emit(
//         'process',
//         `Page title: ${pageTitle}, |
//            Page Url: ${CurrentPageLink}`
//       );
//       // ! Upload image to cloudinary
//       picturePath = await ScrapFunctions.uploadToCloudinart(
//         randomnumber,
//         liveStepCount
//       );

//       scrapObj.push(
//         ScrapFunctions.getTheObject(
//           true,
//           'Everything works great!',
//           CurrentPageTitle,
//           CurrentPageLink,
//           picturePath,
//           ScrapFunctions.fullDate(),
//           'PREMIUM'
//         )
//       );

//       console.log(scrapObj);
//       await page.waitFor(2000),
//         io.emit(
//           'process',
//           `${liveStepCount} ⌛ GO back to the previous google page... 🔙`
//         );
//       io.emit('process', `Task ${j + 1} is finshed with success...  🔰`);
//       await page.waitFor(1000);
//       await page.waitFor(1000);
//       io.emit('process', `${liveStepCount} ⌛ Sending result to Gmail... 📨`);
//       await page.waitFor(1000);

//       // ! Send email
//       ScrapFunctions.sendEmail(scrapObj, pageTitle);

//       await browser.close();
//       io.emit('process', `Save Results to database...💽`);
//       await page.waitFor(2000);
//       await scrapMod.create(scrapObj);
//       io.emit('process', `Tasks finished ... ✅`);
//     } catch (err) {
//       var randomnumber2 = uuidv1();
//       let picturePath2;
//       await page.screenshot({
//         path: `./pictures/ERROR${randomnumber2}.png`
//       });
//       let errorMessage = err.message || err;
//       const CurrentPageTitle = await page.title();
//       const CurrentPageLink = await page.url();
//       await cloudinary.uploader
//         .upload(`./pictures/ERROR${randomnumber2}.png`, {
//           transformation: [{ width: 640, height: 400 }]
//         })
//         .then(res => {
//           picturePath2 = res.url;
//           io.emit(
//             'process',
//             `${liveStepCount} ⌛ Screenshot uploaded to cloudinary with success 📶`
//           );
//           scrapObj.push(
//             ScrapFunctions.getTheObject(
//               false,
//               errorMessage,
//               CurrentPageTitle,
//               CurrentPageLink,
//               picturePath2,
//               ScrapFunctions.fullDate(),
//               'PREMIUM'
//             )
//           );
//         });

//       io.emit('process', `❌ ERROR ❌ : ${errorMessage} `);
//       console.log('Error: ', errorMessage);
//       await errorsMod.create(scrapObj);
//       scrapObj = [];

//       await browser.close();
//     }
//   }
// }
// async function runCluster(keyword, website, numproxies, country) {
//   const cluster = await Cluster.launch({
//     concurrency: Cluster.CONCURRENCY_BROWSER, // spawn to parallel browsers
//     maxConcurrency: 2 // how many tasks should be run concurrently
//   });

//   cron.schedule('1', () => {
//     cluster.queue(PremiumProx(keyword, website, numproxies, country));
//   });
// }

// module.exports = runCluster;
