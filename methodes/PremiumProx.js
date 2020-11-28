const config = require('../config');
const random = require('random');
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

async function createLogs(id, type, message) {
  
    await Task.findByIdAndUpdate(
      { _id: id },
      { $addToSet: { logs: { type, message } } },
      function(err, model) {
        console.log(err);
      }
    )
  );
}

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
    await createLogs(
      taskId,
      'normal',
      `${random.int(1, 100000)} launching the chrome browser`
    );
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
      await createLogs(taskId, 'normal', 'Proxy authentication');
      await page.authenticate({
        username: 'cathli5u',
        password: `NNW5u5R612Bj3PkL_country-${proxyCountry}`
      });
      await createLogs(
        taskId,
        'normal',
        `${random.int(1, 100000)} Block all images and other media files`
      );
      blockResourcesPlugin.blockedTypes.add('image');
      blockResourcesPlugin.blockedTypes.add('media');
      try {
        await createLogs(
          taskId,
          'normal',
          `${random.int(1, 100000)} Opening google.${googleCountry}`
        );
        await page.goto(`https://google.${googleCountry}`, {
          waitUntil: 'networkidle2'
        });
      } catch (error) {
        await createLogs(
          taskId,
          'normal',
          `${random.int(1, 100000)} Select the search input`
        );
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
      await createLogs(
        taskId,
        'normal',
        `${random.int(1, 100000)} Bypass the popup`
      );

      await ele.click();

      await page.waitFor(5000);
      await page.click('[name=q]').catch(err => {
        throw err;
      });
      await createLogs(
        taskId,
        'normal',
        `${random.int(1, 100000)} Typing the keyword : ${keywordToFocus}`
      );
      await page.keyboard.type(keywordToFocus, {
        delay: 80
      });

      await page.keyboard.press('Enter');

      await page.waitFor(9000);
      await createLogs(
        taskId,
        'normal',
        `${random.int(1, 100000)} Checking if google return a captcha`
      );

      let captcha = await page.$x(`//*[@id="recaptcha"]`);
      if (captcha.length !== 0) {
        await createLogs(
          taskId,
          'error',
          `${random.int(
            1,
            100000
          )} Captcha is here.. retry with another fresh IP`
        );

        console.log('CAPTCHA DETECTED');
        throw new Error('captcha detected');
      }
      await page.waitFor(2000);

      for (i = 0; i < websites.length; i++) {
        await createLogs(
          taskId,
          'normal',
          `${random.int(1, 100000)} check if an ads of ${
            websites[i]
          } is available to click`
        );

        const elements = await page.$x(
          "//a[contains(., '" + websites[i] + "')]"
        );
        if (elements.length === 0) {
          await createLogs(
            taskId,
            'error',
            `${random.int(
              1,
              100000
            )} no ads for that site with the keyword you selected`
          );

          success++;
          var randomnumber2 = uuidv1();
          let picturePath2;
          try {
            await createLogs(
              taskId,
              'normal',
              `${random.int(1, 100000)} Uploading a picture to cloudinary`
            );

            await page.screenshot({
              path: `./pictures/ERROR${randomnumber2}.png`,
              fullPage: true
            });
          } catch (error) {
            await createLogs(
              taskId,
              'error',
              `${random.int(1, 100000)} cannot take screenshot with 0 width`
            );

            throw new Error(
              'Error: Protocol error (Page.captureScreenshot): Cannot take screenshot with 0 width.'
            );
          }
          console.log('im currently uploading the picture to cloudinary');

          await cloudinary.uploader
            .upload(`./pictures/ERROR${randomnumber2}.png`)
            .then(async res => {
              await createLogs(
                taskId,
                'normal',
                `${random.int(1, 100000)} Screenshot is uploaded with success`
              );

              picturePath2 = res.url;
              let CurrentuserAgent = await browser.userAgent();
              let CurrentViewPort = await page.viewport();
              await createLogs(
                taskId,
                'normal',
                `${random.int(1, 100000)} Update the database records`
              );

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
        await createLogs(
          taskId,
          'normal',
          `${random.int(1, 100000)} Click on the first Ad`
        );
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
          await createLogs(
            taskId,
            'normal',
            `${random.int(
              1,
              100000
            )} Upload a screenshot of the website to cloudinary`
          );
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
        await createLogs(
          taskId,
          'normal',
          `${random.int(
            1,
            100000
          )} Getting the current page title and current link`
        );

        const CurrentPageTitle = await page2.title();
        pageTitle = CurrentPageTitle;
        const CurrentPageLink = await page2.url();
        console.log('Current title', CurrentPageTitle);
        await cloudinary.uploader
          .upload(`./pictures/${randomnumber}.png`)
          .then(async res => {
            picturePath = res.url;
            await createLogs(
              taskId,
              'normal',
              `${random.int(
                1,
                100000
              )} Upload a screenshot of the website to cloudinary`
            );
          });

        await page.waitFor(2000);

        success++;
        await createLogs(
          taskId,
          'normal',
          `${random.int(1, 100000)} Success count ${success}`
        );

        await page.waitFor(2000);

        let CurrentuserAgent = await browser.userAgent();
        let CurrentViewPort = await page2.viewport();
        await createLogs(
          taskId,
          'normal',
          `${random.int(
            1,
            100000
          )} Current UserAgent ${CurrentuserAgent}, current view report ${CurrentViewPort}`
        );

        await createLogs(
          taskId,
          'normal',
          `${random.int(
            1,
            100000
          )} Updating the database record with the new data`
        );

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
        await createLogs(taskId, 'normal', `Closing the page2`);

        await page.bringToFront();
        await page.waitFor(2000);
      }
      await createLogs(
        taskId,
        'normal',
        `${random.int(1, 100000)} Closing the browser`
      );
      await browser.close();
    } catch (err) {
      console.log(err);
      // ! CLIENT ERRORS :
      if (err.message === 'No ads found for this website') {
        success++;
      }
      // ! ADMIN ERRORS
      else {
        await createLogs(
          taskId,
          'error',
          `${random.int(1, 100000)} Adming error`
        );
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
    await createLogs(
      taskId,
      'normal',
      `${random.int(1, 100000)} Making the task as Finished`
    );
    await Task.findByIdAndUpdate(taskId, {
      dateFinished: Date.now(),
      status: 'finished'
    });
  }
}

module.exports = PremiumProx;
