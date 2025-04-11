import { test } from '@playwright/test';

test('Check Website Sections and Language Selector', async ({ page }) => {
  // Navigate to the website
  await page.goto('https://lung-yu.github.io/');

  // Verify the presence of sections
  await page.waitForSelector('section#home');
  await page.waitForSelector('section#skills');
  await page.waitForSelector('section#projects');
  await page.waitForSelector('section#consulting');
  await page.waitForSelector('section#certificates');

  // Interact with the language selector
  await page.click('.lang-select-btn');
  await page.click('text=中文');

  // Verify the language change
  await page.waitForSelector('text=你好，我是');

  // Take a screenshot
  await page.screenshot({ path: 'tests-reports/language-switch-to-chinese.png', fullPage: true });
});