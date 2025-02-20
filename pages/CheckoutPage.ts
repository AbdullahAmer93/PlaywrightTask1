import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillBillingDetails(details: { firstName: string; lastName: string; address: string; city: string; postcode: string; phone: string; email: string }) {
    await this.page.fill('#billing_first_name', details.firstName);
    await this.page.fill('#billing_last_name', details.lastName);
    await this.page.fill('#billing_address_1', details.address);
    await this.page.fill('#billing_city', details.city);
    await this.page.fill('#billing_postcode', details.postcode);
    await this.page.fill('#billing_phone', details.phone);
    await this.page.fill('#billing_email', details.email);
  }

  async verifyItemDetails(itemName: string, itemPrice: string) {
    await this.page.waitForSelector("td:has-text('Android Quick Start Guide')", { timeout: 60000 });
    const name = await this.page.textContent("td:has-text('Android Quick Start Guide')");
    const price = await this.page.textContent('.product-total .amount');
    console.log(`Expected item name: ${itemName}`);
    console.log(`Actual item name on checkout page: ${name}`);
    console.log(`Expected item price: ${itemPrice}`);
    console.log(`Actual item price on checkout page: ${price}`);
    if (name && price) {
      return name.includes(itemName) && price.includes(itemPrice);
    }
    return false;
  }
}