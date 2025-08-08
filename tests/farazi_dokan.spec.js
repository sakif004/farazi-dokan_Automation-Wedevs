import { test, expect } from '@playwright/test';
import { SignupPage } from '../pages/SignupPage';


test.describe('Farazi Dokan Automation', async () => {
  test('User @signup successfully test', async ({ page }) => {

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
    // Validate that the user is signed up successfully
    await signupPage.validateSignupSuccess();
  });

  // Test for login and profile update
  test('Login and Profile Update Test', async ({ page }) => {

    await page.goto('https://farazi.staging.dokandev.com/login'); // Navigate to the login page
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

    // Validate profile update success by using API response
    const response = await page.waitForResponse(response =>
      response.url().includes('/api/v1/user/my-account/profile') &&
      response.request().method() === 'PATCH' &&
      response.status() === 200
    );

    const responseData = await response.json();
    expect(responseData.message).toBe('Profile has been updated successfully!');
    expect(responseData.data.mobile).toBe('01970741571');

  });


  //Update address file
  test.only('Update Address Test', async ({ page }) => {

    await page.goto('https://farazi.staging.dokandev.com/login'); // Navigate to the login page

    //login 
    await page.getByRole('textbox', { name: 'Email' }).fill('test123@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Test@123');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();

    //update address
    await page.getByRole('link', { name: 'Addresses' }).click();
    await page.getByRole('button', { name: 'Add New Address' }).click();
    await page.getByRole('textbox', { name: 'First Name *' }).click();
    await page.getByRole('textbox', { name: 'First Name *' }).fill('Sakifur');
    await page.getByRole('textbox', { name: 'Last Name *' }).click();
    await page.getByRole('textbox', { name: 'Last Name *' }).fill('Rahman');
    await page.locator('.css-17wv8nz').click();
    await page.getByRole('option', { name: 'Bangladesh' }).click();
    await page.getByRole('textbox', { name: 'Enter address' }).click();
    await page.getByRole('textbox', { name: 'Enter address' }).fill('south banasree');
    await page.getByText('South Banasree Central Jame MasjidRoad No-12, Dhaka, Bangladesh').click();
    await page.getByRole('textbox', { name: 'Apartment (Optional)' }).click();
    await page.getByRole('textbox', { name: 'Apartment (Optional)' }).fill('test');
    await page.locator('.grid > div > .react-select > .shipping-searchselect > .\\!border-gray-200 > .css-hlgwow > .css-17wv8nz').click();
    await page.getByRole('textbox', { name: 'Postal Code' }).click();
    await page.pause();
    await page.getByRole('textbox', { name: 'Postal Code' }).fill('1219');
    await page.getByRole('textbox', { name: 'Type a label for effective' }).fill('Home');
    await page.getByRole('button', { name: 'Save' }).click();


  });

});