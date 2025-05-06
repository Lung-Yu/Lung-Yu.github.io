import { test, expect } from '@playwright/test';

test('Check background elements', async ({ page }) => {
  // Navigate to the site
  await page.goto('http://localhost:5173/');
  
  // Wait for the floating orbs to render
  await page.waitForSelector('.floating-orbs-container', { timeout: 5000 });
  
  // Take a screenshot of the hero section with the new background elements
  await page.screenshot({ path: 'floating-orbs-screenshot.png' });

  // Wait for a moment to see the animation
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log('Screenshot saved as floating-orbs-screenshot.png');
});
