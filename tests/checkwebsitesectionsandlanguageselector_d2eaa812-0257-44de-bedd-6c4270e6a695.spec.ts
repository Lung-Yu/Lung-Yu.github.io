import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://lung-yu.github.io/');
  await page.getByRole('link', { name: 'Home' }).nth(1).click();
  await page.getByRole('link', { name: 'Skills' }).click();
  await page.getByRole('link', { name: 'Portfolio' }).click();
  await page.getByRole('link', { name: 'Certificates' }).click();
  await page.getByRole('link', { name: 'Curriculum Vitae' }).click();
  await page.getByRole('button', { name: '▼' }).click();
  await page.getByRole('button', { name: 'English' }).click();
  await page.getByRole('heading', { name: 'Management Skills' }).click();
  await page.getByText('Cloudforce Co., Ltd.formerly').first().click();
  await page.getByRole('button', { name: 'English ▼' }).click();
  await page.getByRole('button', { name: '中文' }).click();
  await page.getByText('專注於軟體開發與資安領域，擁有多項國際認證。致力於將安全性融入開發過程中，以創造更安全穩定的軟體系統。').click();
  await page.getByText('雲力橘子股份有限公司原果核數位，橘子集團子公司').first().click();
  await page.getByRole('heading', { name: 'DevSecOps 和自動化安全檢測的敏捷導入' }).click();
});