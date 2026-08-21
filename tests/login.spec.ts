import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { loginData, invalidLoginData } from '../test-data/loginData';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

test('user can login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login(
    loginData.validUser.username,
    loginData.validUser.password
  );

  await expect(page).toHaveURL(/inventory/);
});

for (const data of invalidLoginData) {
  test(`user cannot login with ${data.testName}`, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(data.username, data.password);

    await expect(
      page.getByText(
        'Epic sadface: Username and password do not match any user in this service'
      )
    ).toBeVisible();
  });
}