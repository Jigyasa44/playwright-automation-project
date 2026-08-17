import { CheckoutPage } from '../pages/CheckoutPage';
import { CartPage } from '../pages/CartPage';
import { ProductsPage } from '../pages/ProductsPage';
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
test('user can add a product to the cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await loginPage.login(
    loginData.validUser.username,
    loginData.validUser.password
  );

  await expect(page).toHaveURL(/inventory/);

  await productsPage.addBackpackToCart();

  await productsPage.openCart();

  await cartPage.verifyProductInCart('Sauce Labs Backpack');
  const checkoutPage = new CheckoutPage(page);

  await checkoutPage.startCheckout();
await checkoutPage.enterCustomerInformation(
  'Jigyasa',
  'Sharma',
  '110001'
);
await checkoutPage.continueToOverview();

await checkoutPage.finishOrder();

await checkoutPage.verifyOrderConfirmation();
});
test('user cannot checkout without required information', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.login(
    loginData.validUser.username,
    loginData.validUser.password
  );

  await productsPage.addBackpackToCart();
  await productsPage.openCart();

  await cartPage.verifyProductInCart('Sauce Labs Backpack');

  await checkoutPage.startCheckout();

  await checkoutPage.continueToOverview();

  await expect(
    page.getByText('Error: First Name is required')
  ).toBeVisible();
});
test('user cannot login with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('https://www.saucedemo.com/');

  await loginPage.login(
    'invalid_user',
    'wrong_password'
  );

  await expect(
    page.getByText('Epic sadface: Username and password do not match any user in this service')
  ).toBeVisible();
});