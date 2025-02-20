import { Page } from '@playwright/test';

export class BasketPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://practice.automationtesting.in/basket/');
  }

  async proceedToCheckout() {
    await this.page.waitForSelector("//a[@href='https://practice.automationtesting.in/checkout/']", { timeout: 60000 }); // Wait for the "Proceed to Checkout" button to appear
    await this.page.click("//a[@href='https://practice.automationtesting.in/checkout/']");
  }
}