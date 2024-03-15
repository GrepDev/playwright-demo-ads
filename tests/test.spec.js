const { chromium } = require('playwright');
const { test, expect } = require('@playwright/test');

test.describe('My Test Suite', () => {
  test('My Test Case', async ({}) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await searchForWebsite(page);

  await browser.close();

  });
});

async function searchForWebsite(page) {
  await page.goto('https://google.com');
  await page.$x("//textarea[@role='combobox' and @spellcheck='false']").fill("bitheap");
  await page.$x("//input[@value='Google Search']").click();
  await page.$x("//h3[contains(text(), 'bitheap')]").click();
  await page.click('#menu-item-1303');
  await page.waitForTimeout(15000);
  await page.$x("//a[contains(@href, 'adclick.g.doubleclick.net')]").click();
}




