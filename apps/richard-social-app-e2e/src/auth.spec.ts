import { test, expect } from '@playwright/test';

function generateRandomString(length: number) {
  return Math.random().toString(36).substring(2, 2 + length);
}

test('can create account', async ({ page }) => {
  await page.goto('/sign-up');

  const randomUsername = generateRandomString(10);
  const randomEmail = `${generateRandomString(5)}@test.com`;

  await page.locator('#username').fill(randomUsername);
  await page.locator('#email').fill(randomEmail);
  await page.locator('#password').fill('1234567890');

  await page.locator('button').click();

  await page.waitForURL('/login');
  expect(page.url()).toBe('http://localhost:4200/login');

  expect(await page.locator('#login').innerText()).toContain('Hello there,');
});

const login = async (page:any) => {
  await page.goto('/login');

  await page.locator('#username').fill('richardkc');
  await page.locator('#password').fill('1234567890');

  await page.locator('button').click();

  await page.waitForURL('/home');
};

test('can login', async ({ page }) => {
 
  await login(page);

  expect(page.url()).toBe('http://localhost:4200/home');

  expect(await page.locator('#posts').innerText()).toContain('My Post(s)');
});