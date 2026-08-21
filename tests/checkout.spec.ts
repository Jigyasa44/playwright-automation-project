import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { loginData } from '../test-data/loginData';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
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