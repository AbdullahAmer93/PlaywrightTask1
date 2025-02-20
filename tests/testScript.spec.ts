import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ShopPage } from '../pages/ShopPage';
import { BasketPage } from '../pages/BasketPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import * as testData from './resources/testData.json';

function generateUniqueEmail(baseEmail: string): string {
  const timestamp = Date.now();
  const [localPart, domain] = baseEmail.split('@');
  return `${localPart}${timestamp}@${domain}`;
}

test('Create account, add item to basket, and checkout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const shopPage = new ShopPage(page);
  const basketPage = new BasketPage(page);
  const checkoutPage = new CheckoutPage(page);

  const uniqueEmail = generateUniqueEmail(testData.username);

  await loginPage.navigate();
  await loginPage.createAccount(uniqueEmail, testData.password);

  await shopPage.navigate();
  await shopPage.addItemToBasket();

  await basketPage.proceedToCheckout();

  await checkoutPage.fillBillingDetails(testData.billingDetails);
  const isItemDetailsCorrect = await checkoutPage.verifyItemDetails(testData.itemName, testData.itemPrice);

  expect(isItemDetailsCorrect).toBe(true);
});