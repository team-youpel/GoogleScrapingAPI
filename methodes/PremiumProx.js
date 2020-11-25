const config = require('../config');

const puppeteer = require('puppeteer-extra');
const { v1: uuidv1 } = require('uuid');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const Task = require('../models/taskModel');
const randomUseragent = require('random-useragent');
const userAgent = randomUseragent.getRandom();
const dotenv = require('dotenv');
dotenv.config({ path: `./config.env` });
var cloudinary = require('cloudinary').v2;

const blockResourcesPlugin = require('puppeteer-extra-plugin-block-resources')();

puppeteer.use(blockResourcesPlugin);
puppeteer.use(StealthPlugin());

// ! CLoudinary API Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// ! ***************************************************************** ! //

async function PremiumProx(
  taskName,
  cronJobTaskid,
  keywordToFocus,
  websites,
  clickForEachWebsite,
  proxyCountry,
  platform = 'Desktop',
  googleCountry = 'Com'
) {
  let pageTitle;
  let liveStepCount;
  let page;
  let browser;
  let index;
  let taskId;
  let success = 0;
  let HowMuch = 0;
  let errorsCount = 0;
  HowMuch = clickForEachWebsite * websites.length;

  if (!cronJobTaskid) {
    const currentTask = await Task.create({
      taskName: taskName,
      dateLaunched: Date.now(),
      websites: websites,
      status: 'running'
    });
    taskId = currentTask._id;
  } else {
    taskId = cronJobTaskid;
    const editingTask = await Task.findByIdAndUpdate(taskId, {
      status: 'running'
    });
  }

  while (success < HowMuch && errorsCount < 500) {
    liveStepCount = success + 1 + '/' + clickForEachWebsite;

    try {
      browser = await puppeteer.launch({
        headless: config.headlessType,
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

      await page.waitFor(7000);
      await page.authenticate({
        username: 'cathli5u',
        password: `NNW5u5R612Bj3PkL_country-${proxyCountry}`
      });
      blockResourcesPlugin.blockedTypes.add('image');
      blockResourcesPlugin.blockedTypes.add('media');
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
      await page.waitForSelector('iframe');
      const elementHandle = await page.$('iframe');
      const frame = await elementHandle.contentFrame();
      const ele = await frame.$('#introAgreeButton > span > span');
      await ele.click();

      await page.waitFor(5000);
      await page.click('[name=q]').catch(err => {
        throw err;
      });

      await page.keyboard.type(keywordToFocus, {
        delay: 80
      });

      await page.keyboard.press('Enter');

      await page.waitFor(9000);

      let captcha = await page.$x(`//*[@id="recaptcha"]`);
      if (captcha.length !== 0) {
        console.log('CAPTCHA DETECTED');
        throw new Error('captcha detected');
      }
      await page.waitFor(2000);

      for (i = 0; i < websites.length; i++) {
        const elements = await page.$x(
          "//a[contains(., '" + websites[i] + "')]"
        );
        if (elements.length === 0) {
          success++;
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
          console.log('im currently uploading the picture to cloudinary');

          await cloudinary.uploader
            .upload(`./pictures/ERROR${randomnumber2}.png`)
            .then(async res => {
              picturePath2 = res.url;
              let CurrentuserAgent = await browser.userAgent();
              let CurrentViewPort = await page.viewport();

              await Task.findOneAndUpdate(
                { _id: taskId },
                {
                  $addToSet: {
                    failedClicks: {
                      screenShot: picturePath2,
                      clickedAt: Date.now(),
                      userAgent: CurrentuserAgent,
                      screenResolution: CurrentViewPort,
                      errorMessage: `No ads found for ${websites[i]}`
                    }
                  }
                },
                function(err, docs) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log('Original Doc : ', docs);
                  }
                }
              );
            });

          continue;
        }
        await page.waitFor(3000);
        const newPagePromise = new Promise(x =>
          browser.once('targetcreated', target => x(target.page()))
        ); // declare promise
        await elements[0].click({ button: 'middle' });
        let page2 = await newPagePromise;
        await page2.bringToFront();
        await page2.waitForNavigation({
          waitUntil: 'networkidle0',
          timeout: 120000
        }),
          await page2.waitFor(5000);

        var randomnumber = uuidv1();
        try {
          await page2.screenshot({
            path: `./pictures/${randomnumber}.png`,
            fullPage: true
          });
        } catch (error) {
          throw new Error(
            'Error: Protocol error (Page.captureScreenshot): Cannot take screenshot with 0 width.'
          );
        }

        await page.waitFor(4000);

        const CurrentPageTitle = await page2.title();
        pageTitle = CurrentPageTitle;
        const CurrentPageLink = await page2.url();
        console.log('Current title', CurrentPageTitle);
        await cloudinary.uploader
          .upload(`./pictures/${randomnumber}.png`)
          .then(res => {
            picturePath = res.url;
          });

        await page.waitFor(2000);

        success++;
        console.log('SUCCESS COUNT', success);
        await page.waitFor(2000);
        let CurrentuserAgent = await browser.userAgent();
        let CurrentViewPort = await page2.viewport();
        await Task.findOneAndUpdate(
          { _id: taskId },
          {
            $addToSet: {
              successfulClicks: {
                screenShot: picturePath,
                pageTitle: CurrentPageTitle,
                clickedAt: Date.now(),
                userAgent: CurrentuserAgent,
                screenResolution: CurrentViewPort
              }
            }
          }
        );

        await page2.goto('about:blank');
        await page2.close();
        await page.bringToFront();
        await page.waitFor(2000);
      }
      await browser.close();
    } catch (err) {
      console.log(err);
      // ! CLIENT ERRORS :
      if (err.message === 'No ads found for this website') {
        success++;
      }
      // ! ADMIN ERRORS
      else {
        await browser.close();
        errorsCount++;
      }
      console.log('ERRORS COUNT', errorsCount);
    }
  }

  if (success === HowMuch) {
    console.log(
      'Hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii'
    );
    await Task.findByIdAndUpdate(taskId, {
      dateFinished: Date.now(),
      status: 'finished'
    });
  }
}

module.exports = PremiumProx;
