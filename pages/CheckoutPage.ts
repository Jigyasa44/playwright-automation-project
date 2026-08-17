import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {
  }

  async startCheckout() {
    await this.page.getByRole('button', { name: 'Checkout' }).click();
  }

  async enterCustomerInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
    await this.page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill(postalCode);
  }

  async continueToOverview() {
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async finishOrder() {
    await this.page.getByRole('button', { name: 'Finish' }).click();
  }

  async verifyOrderConfirmation() {
    await expect(
      this.page.getByText('Thank you for your order!')
    ).toBeVisible();
  }
}