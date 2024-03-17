const { chromium } = require('playwright');
const { test, expect } = require('@playwright/test');

test.setTimeout(600000);

test.describe('My Test Suite', () => {
  test('My Test Case', async ({}) => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.setDefaultTimeout(60000);
  await searchForWebsite(page);

  await browser.close();

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
  await page.waitForSelector('iframe#aswift_4');
  const frameHandle = await page.$('iframe#aswift_4');
  const frame = await frameHandle.contentFrame();
  await frame.waitForSelector('a[href*="adclick.g.doubleclick.net/aclk"] > svg');
  await frame.click('a[href*="adclick.g.doubleclick.net/aclk"] > svg');
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



