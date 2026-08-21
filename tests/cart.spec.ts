import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { loginData, checkoutData } from '../test-data/loginData';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

test('user can add a product to the cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.login(
    loginData.validUser.username,
    loginData.validUser.password
  );

  await expect(page).toHaveURL(/inventory/);

  await productsPage.addBackpackToCart();
  await productsPage.openCart();

  await cartPage.verifyProductInCart('Sauce Labs Backpack');

  await checkoutPage.startCheckout();

  await checkoutPage.enterCustomerInformation(
    checkoutData.firstName,
    checkoutData.lastName,
    checkoutData.postalCode
  );

  await checkoutPage.continueToOverview();
  await checkoutPage.finishOrder();
  await checkoutPage.verifyOrderConfirmation();
});