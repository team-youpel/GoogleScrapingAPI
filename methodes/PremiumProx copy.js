// // const puppeteer = require('puppeteer-extra');
// // const nodemailer = require('nodemailer');
// // const { v1: uuidv1 } = require('uuid');
// // const ScrapFunctions = require('../functions/scrapFunctions');
// // const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// // const scrapMod = require('../models/scrapModel');
// // const errorsMod = require('../models/errorsModel');

// // const randomUseragent = require('random-useragent');
// // const userAgent = randomUseragent.getRandom();
// // const dotenv = require('dotenv');
// // // app.use(index);
// // dotenv.config({ path: `./config.env` });
// // // const port = process.env.PORT || 4002;
// // var cloudinary = require('cloudinary').v2;
// // let scrapObj = [];
// // // ! Transporter
// // let transporter = nodemailer.createTransport({
// //   service: 'gmail',
// //   auth: {
// //     user: process.env.GMAIL_EMAIL,
// //     pass: process.env.GMAIL_PASSWORD
// //   }
// // });

// // // server.listen(port, () => console.log(`Listening on port ${port}`));
// // // ! Mail options
// // const blockResourcesPlugin = require('puppeteer-extra-plugin-block-resources')();
// // puppeteer.use(blockResourcesPlugin);
// // // ! Puppeteer Middleware

// // puppeteer.use(StealthPlugin());

// // // ! CLoudinary API Config
// // cloudinary.config({
// //   cloud_name: process.env.CLOUD_NAME,
// //   api_key: process.env.CLOUD_API_KEY,
// //   api_secret: process.env.CLOUD_API_SECRET
// // });

// // function getHtmlEmail(pageTitle) {
// //   var template = '';
// //   for (var i = 0; i < scrapObj.length; i++) {
// //     template += `
// //       <h1> Page Title : | ${pageTitle} </h1>
// //   <b> Success : | ${scrapObj[i].Success} </b> <br>

// //   <b> Page Link : |   ${scrapObj[i].PageLink} </b> <br>
// //   <b> ScreenShoot : |   ${scrapObj[i].screenPath} </b> <br>
// //   <b> Date : |   ${scrapObj[i].dateTime} </b> <br>
// //   <b style="color:red"> Proxy : |   ${scrapObj[i].proxy} </> <br>
// //   `;
// //   }
// //   console.log('YOUR EMAIL IS:', template);
// //   return template;
// // }

// // // ! ***************************************************************** ! //

// // // ! ***************************************************************** ! //
// // let pageTitle;
// // let liveStepCount;
// // let page;
// // let browser;
// // async function PremiumProx(keyword, website, numproxies, lang) {
// //   for (var j = 0; j < numproxies; j++) {
// //     io.emit('premium', `${liveStepCount} ⌛ Browser is launching... 🌐`);

// //     liveStepCount = j + 1 + '/' + numproxies;
// //     try {
// //       scrapObj = [];
// //       browser = await puppeteer.launch({
// //         headless: true,
// //         args: [
// //           '--no-sandbox',
// //           '--disable-setuid-sandbox',
// //           '--disable-dev-shm-usage',
// //           '--single-process',
// //           `--proxy-server=proxy.proxy-cheap.com:31112`
// //         ],
// //         ignoreDefaultArgs: ['--disable-extensions'],
// //         ignoreHTTPSErrors: true
// //       });
// //       page = await browser.newPage();

// //       // !   await page.waitFor(2000);

// //       io.emit('premium', `Proxy : Premium 🔥`);

// //       await page.setViewport({ width: 1280, height: 800 });

// //       // !   await page.waitFor(3000);
// //       io.emit(
// //         'premium',
// //         `${liveStepCount} ⌛ Block all images and other media files 🚫`
// //       );
// //       // !  await page.waitFor(3000);
// //       // page.on('request', request => {
// //       //   const url = request.url().toLowerCase();
// //       //   const resourceType = request.resourceType();
// //       //   if (
// //       //     resourceType == 'media' ||
// //       //     resourceType == 'image' ||
// //       //     url.endsWith('.mp4') ||
// //       //     url.endsWith('.mp3') ||
// //       //     url.endsWith('.avi') ||
// //       //     url.endsWith('.flv') ||
// //       //     url.endsWith('.mov') ||
// //       //     url.endsWith('.wmv')
// //       //   ) {
// //       //     request.abort();
// //       //   } else {
// //       //     request.continue();
// //       //   }
// //       // });
// //       // await page.setDefaultNavigationTimeout(0);
// //       // ! await page.waitFor(2000);
// //       io.emit('premium', `${liveStepCount} ⌛ Proxy Authentication 🔓`);
// //       // !  await page.waitFor(2000);
// //       await page.authenticate({
// //         username: 'k9o9jsow',
// //         password: `iSQkDTUPyChhujxf_country-${lang}`
// //       });
// //       console.log('password: ', `"iSQkDTUPyChhujxf_country-${lang}`);

// //       blockResourcesPlugin.blockedTypes.add('image');
// //       blockResourcesPlugin.blockedTypes.add('media');

// //       io.emit('premium', `${liveStepCount} ⌛ Opening Google Search Page 🟩`);

// //       try {
// //         await page.goto('https://google.com', {
// //           waitUntil: 'networkidle2'
// //         });
// //       } catch (error) {
// //         let proxyIsWorking = true;
// //         await page
// //           .waitForSelector('[name=q]')
// //           .catch(e => (proxyIsWorking = false));

// //         while (!proxyIsWorking) {
// //           await page.waitFor(1000);
// //           await page.reload({ waitUntil: 'domcontentloaded' });

// //           proxyIsWorking = true;
// //           await page
// //             .waitForSelector('[name=q]')
// //             .catch(e => (proxyIsWorking = false));
// //         }
// //       }

// //       // try {
// //       //   await page.goto('https://google.com', {
// //       //     waitUntil: 'networkidle2'
// //       //   });
// //       // } catch (error) {
// //       //   await page.waitFor(8000);
// //       //   await page.reload({ waitUntil: 'domcontentloaded' });
// //       // }
// //       // .catch(async err => {
// //       //   if (
// //       //     err.message.startsWith(
// //       //       'net::ERR_TIMED_OUT at https://google.com'
// //       //     ) ||
// //       //     err.message.startsWith('net::ERR_FAILED at https://google.com')
// //       //   ) {
// //       //     await page.reload();
// //       //   } else {
// //       //     await page.reload();
// //       //     await browser.close();
// //       //   }
// //       // });

// //       // await page.waitFor(15000);
// //       await page.waitFor(5000);
// //       io.emit(
// //         'premium',
// //         `${liveStepCount} ⌛ Typing the keyword: ${keyword} 🔠`
// //       );
// //       await page.waitFor(5000);
// //       await page.click('[name=q]').catch(err => {
// //         throw err;
// //       });
// //       await page.keyboard.type(keyword, {
// //         delay: 80
// //       });

// //       await page.keyboard.press('Enter');

// //       await page.waitFor(5000);

// //       await page.waitFor(2000);
// //       io.emit(
// //         'premium',
// //         `${liveStepCount} ⌛ Search then select matches results 🔍`
// //       );
// //       await page.waitFor(2000);
// //       const elements = await page.$x("//a[contains(., '" + website + "')]");
// //       // const elements = await page.$x(
// //       //   "//li/div[contains(@class, 'ad_cclk') ]/a [not(contains(@style,'display:none')) and contains(.,'" +
// //       //     website +
// //       //     "')]"
// //       // );
// //       const captcha = await page.$x(`//*[@id="recaptcha"]`);

// //       if (captcha.length !== 0) {
// //         throw 'Captcha detected';
// //       }
// //       let outOfBoucle = false;
// //       if (elements.length === 0) {
// //         console.log('NO ADS');
// //         io.emit(
// //           'process7',
// //           `${liveStepCount} ⌛ No ads found for this keyword`
// //         );
// //         // ! ***********************************************************************
// //         var randomnumber3 = uuidv1();
// //         let picturePath3;
// //         await page.screenshot({
// //           path: `./pictures/ERROR${randomnumber3}.png`,
// //           fullPage: true
// //         });
// //         io.emit('premium', `❌ ERROR ❌ : No ads found for this keyword `);
// //         // console.log('Error: ', errorMessage);
// //         scrapObj = [];
// //         await page.waitFor(2000);
// //         await cloudinary.uploader
// //           .upload(`./pictures/ERROR${randomnumber3}.png`)
// //           .then(res => {
// //             picturePath3 = res.url;
// //             io.emit(
// //               'process7',
// //               `${liveStepCount} ⌛ Screenshot uploaded to cloudinary with success 📶`
// //             );
// //             scrapObj.push(
// //               ScrapFunctions.getTheObject(
// //                 false,
// //                 'No ads found for this keyword',
// //                 '',
// //                 '',
// //                 picturePath3,
// //                 ScrapFunctions.fullDate(),
// //                 'PREMIUM'
// //               )
// //             );
// //           });
// //         console.log(scrapObj);
// //         await errorsMod.create(scrapObj);
// //         await browser.close();
// //         continue;
// //         // outOfBoucle = true;
// //       }
// //       // // e.g. f
// //       // if (outOfBoucle) {
// //       // }
// //       await page.waitFor(3000);

// //       const newPagePromise = new Promise(x =>
// //         browser.once('targetcreated', target => x(target.page()))
// //       ); // declare promise
// //       blockResourcesPlugin.blockedTypes.add('stylesheet');
// //       blockResourcesPlugin.blockedTypes.add('other'); // e.g. f
// //       blockResourcesPlugin.blockedTypes.add('font'); // e.g. f
// //       blockResourcesPlugin.blockedTypes.add('texttrack'); // e.g. f
// //       blockResourcesPlugin.blockedTypes.add('websocket'); // e.g. f
// //       blockResourcesPlugin.blockedTypes.add('manifest');
// //       await elements[0].click({ button: 'middle' });
// //       page2 = await newPagePromise;

// //       await page2.bringToFront();

// //       blockingWait(25);
// //       function blockingWait(seconds) {
// //         let waitTill = new Date(new Date().getTime() + seconds * 1000);
// //         while (waitTill > new Date()) {}
// //       }

// //       io.emit(
// //         'process7',
// //         `${liveStepCount} ⌛ Clicking on ${j + 1} element 🖱️`
// //       );
// //       var randomnumber = uuidv1();

// //       await page.screenshot({
// //         path: `./pictures/${randomnumber}.png`,
// //         fullPage: true
// //       }),
// //         await page.waitFor(1000);

// //       await page.waitFor(1000);
// //       io.emit('premium', `${liveStepCount} ⌛ Taking a screenshot... 🖼️`);
// //       await page.waitFor(2000);
// //       const CurrentPageTitle = await page.title();
// //       pageTitle = CurrentPageTitle;
// //       const CurrentPageLink = await page.url();
// //       io.emit(
// //         'premium',
// //         `Page title: ${pageTitle}, |
// //              Page Url: ${CurrentPageLink}`
// //       );
// //       await cloudinary.uploader
// //         .upload(`./pictures/${randomnumber}.png`)
// //         .then(res => {
// //           picturePath = res.url;
// //           io.emit(
// //             'premium',
// //             `${liveStepCount} ⌛ Screenshot uploaded to cloudinary with success 📶`
// //           );
// //         });
// //       scrapObj.push(
// //         ScrapFunctions.getTheObject(
// //           true,
// //           'Everything works great!',
// //           CurrentPageTitle,
// //           CurrentPageLink,
// //           picturePath,
// //           ScrapFunctions.fullDate(),

// //           'PREMIUM'
// //         )
// //       );
// //       console.log('No links left to click');
// //       io.emit('premium', `Task ${j + 1} is finshed with success...  🔰`);
// //       await page.waitFor(1000);

// //       await page.waitFor(1000);
// //       io.emit('premium', `${liveStepCount} ⌛ Sending result to Gmail... 📨`);
// //       await page.waitFor(1000);
// //       // ! Email
// //       let mailOptions = {
// //         from: 'Node JS',
// //         to: 'brahim.akarouch@gmail.com',
// //         subject: 'Testing',
// //         html: getHtmlEmail(pageTitle)
// //       };

// //       // ! Sending Email
// //       transporter.sendMail(mailOptions, function(err, data) {
// //         if (err) {
// //           console.log('error');
// //         } else {
// //           console.log('email is working');
// //         }
// //       });
// //       await browser.close();
// //       io.emit('premium', `Save Results to database...💽`);
// //       await page.waitFor(2000);
// //       await scrapMod.create(scrapObj);
// //       io.emit('premium', `Tasks finished ... ✅`);
// //     } catch (err) {
// //       var randomnumber2 = uuidv1();
// //       let picturePath2;
// //       await page.screenshot({
// //         path: `./pictures/ERROR${randomnumber2}.png`,
// //         fullPage: true
// //       });
// //       let errorMessage = err.message || err;
// //       io.emit('premium', `❌ ERROR ❌ : ${errorMessage} `);
// //       console.log('Error: ', errorMessage);
// //       scrapObj = [];

// //       await cloudinary.uploader
// //         .upload(`./pictures/ERROR${randomnumber2}.png`)
// //         .then(res => {
// //           picturePath2 = res.url;
// //           io.emit(
// //             'process7',
// //             `${liveStepCount} ⌛ Screenshot uploaded to cloudinary with success 📶`
// //           );
// //           scrapObj.push(
// //             ScrapFunctions.getTheObject(
// //               false,
// //               errorMessage,
// //               '',
// //               '',
// //               picturePath2,
// //               ScrapFunctions.fullDate(),
// //               'PREMIUM'
// //             )
// //           );
// //         });

// //       await browser.close();
// //       console.log(scrapObj);
// //       await errorsMod.create(scrapObj);
// //     }
// //   }
// // }

// // module.exports = PremiumProx;

// // ! TEST PROPOSES

// const puppeteer = require('puppeteer-extra');
// const nodemailer = require('nodemailer');
// const { v1: uuidv1 } = require('uuid');
// const ScrapFunctions = require('../functions/scrapFunctions');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// const scrapMod = require('../models/scrapModel');
// const errorsMod = require('../models/errorsModel');

// const devices = require('puppeteer/DeviceDescriptors');
// const iPhone = devices['iPhone 6'];

// const randomUseragent = require('random-useragent');
// const userAgent = randomUseragent.getRandom();
// const dotenv = require('dotenv');
// // app.use(index);
// dotenv.config({ path: `./config.env` });
// // const port = process.env.PORT || 4002;
// var cloudinary = require('cloudinary').v2;
// let scrapObj = [];
// // ! Transporter
// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.GMAIL_EMAIL,
//     pass: process.env.GMAIL_PASSWORD
//   }
// });

// // server.listen(port, () => console.log(`Listening on port ${port}`));
// // ! Mail options
// const blockResourcesPlugin = require('puppeteer-extra-plugin-block-resources')();
// puppeteer.use(blockResourcesPlugin);
// // ! Puppeteer Middleware

// puppeteer.use(StealthPlugin());

// // ! CLoudinary API Config
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET
// });

// function getHtmlEmail(pageTitle) {
//   var template = '';
//   for (var i = 0; i < scrapObj.length; i++) {
//     template += `
//       <h1> Page Title : | ${pageTitle} </h1>
//   <b> Success : | ${scrapObj[i].Success} </b> <br>

//   <b> Page Link : |   ${scrapObj[i].PageLink} </b> <br>
//   <b> ScreenShoot : |   ${scrapObj[i].screenPath} </b> <br>
//   <b> Date : |   ${scrapObj[i].dateTime} </b> <br>
//   <b style="color:red"> Proxy : |   ${scrapObj[i].proxy} </> <br>
//   `;
//   }
//   console.log('YOUR EMAIL IS:', template);
//   return template;
// }

// // ! ***************************************************************** ! //
// function timer(ms) {
//   return new Promise(res => setTimeout(res, ms));
// }
// // ! ***************************************************************** ! //
// let pageTitle;
// let liveStepCount;
// let page;
// let browser;
// async function PremiumProx(keyword, website, numproxies, lang) {
//   for (var j = 0; j < numproxies; j++) {
//     io.emit('premium', `${liveStepCount} ⌛ Browser is launching... 🌐`);

//     liveStepCount = j + 1 + '/' + numproxies;
//     try {
//       scrapObj = [];
//       browser = await puppeteer.launch({
//         headless: false,
//         args: [
//           '--no-sandbox',
//           '--disable-setuid-sandbox',
//           '--disable-dev-shm-usage',
//           '--single-process',
//           `--proxy-server=zproxy.lum-superproxy.io:22225`
//         ],
//         ignoreDefaultArgs: ['--disable-extensions'],
//         ignoreHTTPSErrors: true
//       });
//       page = await browser.newPage();
//       // await page.setUserAgent(
//       //   'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
//       // );
//       // await page.setViewport({
//       //   width: 375,
//       //   height: 667,
//       //   isMobile: true
//       // });
//       // !   await page.waitFor(2000);

//       io.emit('premium', `Proxy : Premium 🔥`);

//       // await page.setViewport({ width: 1280, height: 800 });

//       // !   await page.waitFor(3000);
//       io.emit(
//         'premium',
//         `${liveStepCount} ⌛ Block all images and other media files 🚫`
//       );
//       // !  await page.waitFor(3000);
//       // ! await page.waitFor(2000);
//       io.emit('premium', `${liveStepCount} ⌛ Proxy Authentication 🔓`);
//       // !  await page.waitFor(2000);
//       await page.authenticate({
//         username: `lum-customer-hl_b9d04a4b-zone-static-country-de`,
//         password: `i9226z5xpkfk`
//       });

//       blockResourcesPlugin.blockedTypes.add('image');
//       blockResourcesPlugin.blockedTypes.add('media');

//       io.emit('premium', `${liveStepCount} ⌛ Opening Google Search Page 🟩`);

//       try {
//         await page.goto('https://google.com', {
//           waitUntil: 'networkidle2'
//         });
//       } catch (error) {
//         let proxyIsWorking = true;
//         await page
//           .waitForSelector('[name=q]')
//           .catch(e => (proxyIsWorking = false));

//         while (!proxyIsWorking) {
//           await page.waitFor(1000);
//           await page.reload({ waitUntil: 'domcontentloaded' });

//           proxyIsWorking = true;
//           await page
//             .waitForSelector('[name=q]')
//             .catch(e => (proxyIsWorking = false));
//         }
//       }
//       await page.waitFor(5000);
//       io.emit(
//         'premium',
//         `${liveStepCount} ⌛ Typing the keyword: ${keyword} 🔠`
//       );
//       await page.waitFor(5000);
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
//         'premium',
//         `${liveStepCount} ⌛ Search then select matches results 🔍`
//       );
//       await page.waitFor(2000);
//       const elements = await page.$x("//a[contains(., '" + website + "')]");
//       // const elements = await page.$x(
//       //   "//li/div[contains(@class, 'ad_cclk') ]/a [not(contains(@style,'display:none')) and contains(.,'" +
//       //     website +
//       //     "')]"
//       // );
//       const captcha = await page.$x(`//*[@id="recaptcha"]`);

//       if (captcha.length !== 0) {
//         throw 'Captcha detected';
//       }
//       let outOfBoucle = false;
//       if (elements.length === 0) {
//         console.log('NO ADS');
//         io.emit(
//           'process7',
//           `${liveStepCount} ⌛ No ads found for this keyword`
//         );
//         // ! ***********************************************************************
//         var randomnumber3 = uuidv1();
//         let picturePath3;
//         await page.screenshot({
//           path: `./pictures/ERROR${randomnumber3}.png`,
//           fullPage: true
//         });
//         io.emit('premium', `❌ ERROR ❌ : No ads found for this keyword `);
//         // console.log('Error: ', errorMessage);
//         scrapObj = [];
//         await page.waitFor(2000);

//         scrapObj.push(
//           ScrapFunctions.getTheObject(
//             false,
//             'No ads found for this keyword',
//             '',
//             '',
//             'picturePath3',
//             ScrapFunctions.fullDate(),
//             'PREMIUM'
//           )
//         );
//         console.log(scrapObj);
//         await errorsMod.create(scrapObj);
//         await browser.close();
//         continue;
//         // outOfBoucle = true;
//       }
//       // // e.g. f
//       // if (outOfBoucle) {
//       // }
//       await page.waitFor(3000);

//       const newPagePromise = new Promise(x =>
//         browser.once('targetcreated', target => x(target.page()))
//       ); // declare promise
//       blockResourcesPlugin.blockedTypes.add('stylesheet');
//       blockResourcesPlugin.blockedTypes.add('other'); // e.g. f
//       blockResourcesPlugin.blockedTypes.add('font'); // e.g. f
//       blockResourcesPlugin.blockedTypes.add('texttrack'); // e.g. f
//       blockResourcesPlugin.blockedTypes.add('websocket'); // e.g. f
//       blockResourcesPlugin.blockedTypes.add('manifest');
//       blockResourcesPlugin.blockedTypes.add('script');
//       blockResourcesPlugin.blockedTypes.add('document');
//       blockResourcesPlugin.blockedTypes.add('xhr');
//       blockResourcesPlugin.blockedTypes.add('eventsource');
//       blockResourcesPlugin.blockedTypes.add('fetch');

//       await elements[0].click({ button: 'middle' });
//       page2 = await newPagePromise;
//       await page2.setUserAgent(
//         'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
//       );
//       await page2.setViewport({
//         width: 375,
//         height: 667,
//         isMobile: true
//       });
//       await page2.bringToFront();

//       blockingWait(25);
//       function blockingWait(seconds) {
//         let waitTill = new Date(new Date().getTime() + seconds * 1000);
//         while (waitTill > new Date()) {}
//       }

//       io.emit(
//         'process7',
//         `${liveStepCount} ⌛ Clicking on ${j + 1} element 🖱️`
//       );
//       var randomnumber = uuidv1();

//       await page.screenshot({
//         path: `./pictures/${randomnumber}.png`,
//         fullPage: true
//       }),
//         await page.waitFor(1000);

//       await page.waitFor(1000);
//       io.emit('premium', `${liveStepCount} ⌛ Taking a screenshot... 🖼️`);
//       await page.waitFor(2000);
//       const CurrentPageTitle = await page.title();
//       pageTitle = CurrentPageTitle;
//       const CurrentPageLink = await page.url();
//       io.emit(
//         'premium',
//         `Page title: ${pageTitle}, |
//              Page Url: ${CurrentPageLink}`
//       );

//       scrapObj.push(
//         ScrapFunctions.getTheObject(
//           true,
//           'Everything works great!',
//           CurrentPageTitle,
//           CurrentPageLink,
//           'picturePath',
//           ScrapFunctions.fullDate(),

//           'PREMIUM'
//         )
//       );
//       console.log('No links left to click');
//       io.emit('premium', `Task ${j + 1} is finshed with success...  🔰`);
//       await page.waitFor(1000);

//       await page.waitFor(1000);
//       io.emit('premium', `${liveStepCount} ⌛ Sending result to Gmail... 📨`);
//       await page.waitFor(1000);
//       // ! Email
//       let mailOptions = {
//         from: 'Node JS',
//         to: 'brahim.akarouch@gmail.com',
//         subject: 'Testing',
//         html: getHtmlEmail(pageTitle)
//       };

//       // ! Sending Email
//       transporter.sendMail(mailOptions, function(err, data) {
//         if (err) {
//           console.log('error');
//         } else {
//           console.log('email is working');
//         }
//       });
//       await browser.close();
//       io.emit('premium', `Save Results to database...💽`);
//       await page.waitFor(2000);
//       await scrapMod.create(scrapObj);
//       io.emit('premium', `Tasks finished ... ✅`);
//       // await timer(5000);
//     } catch (err) {
//       var randomnumber2 = uuidv1();
//       let picturePath2;
//       await page.screenshot({
//         path: `./pictures/ERROR${randomnumber2}.png`,
//         fullPage: true
//       });
//       let errorMessage = err.message || err;
//       io.emit('premium', `❌ ERROR ❌ : ${errorMessage} `);
//       console.log('Error: ', errorMessage);
//       scrapObj = [];

//       scrapObj.push(
//         ScrapFunctions.getTheObject(
//           false,
//           errorMessage,
//           '',
//           '',
//           'picturePath2',
//           ScrapFunctions.fullDate(),
//           'PREMIUM'
//         )
//       );
//       await browser.close();
//       console.log(scrapObj);
//       await errorsMod.create(scrapObj);
//       // await timer(5000);
//     }
//   }
// }

// module.exports = PremiumProx;



// ! 28 Yolyoz 2020
// ! baaaaaaaaaaaaaaaaaaaaaaaaaaaack
// const puppeteer = require('puppeteer-extra');
// const nodemailer = require('nodemailer');
// const { v1: uuidv1 } = require('uuid');
// const ScrapFunctions = require('../functions/scrapFunctions');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// const scrapMod = require('../models/scrapModel');
// const errorsMod = require('../models/errorsModel');

// const randomUseragent = require('random-useragent');
// const userAgent = randomUseragent.getRandom();
// const dotenv = require('dotenv');
// // app.use(index);
// dotenv.config({ path: `./config.env` });
// const devices = require('puppeteer/DeviceDescriptors');
// const iPhonex = devices['iPhone X'];
// // const port = process.env.PORT || 4002;
// var cloudinary = require('cloudinary').v2;
// let scrapObj = [];
// // ! Transporter
// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.GMAIL_EMAIL,
//     pass: process.env.GMAIL_PASSWORD
//   }
// });

// // server.listen(port, () => console.log(`Listening on port ${port}`));
// // ! Mail options
// const blockResourcesPlugin = require('puppeteer-extra-plugin-block-resources')();
// puppeteer.use(blockResourcesPlugin);
// // ! Puppeteer Middleware

// puppeteer.use(StealthPlugin());

// // ! CLoudinary API Config
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET
// });

// function getHtmlEmail(pageTitle) {
//   var template = '';
//   for (var i = 0; i < scrapObj.length; i++) {
//     template += `
//       <h1> Page Title : | ${pageTitle} </h1>
//   <b> Success : | ${scrapObj[i].Success} </b> <br>

//   <b> Page Link : |   ${scrapObj[i].PageLink} </b> <br>
//   <b> ScreenShoot : |   ${scrapObj[i].screenPath} </b> <br>
//   <b> Date : |   ${scrapObj[i].dateTime} </b> <br>
//   <b style="color:red"> Proxy : |   ${scrapObj[i].proxy} </> <br>
//   `;
//   }
//   console.log('YOUR EMAIL IS:', template);
//   return template;
// }

// // ! ***************************************************************** ! //
// function timer(ms) {
//   return new Promise(res => setTimeout(res, ms));
// }
// // ! ***************************************************************** ! //
// let pageTitle;
// let liveStepCount;
// let page;
// let browser;
// async function PremiumProx(
//   keyword,
//   website,
//   numproxies,
//   lang,
//   platform = 'Desktop',
//   googleCountry = 'Com'
// ) {
//   for (var j = 0; j < numproxies; j++) {
//     console.log('STEP ', j);
//     io.emit('premium', `${liveStepCount} ⌛ Browser is launching... 🌐`);

//     liveStepCount = j + 1 + '/' + numproxies;
//     try {
//       scrapObj = [];
//       browser = await puppeteer.launch({
//         headless: false,
//         args: [
//           '--no-sandbox',
//           '--disable-setuid-sandbox',
//           '--disable-dev-shm-usage',
//           '--single-process',
//           `--proxy-server=proxy.proxy-cheap.com:31112`
//         ],
//         ignoreDefaultArgs: ['--disable-extensions'],
//         ignoreHTTPSErrors: true
//       });
//       page = await browser.newPage();
//       // await page.emulate(iPhonex);
//       if (platform === 'Mobile') {
//         await page.setUserAgent(
//           'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
//         );
//         await page.setViewport({
//           width: 375,
//           height: 812,
//           deviceScaleFactor: 3,
//           isMobile: true,
//           hasTouch: true,
//           isLandscape: false
//         });
//       }
//       // !   await page.waitFor(2000);

//       io.emit('premium', `Proxy : Premium 🔥`);

//       // !   await page.waitFor(3000);
//       io.emit(
//         'premium',
//         `${liveStepCount} ⌛ Block all images and other media files 🚫`
//       );
//       await page.waitFor(2000);
//       io.emit('premium', `${liveStepCount} ⌛ Proxy Authentication 🔓`);
//       await page.waitFor(2000);
//       await page.authenticate({
//         username: 'cathli5u',
//         password: `NNW5u5R612Bj3PkL_country-${lang}`
//       });

//       blockResourcesPlugin.blockedTypes.add('image');
//       blockResourcesPlugin.blockedTypes.add('media');

//       io.emit(
//         'premium',
//         `${liveStepCount} ⌛ Opening Google Search Page |🇬| Google.${googleCountry}`
//       );

//       try {
//         await page.goto(`https://google.${googleCountry}`, {
//           waitUntil: 'networkidle2'
//         });
//       } catch (error) {
//         let proxyIsWorking = true;
//         await page
//           .waitForSelector('[name=q]')
//           .catch(e => (proxyIsWorking = false));

//         while (!proxyIsWorking) {
//           await page.waitFor(1000);
//           await page.reload({ waitUntil: 'domcontentloaded' });

//           proxyIsWorking = true;
//           await page
//             .waitForSelector('[name=q]')
//             .catch(e => (proxyIsWorking = false));
//         }
//       }

//       await page.waitFor(5000);
//       io.emit(
//         'premium',
//         `${liveStepCount} ⌛ Typing the keyword: ${keyword} 🔠`
//       );
//       await page.waitFor(5000);
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
//         'premium',
//         `${liveStepCount} ⌛ Search then select matches results 🔍`
//       );
//       await page.waitFor(2000);

//       let captcha = await page.$x(`//*[@id="recaptcha"]`);
//       if (captcha.length !== 0) {
//         io.emit(
//           'premium',
//           'ReCaptcha is detected, Retrying with another proxy 🔁'
//         );
//       }

//       // ! IF CAPTCHA IS DETECTED

//       if (captcha.length !== 0) {
//         console.log('CAPTCHA DETECTED');
//         j = j - 1;
//         throw new Error(
//           'This is not an error. This is just to abort javascript'
//         );
//       }
//       // try {
//       //   await page.goto(`https://google.${googleCountry}`, {
//       //     waitUntil: 'networkidle2'
//       //   });
//       //   await page.waitFor(2000);
//       // } catch (error) {
//       //   let proxyIsWorking = true;
//       //   await page
//       //     .waitForSelector('[name=q]')
//       //     .catch(e => (proxyIsWorking = false));

//       //   while (!proxyIsWorking) {
//       //     await page.waitFor(1000);
//       //     await page.reload({ waitUntil: 'domcontentloaded' });
//       //     await page.waitFor(2000);

//       //     proxyIsWorking = true;
//       //     await page
//       //       .waitForSelector('[name=q]')
//       //       .catch(e => (proxyIsWorking = false));
//       //   }
//       // }
//       // await page.waitFor(5000);
//       // io.emit(
//       //   'premium',
//       //   `${liveStepCount} ⌛ Typing the keyword: ${keyword} 🔠`
//       // );
//       // await page.waitFor(5000);
//       // await page.click('[name=q]').catch(err => {
//       //   throw err;
//       // });
//       // await page.keyboard.type(keyword, {
//       //   delay: 80
//       // });

//       // await page.keyboard.press('Enter');

//       // await page.waitFor(5000);

//       // await page.waitFor(2000);

//       // await page.waitFor(2000);
//       // captcha = await page.$x(`//*[@id="recaptcha"]`);

//       //! END CAPTCHA DETECTING

//       io.emit(
//         'premium',
//         `${liveStepCount} ⌛ Search then select matches results 🔍`
//       );
//       await page.waitFor(2000);

//       const elements = await page.$x("//a[contains(., '" + website + "')]");
//       // const elements = await page.$x(
//       //   "//li/div[contains(@class, 'ad_cclk') ]/a [not(contains(@style,'display:none')) and contains(.,'" +
//       //     website +
//       //     "')]"
//       // );

//       if (elements.length === 0) {
//         console.log('NO ADS');
//         io.emit(
//           'process7',
//           `${liveStepCount} ⌛ No ads found for this keyword`
//         );

//         let TriesUntilAdsFounded = 3;

//         while (TriesUntilAdsFounded--) {
//           console.log('While', TriesUntilAdsFounded);
//           await page.waitFor(1000);
//           await page.reload({ waitUntil: 'domcontentloaded' });
//           await page.waitFor(2000);
//           let elements2 = await page.$x("//a[contains(., '" + website + "')]");
//           if (elements2.length !== 0) {
//             console.log('STOPING WHILE, BCZ I FOUND IT');
//             TriesUntilAdsFounded = -1;
//           } else {
//             console.log(
//               'I CANT FOUND IT, SO TRY AGAIN :',
//               TriesUntilAdsFounded + 1
//             );

//             TriesUntilAdsFounded = TriesUntilAdsFounded;
//           }
//         }

//         // ! ***********************************************************************
//         var randomnumber3 = uuidv1();
//         let picturePath3;
//         await page.screenshot({
//           path: `./pictures/ERROR${randomnumber3}.png`,
//           fullPage: true
//         });
//         io.emit('premium', `❌ : No ads found for this keyword `);
//         // console.log('Error: ', errorMessage);
//         scrapObj = [];
//         await page.waitFor(2000);
//         await cloudinary.uploader
//           .upload(`./pictures/ERROR${randomnumber3}.png`, {
//             secure: true
//           })
//           .then(res => {
//             picturePath3 = res.url;
//             io.emit(
//               'process7',
//               `${liveStepCount} ⌛ Screenshot uploaded to cloudinary with success 📶`
//             );
//             scrapObj.push(
//               ScrapFunctions.getTheObject(
//                 false,
//                 'No ads found for this keyword',
//                 '',
//                 '',
//                 picturePath3,
//                 ScrapFunctions.fullDate(),
//                 'PREMIUM',
//                 platform,
//                 keyword,
//                 website
//               )
//             );
//           });
//         console.log(scrapObj);
//         await errorsMod.create(scrapObj);
//         await browser.close();
//         continue;
//         // outOfBoucle = true;
//       }
//       // // e.g. f
//       // if (outOfBoucle) {
//       // }
//       await page.waitFor(3000);

//       const newPagePromise = new Promise(x =>
//         browser.once('targetcreated', target => x(target.page()))
//       ); // declare promise
//       blockResourcesPlugin.blockedTypes.add('stylesheet');
//       blockResourcesPlugin.blockedTypes.add('other'); // e.g. f
//       blockResourcesPlugin.blockedTypes.add('font'); // e.g. f
//       blockResourcesPlugin.blockedTypes.add('texttrack'); // e.g. f
//       blockResourcesPlugin.blockedTypes.add('websocket'); // e.g. f
//       blockResourcesPlugin.blockedTypes.add('manifest');
//       await elements[0].click({ button: 'middle' });
//       page2 = await newPagePromise;
//       if (platform === 'Mobile') {
//         await page2.setUserAgent(
//           'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
//         );
//         await page2.setViewport({
//           width: 375,
//           height: 812,
//           deviceScaleFactor: 3,
//           isMobile: true,
//           hasTouch: true,
//           isLandscape: false
//         });
//       }
//       await page2.bringToFront();

//       blockingWait(25);
//       function blockingWait(seconds) {
//         let waitTill = new Date(new Date().getTime() + seconds * 1000);
//         while (waitTill > new Date()) {}
//       }

//       io.emit(
//         'process7',
//         `${liveStepCount} ⌛ Clicking on ${j + 1} element 🖱️`
//       );
//       var randomnumber = uuidv1();

//       await page.screenshot({
//         path: `./pictures/${randomnumber}.png`,
//         fullPage: true
//       }),
//         await page.waitFor(1000);

//       await page.waitFor(1000);
//       io.emit('premium', `${liveStepCount} ⌛ Taking a screenshot... 🖼️`);
//       await page.waitFor(2000);
//       const CurrentPageTitle = await page.title();
//       pageTitle = CurrentPageTitle;
//       const CurrentPageLink = await page.url();
//       io.emit(
//         'premium',
//         `Page title: ${pageTitle}, |
//              Page Url: ${CurrentPageLink}`
//       );
//       await cloudinary.uploader
//         .upload(`./pictures/${randomnumber}.png`)
//         .then(res => {
//           picturePath = res.url;
//           io.emit(
//             'premium',
//             `${liveStepCount} ⌛ Screenshot uploaded to cloudinary with success 📶`
//           );
//         });
//       scrapObj.push(
//         ScrapFunctions.getTheObject(
//           true,
//           'Everything works great!',
//           CurrentPageTitle,
//           CurrentPageLink,
//           picturePath,
//           ScrapFunctions.fullDate(),
//           'PREMIUM',
//           platform,
//           keyword,
//           website
//         )
//       );
//       console.log('No links left to click');
//       io.emit('premium', `Task ${j + 1} is finshed with success...  🔰`);
//       await page.waitFor(1000);

//       await page.waitFor(1000);
//       io.emit('premium', `${liveStepCount} ⌛ Sending result to Gmail... 📨`);
//       await page.waitFor(1000);
//       // ! Email
//       let mailOptions = {
//         from: 'Node JS',
//         to: 'brahim.akarouch@gmail.com',
//         subject: 'Testing',
//         html: getHtmlEmail(pageTitle)
//       };

//       // ! Sending Email
//       transporter.sendMail(mailOptions, function(err, data) {
//         if (err) {
//           console.log('error');
//         } else {
//           console.log('email is working');
//         }
//       });
//       await browser.close();
//       io.emit('premium', `Save Results to database...💽`);
//       await page.waitFor(2000);
//       await scrapMod.create(scrapObj);
//       io.emit('premium', `Tasks finished ... ✅`);
//     } catch (err) {
//       var randomnumber2 = uuidv1();
//       let picturePath2;
//       await page.screenshot({
//         path: `./pictures/ERROR${randomnumber2}.png`,
//         fullPage: true
//       });
//       let errorMessage = err.message || err;
//       io.emit('premium', `❌ : ${errorMessage} `);
//       console.log('Error: ', errorMessage);
//       scrapObj = [];

//       await cloudinary.uploader
//         .upload(`./pictures/ERROR${randomnumber2}.png`)
//         .then(res => {
//           picturePath2 = res.url;
//           io.emit(
//             'process7',
//             `${liveStepCount} ⌛ Screenshot uploaded to cloudinary with success 📶`
//           );
//           scrapObj.push(
//             ScrapFunctions.getTheObject(
//               false,
//               errorMessage,
//               '',
//               '',
//               picturePath2,
//               ScrapFunctions.fullDate(),
//               'PREMIUM',
//               platform,
//               keyword,
//               website
//             )
//           );
//         });

//       await browser.close();
//       console.log(scrapObj);
//       await errorsMod.create(scrapObj);
//     }
//   }
// }

// module.exports = PremiumProx;
