import { test, expect } from '@playwright/test';
import { HomePOM } from './POMClasses/HomePOM';
import { LoginPOM } from './POMClasses/LoginPOM'

test('Can we log in', async ({ page }) => {
  //Arrange
  await page.goto('https://www.edgewordstraining.co.uk/webdriver2/');
  await page.getByRole('link', { name: 'Login To Restricted Area' }).click();
  //Act
  await page.getByRole('row', { name: 'User Name?' }).locator('#username').click();
  await page.getByRole('row', { name: 'User Name?' }).locator('#username').fill('edgewords');
  await page.locator('#password').click();
  await page.locator('#password').fill('edgewords123XXXX');
  await page.getByRole('link', { name: 'Submit' }).click();
  //Assert
  await expect(page.locator('h1')).toContainText('Add A Record To the Database');
});

test('Login using OR', async({page})=>{
  await page.goto('https://www.edgewordstraining.co.uk/webdriver2/');
  const HomePageRepo = new HomePOM(page);
  await HomePageRepo.loginLink.click();
  const LoginPageRepo = new LoginPOM(page);
  await LoginPageRepo.usernameField.fill("edgewords");
  await LoginPageRepo.passwordField.fill("edgewords123");
  await LoginPageRepo.submitButton.click();
});

test("Login using POM", async({page})=>{
  await page.goto('https://www.edgewordstraining.co.uk/webdriver2/');
  const HomePage = new HomePOM(page);
  await HomePage.goLogin();
  const LoginPage = new LoginPOM(page);
  LoginPage.doLogin("edgewords","edgewords123");
  //await LoginPage.usernameField.fill("edgewords") // wont work as usernameField is private
});