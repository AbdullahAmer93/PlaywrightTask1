import { Page, Locator } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://practice.automationtesting.in/my-account/');
  }

  private getRegisterButton(): Locator {
    return this.page.locator('input[name="register"]');
  }

  async createAccount(username: string, password: string) {
    await this.page.fill('#reg_email', username);
    await this.page.fill('#reg_password', password);
    const registerButton = this.getRegisterButton();
    await registerButton.waitFor({ state: 'visible', timeout: 60000 });
    await registerButton.click();
  }
}