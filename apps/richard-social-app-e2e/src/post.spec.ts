import { test, expect } from '@playwright/test';

const login = async (page:any) => {
    await page.goto('/login');
  
    await page.locator('#username').fill('richardkc');
    await page.locator('#password').fill('1234567890');
  
    await page.locator('button').click();
  
    await page.waitForURL('/home');
  };

  test('can add post', async ({ page }) => {

    await login(page);
  
    expect(page.url()).toBe('http://localhost:4200/home');
  
    await page.locator('app-home button#add').nth(0).click();
  
    expect(await page.locator('#publishPost').innerText()).toContain('Publish post after submission');
  
    await page.locator('#title').fill('Test Post title');
    await page.locator('#content').fill('Test Post content');
    await page.check('#published');
  
    await page.locator('#submit-post').click();
  
    const successMessage = await page.textContent('#success-message');
    expect(successMessage).toContain('Post added successfully');
  
  });