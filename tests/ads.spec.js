const { chromium } = require('playwright');
const { test } = require('@playwright/test');

test.setTimeout(2700000);

// const userAgents = [
//   'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
//   'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
//   'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
//   'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0',
//   'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
//   'Mozilla/5.0 (iPad; CPU OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Mobile/15E148 Safari/604.1',
//   'Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.92 Mobile Safari/537.36',
//   'Mozilla/5.0 (Linux; Android 9; SM-G960U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.92 Mobile Safari/537.36',
//   'Mozilla/5.0 (X11; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0',
//   'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0',
//   'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko',
//   'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:92.0) Gecko/20100101 Firefox/92.0',
//   'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_6; en-us) AppleWebKit/533.19.4 (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4',
//   // Add more user agents as needed
// ];

test.describe('My Test Suite', () => {
  test('My Test Case', async ({}) => {
    while (true) {
  const browser = await chromium.launch({ headless: false });
  // const context = await browser.newContext({
  //   userAgent: getRandomUserAgent(),
  // });
  const page = await browser.newPage();
  await page.setDefaultTimeout(60000);
  await searchForWebsite(page);

  await browser.close();
    }
  });
});

async function searchForWebsite(page) {
  await page.goto('https://google.com');
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press('Tab');
}
await page.keyboard.press('Enter');
  
  await page.locator("//textarea[@role='combobox' and @spellcheck='false']").fill("bitheap");
  await page.keyboard.press('Enter');
  await page.locator("//h3[contains(text(), 'bitheap')]").nth(0).click();
  await page.click('#menu-item-1303');
  await page.waitForTimeout(15000);
  await scrollToBottom(page);
  await page.waitForTimeout(5000);
  await page.waitForSelector('iframe#aswift_1');
  const frameHandle = await page.$('iframe#aswift_1');
  const frame = await frameHandle.contentFrame();
  
  try {
    await frame.waitForSelector('a[href*="adclick.g.doubleclick.net/aclk"]');
    await frame.click('a[href*="adclick.g.doubleclick.net/aclk"]');
} catch (error) {
    // Element not found, use your alternative selector
    await frame.waitForSelector('a[href*="googleads.g.doubleclick.net/aclk"]');
    await frame.click('a[href*="googleads.g.doubleclick.net/aclk"]');
}
  await page.waitForTimeout(10000);
  
}

async function scrollToBottom(page) {
  const distance = 100; // should be less than or equal to window.innerHeight
  const delay = 100; // time in ms between scrolls
  while (await page.evaluate(() => document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight)) {
      await page.evaluate((y) => { document.scrollingElement.scrollBy(0, y); }, distance);
      await page.waitForTimeout(delay);
  }
}

function getRandomUserAgent() {
  return userAgents[Math.floor(Math.random() * userAgents.length)];
}


