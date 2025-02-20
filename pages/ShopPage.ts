import { Page } from '@playwright/test';

export class ShopPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://practice.automationtesting.in/shop/');
  }

  async addItemToBasket() {
    await this.page.click("//div[@id='content']/ul//a[@href='/shop/?add-to-cart=169']");
    await this.page.waitForSelector("//div[@id='content']/ul//a[@title='View Basket']", { timeout: 60000 }); // Wait for the "View Basket" button to appear
    await this.page.click("//div[@id='content']/ul//a[@title='View Basket']");
  }
}