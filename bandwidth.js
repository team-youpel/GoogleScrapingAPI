const puppeteer = require('puppeteer-extra');
const fs = require('fs').promises;
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

let browser;
async function bandwidthFun() {
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--single-process'
      ],
      ignoreDefaultArgs: ['--disable-extensions'],
      ignoreHTTPSErrors: true
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30'
    );

    await page.goto('https://app.proxy-cheap.com/login');
    await page
      .waitForFunction(() => document.querySelector('#inputEmail'))
      .then(res => console.log('Email Input is loaded'));
    await page
      .waitForFunction(() => document.querySelector('#inputPassword'))
      .then(res => console.log('Password Input is loaded'));
    await page
      .waitForFunction(() => document.querySelector('form > div > button'))
      .then(res => console.log('Button is loaded'));
    await page.type('#inputEmail', 'brahim.akarouch@gmail.com', {});
    await page.type('#inputPassword', 'C8AvxBehb!xBy4f', {});
    await page.click('form > div > button');

    await page
      .waitForFunction(() => document.querySelector('a.aside-logo'))
      .then(res => console.log('Dashboard is loaded'));
    // await page.goto(
    //   'https://app.proxy-cheap.com/dashboard/services/my-proxies'
    // );
    await page
      .waitForFunction(() => document.querySelector('.table-dashboard'))
      .then(res => console.log('Residential Tab is loaded'));
    await page.click(
      'div.table-responsive > table > tbody > tr > td:nth-child(5) > a'
    );
    await page
      .waitForFunction(() =>
        document.querySelector(
          'div:nth-child(2) > div > div.card-body > table > tbody > tr:nth-child(1) > td:nth-child(2)'
        )
      )
      .then(res => console.log('Infos are loaded'));

    const bandwidthLimit = await page.$eval(
      'div:nth-child(2) > div > div.card-body > table > tbody > tr:nth-child(1) > td:nth-child(2)',
      el => el.textContent
    );
    const bandwidthUsage = await page.$eval(
      'div:nth-child(2) > div > div.card-body > table > tbody > tr:nth-child(2) > td:nth-child(2)',
      el => el.textContent
    );
    const activateOn = await page.$eval(
      'div:nth-child(2) > div > div.card-body > table > tbody > tr:nth-child(3) > td:nth-child(2)',
      el => el.textContent
    );
    const status = await page.$eval(
      'table > tbody > tr:nth-child(3) > td:nth-child(2) > span',
      el => el.textContent
    );

    let Fulldata = {
      message: 'Success',
      bandwidthLimit: bandwidthLimit.replace('\n', '').replace('\n', ''),
      bandwidthUsage: bandwidthUsage.replace('\n', '').replace('\n', ''),
      activateOn: activateOn.replace('\n', '').replace('\n', ''),
      status
    };
    console.log(Fulldata);
    await browser.close();
    return Fulldata;
    // other actions...
    // await browser.close();
  } catch (error) {
    let Fulldata = {
      message: error.message,
      bandwidthLimit: '',
      bandwidthUsage: '',
      activateOn: '',
      status: ''
    };
    await browser.close();

    return Fulldata;
  }
}


module.exports = bandwidthFun;
