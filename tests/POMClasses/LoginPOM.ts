import {Page, Locator} from '@playwright/test'

export class LoginPOM {

    //Fields
    #page: Page
    usernameField: Locator 
    passwordField: Locator
    submitButton: Locator

    constructor(page: Page){
        this.#page = page;

        //Locators
        //this.#usernameField = page.getByRole('row', { name: 'User Name?' }).locator('#username');
        this.usernameField = page.locator('#Login #username')
        this.passwordField = page.locator('#password'); 
        this.submitButton = page.getByRole('link', { name: 'Submit' });
    }

    //Service methods - "low level"
    async setUsername(username: string) {await this.usernameField.fill(username) }
    async setPassword(password: string) {await this.passwordField.fill(password) }
    async submitForm() {await this.submitButton.click() }
    //"Higher level"
    async doLogin(username: string, password: string) {
        await this.setUsername(username);
        await this.setPassword(password);
        await this.submitForm();
    }

}