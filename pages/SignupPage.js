const { expect } = require('@playwright/test');

exports.SignupPage = class SignupPage {
  constructor(page) {
    this.page = page;
    this.signupLink = page.getByRole('link', { name: 'Signup' });
    this.firstNameField = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameField = page.getByRole('textbox', { name: 'Last Name' });
    this.emailField = page.getByRole('textbox', { name: 'Email' });
    this.passwordField = page.getByRole('textbox', { name: 'Password', exact: true });
    this.confirmPasswordField = page.getByRole('textbox', { name: 'Confirm Password' });
    this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
    this.successToast = page.getByText('Registration successful!');

  }

  async goto() {
    await this.page.goto('https://farazi.staging.dokandev.com/');
  }

  async clickSignup() {
    await this.signupLink.click();
  }

  async fillRegistrationForm(firstName, lastName, email, password) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.confirmPasswordField.fill(password);
  }

  async submitForm() {
    await this.createAccountButton.click();
  }

  async validateSignupSuccess() {
    await expect(this.successToast).toBeVisible();
  }
}

