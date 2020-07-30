const puppeteer = require('puppeteer-extra');
const nodemailer = require('nodemailer');
const { v1: uuidv1 } = require('uuid');
const ScrapFunctions = require('../functions/scrapFunctions');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const scrapMod = require('../models/scrapModel');
const errorsMod = require('../models/errorsModel');
const adminErrorsMod = require('../models/adminErrorsModel');
const randomUseragent = require('random-useragent');
const userAgent = randomUseragent.getRandom();
const dotenv = require('dotenv');
// const { record } = require('puppeteer-recorder');

// app.use(index);
dotenv.config({ path: `./config.env` });
const devices = require('puppeteer/DeviceDescriptors');
const iPhonex = devices['iPhone X'];
// const port = process.env.PORT || 4002;
var cloudinary = require('cloudinary').v2;
let scrapObj = [];
// ! Transporter
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD
  }
});

// server.listen(port, () => console.log(`Listening on port ${port}`));
// ! Mail options
const blockResourcesPlugin = require('puppeteer-extra-plugin-block-resources')();
puppeteer.use(blockResourcesPlugin);
// ! Puppeteer Middleware

puppeteer.use(StealthPlugin());

// ! CLoudinary API Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

function getHtmlEmail(pageTitle) {
  var template = '';
  for (var i = 0; i < scrapObj.length; i++) {
    template += `
      <h1> Page Title : | ${pageTitle} </h1>
  <b> Success : | ${scrapObj[i].Success} </b> <br>

  <b> Page Link : |   ${scrapObj[i].PageLink} </b> <br>
  <b> ScreenShoot : |   ${scrapObj[i].screenPath} </b> <br>
  <b> Date : |   ${scrapObj[i].dateTime} </b> <br>
  <b style="color:red"> Proxy : |   ${scrapObj[i].proxy} </> <br>
  `;
  }
  console.log('YOUR EMAIL IS:', template);
  return template;
}

// ! ***************************************************************** ! //

// ! ***************************************************************** ! //

// ! ***************************************************************** ! //
function timer(ms) {
  return new Promise(res => setTimeout(res, ms));
}
// ! ***************************************************************** ! //
let pageTitle;
let liveStepCount;
let page;
let browser;

// ! ******

// ! ******
async function PremiumProx(
  keyword,
  website,
  numproxies,
  lang,
  platform = 'Desktop',
  googleCountry = 'Com'
) {
  let success = 0;
  let HowMuch = 0;
  let errorsCount = 0;
  HowMuch = numproxies;
  while (success < HowMuch && errorsCount < 500) {
    console.log('STEP ', success + 1);

    liveStepCount = success + 1 + '/' + numproxies;
    io.emit('premium', `${liveStepCount} ⌛ Browser is launching... 🌐`);
    try {
      scrapObj = [];
      browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--single-process',
          `--proxy-server=proxy.proxy-cheap.com:31112`
        ],
        ignoreDefaultArgs: ['--disable-extensions'],
        ignoreHTTPSErrors: true
      });
      page = await browser.newPage();
      if (platform === 'Mobile') {
        await page.setUserAgent(
          'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
        );
        await page.setViewport({
          width: 375,
          height: 812,
          deviceScaleFactor: 3,
          isMobile: true,
          hasTouch: true,
          isLandscape: false
        });
      }
      io.emit('premium', `Proxy : Premium 🔥`);
      await page.waitFor(3000);
      io.emit(
        'premium',
        `${liveStepCount} ⌛ Block all images and other media files 🚫`
      );
      await page.waitFor(2000);
      io.emit('premium', `${liveStepCount} ⌛ Proxy Authentication 🔓`);
      await page.waitFor(2000);

      await page.authenticate({
        username: 'cathli5u',
        password: `NNW5u5R612Bj3PkL_country-${lang}`
      });

      blockResourcesPlugin.blockedTypes.add('image');
      blockResourcesPlugin.blockedTypes.add('media');

      io.emit(
        'premium',
        `${liveStepCount} ⌛ Opening Google Search Page |🇬| Google.${googleCountry}`
      );

      try {
        await page.goto(`https://google.${googleCountry}`, {
          waitUntil: 'networkidle2'
        });
      } catch (error) {
        let proxyIsWorking = true;
        await page
          .waitForSelector('[name=q]')
          .catch(e => (proxyIsWorking = false));

        while (!proxyIsWorking) {
          await page.waitFor(1000);
          await page.reload({ waitUntil: 'domcontentloaded' });

          proxyIsWorking = true;
          await page
            .waitForSelector('[name=q]')
            .catch(e => (proxyIsWorking = false));
        }
      }

      await page.waitFor(5000);
      io.emit(
        'premium',
        `${liveStepCount} ⌛ Typing the keyword: ${keyword} 🔠`
      );
      await page.waitFor(5000);
      await page.click('[name=q]').catch(err => {
        throw err;
      });
      await page.keyboard.type(keyword, {
        delay: 80
      });

      await page.keyboard.press('Enter');

      await page.waitFor(5000);

      await page.waitFor(2000);
      io.emit(
        'premium',
        `${liveStepCount} ⌛ Search then select matches results 🔍`
      );
      await page.waitFor(2000);
      let captcha = await page.$x(`//*[@id="recaptcha"]`);
      if (captcha.length !== 0) {
        io.emit(
          'premium',
          'ReCaptcha is detected, Retrying with another proxy 🔁'
        );
        console.log('CAPTCHA DETECTED');
        throw new Error('captcha detected');
      }
      io.emit(
        'premium',
        `${liveStepCount} ⌛ Search then select matches results 🔍`
      );
      await page.waitFor(2000);
      const elements = await page.$x("//a[contains(., '" + website + "')]");
      if (elements.length === 0) {
        // console.log('NO ADS');
        //   io.emit('premium', `❌ : No ads found for this keyword `);
        throw new Error(`No ads found for this website`);
      }
      await page.waitFor(3000);
      const newPagePromise = new Promise(x =>
        browser.once('targetcreated', target => x(target.page()))
      ); // declare promise
      blockResourcesPlugin.blockedTypes.add('stylesheet');
      blockResourcesPlugin.blockedTypes.add('other'); // e.g. f
      blockResourcesPlugin.blockedTypes.add('font'); // e.g. f
      blockResourcesPlugin.blockedTypes.add('texttrack'); // e.g. f
      blockResourcesPlugin.blockedTypes.add('websocket'); // e.g. f
      blockResourcesPlugin.blockedTypes.add('manifest');
      await elements[0].click({ button: 'middle' });
      page2 = await newPagePromise;
      if (platform === 'Mobile') {
        await page2.setUserAgent(
          'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
        );
        await page2.setViewport({
          width: 375,
          height: 812,
          deviceScaleFactor: 3,
          isMobile: true,
          hasTouch: true,
          isLandscape: false
        });
      }
      await page2.bringToFront();

      blockingWait(25);
      function blockingWait(seconds) {
        let waitTill = new Date(new Date().getTime() + seconds * 1000);
        while (waitTill > new Date()) {}
      }

      var randomnumber = uuidv1();

      try {
        await page.screenshot({
          path: `./pictures/${randomnumber}.png`,
          fullPage: true
        });
      } catch (error) {
        throw new Error(
          'Error: Protocol error (Page.captureScreenshot): Cannot take screenshot with 0 width.'
        );
      }
      await page.waitFor(1000);

      await page.waitFor(1000);
      io.emit('premium', `${liveStepCount} ⌛ Taking a screenshot... 🖼️`);
      await page.waitFor(2000);
      const CurrentPageTitle = await page.title();
      pageTitle = CurrentPageTitle;
      const CurrentPageLink = await page.url();

      io.emit(
        'premium',
        `Page title: ${pageTitle}, |
             Page Url: ${CurrentPageLink}`
      );
      await cloudinary.uploader
        .upload(`./pictures/${randomnumber}.png`)
        .then(res => {
          picturePath = res.url;
          io.emit(
            'premium',
            `${liveStepCount} ⌛ Screenshot uploaded to cloudinary with success 📶`
          );
        });
      scrapObj.push(
        ScrapFunctions.getTheObject(
          true,
          'Everything works great!',
          CurrentPageTitle,
          CurrentPageLink,
          picturePath,
          ScrapFunctions.fullDate(),
          'PREMIUM',
          platform,
          keyword,
          website
        )
      );
      console.log('No links left to click');
      io.emit('premium', `Task ${success + 1} is finshed with success...  🔰`);
      await page.waitFor(1000);

      await page.waitFor(1000);
      io.emit('premium', `${liveStepCount} ⌛ Sending result to Gmail... 📨`);
      await page.waitFor(1000);
      // ! Email
      let mailOptions = {
        from: 'Node JS',
        to: 'brahim.akarouch@gmail.com',
        subject: 'Testing',
        html: getHtmlEmail(pageTitle)
      };

      // ! Sending Email
      transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log('error');
        } else {
          console.log('email is working');
        }
      });

      success++;
      console.log('SUCCESS COUNT', success);

      await browser.close();
      io.emit('premium', `Save Results to database...💽`);
      await page.waitFor(2000);
      await scrapMod.create(scrapObj);
      io.emit('premium', `Tasks finished ... ✅`);
    } catch (err) {
      // ! CLIENT ERRORS :
      if (err.message === 'No ads found for this website') {
        var randomnumber2 = uuidv1();
        let picturePath2;
        try {
          await page.screenshot({
            path: `./pictures/ERROR${randomnumber2}.png`,
            fullPage: true
          });
        } catch (error) {
          throw new Error(
            'Error: Protocol error (Page.captureScreenshot): Cannot take screenshot with 0 width.'
          );
        }
        let errorMessage = err.message || err;
        io.emit('premium', `❌ : ${liveStepCount} ${errorMessage} `);
        console.log('Error: ', errorMessage);
        scrapObj = [];

        await cloudinary.uploader
          .upload(`./pictures/ERROR${randomnumber2}.png`)
          .then(res => {
            picturePath2 = res.url;
            io.emit(
              'process7',
              `${liveStepCount} ⌛ Screenshot of error uploaded to cloudinary with success 📶`
            );
            scrapObj.push(
              ScrapFunctions.getTheObject(
                false,
                errorMessage,
                '',
                '',
                picturePath2,
                ScrapFunctions.fullDate(),
                'PREMIUM',
                platform,
                keyword,
                website
              )
            );
          });

        await browser.close();
        console.log(scrapObj);
        await errorsMod.create(scrapObj);
        success++;
      }
      // ! ADMIN ERRORS
      else {
        var randomnumber3 = uuidv1();
        let picturePath3;
        try {
          await page.screenshot({
            path: `./pictures/ERROR${randomnumber3}.png`,
            fullPage: true
          });
        } catch (error) {
          throw new Error(
            'Error: Protocol error (Page.captureScreenshot): Cannot take screenshot with 0 width.'
          );
        }
        let errorMessage = err.message || err;
        io.emit('premium', `❌ : ${liveStepCount} ${errorMessage} `);
        console.log('Error: ', errorMessage);
        scrapObj = [];

        await cloudinary.uploader
          .upload(`./pictures/ERROR${randomnumber3}.png`)
          .then(res => {
            picturePath3 = res.url;
            io.emit(
              'process7',
              `${liveStepCount} ⌛ Screenshot of error uploaded to cloudinary with success 📶`
            );
            scrapObj.push(
              ScrapFunctions.getTheObject(
                false,
                errorMessage,
                '',
                '',
                picturePath3,
                ScrapFunctions.fullDate(),
                'PREMIUM',
                platform,
                keyword,
                website
              )
            );
          });

        await browser.close();
        console.log(scrapObj);
        await adminErrorsMod.create(scrapObj);
        errorsCount++;
      }
      console.log('ERRORS COUNT', errorsCount);
    }
  }
}

// testPremiumProx(
//   'Afvoer verstopt amsterdam',
//   'ontstoppings-service.nl/loodgieter',
//   1,
//   'Netherlands',
//   'Desktop',
//   'nl'
// );

module.exports = PremiumProx;
