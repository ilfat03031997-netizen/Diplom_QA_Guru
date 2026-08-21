import { test } from '@playwright/test';

export class MainPage {
    constructor(page) {
        // это браузер
        this.page = page;
        // здесь мы описываем техническую реализацию страницы
        // здесь все про элементы
        this.signupButton = page.getByRole('link', { name: 'Sign up' });
        this.loginButton = page.getByRole('link', { name: /login/i });;
        this.errorMessages = page.locator('main .error-messages');
        this.dropdownMenu = page.locator('div.nav-link.dropdown-toggle.cursor-pointer');
        this.dropdownLogout = page.getByRole('link', { name: 'Logout' });
    }

    // Бизнес-сценарии на страничке
    async goto() {
        return test.step('Перейти на сайт', async () => {
        await this.page.goto('/');
        });
    }
    async gotoRegister() {
        return test.step('Перейти на форму регистрации', async () => {
        await this.signupButton.click();
        });
    }
    async gotoAuthorization() {
        return test.step('Авторизоваться', async () => {
        await this.loginButton.click();
        });
    }

     async gotologout() {
    return test.step('Выход из системы и очистка сессии', async () => {
      await this.dropdownMenu.click();
      await this.dropdownLogout.click();
      await this.signupButton.waitFor({ state: 'visible' });
    });
    }

    getError() {
    return this.errorMessages;
    }
 
}
