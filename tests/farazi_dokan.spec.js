import { test, expect } from '@playwright/test';
import { SignupPage } from '../pages/SignupPage';


test.describe('Farazi Dokan Automation', async () => {
  test('User sign up successfully test', async ({ page }) => {

    //Using page object model for signup
    const signupPage = new SignupPage(page);

    await signupPage.goto();
    await signupPage.clickSignup();
    await signupPage.fillRegistrationForm(
      'Sakifur',
      'Rahman',
      `sakifur${Date.now()}@example.com`, // unique email
      'Test@1234'
    );
    await signupPage.submitForm();
    await signupPage.validateSignupSuccess();
  });


  test('Login and Profile Update Test', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://farazi.staging.dokandev.com/login');
    // await page.pause();

    //login page
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('test123@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('Test@123');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();

    // Validate login success
    await expect(page.getByRole('heading', { name: 'My Account' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Personal Profile' })).toBeVisible();

    //Edit profile
    // await page.pause();
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('textbox', { name: 'Mobile' }).click();
    await page.getByRole('textbox', { name: 'Mobile' }).fill('01970741571');
    await page.getByRole('textbox', { name: 'Select your birthday' }).click();
    await page.getByRole('spinbutton', { name: 'Year' }).click();
    await page.getByRole('spinbutton', { name: 'Year' }).fill('1998');
    await page.getByLabel('Month').selectOption('5');
    await page.getByLabel('June 7,').click();
    await page.getByRole('button', { name: 'Male', exact: true }).click();
    await page.getByRole('button', { name: 'Save Changes' }).click();


    // Validate profile update success
    // Validate by using API response
    const response = await page.waitForResponse(response =>
      response.url().includes('/api/v1/user/my-account/profile') &&
      response.request().method() === 'PATCH' &&
      response.status() === 200
    );

    const responseData = await response.json();
    expect(responseData.message).toBe('Profile has been updated successfully!');
    expect(responseData.data.mobile).toBe('01970741571');

  });

});