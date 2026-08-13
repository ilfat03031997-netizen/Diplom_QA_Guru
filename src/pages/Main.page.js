import { test } from '@playwright/test';

export class MainPage {
    constructor(page) {
        // это браузер
        this.page = page;
        // здесь мы описываем техническую реализацию страницы
        // здесь все про элементы
        this.signupButton = page.getByRole('link', { name: 'Sign up' });
        this.loginButton = page.getByRole('link', { name: /login/i });;
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

}
