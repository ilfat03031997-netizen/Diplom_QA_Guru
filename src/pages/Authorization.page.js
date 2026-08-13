import { test } from '@playwright/test';  

export class AuthorizationPage {
    constructor(page) {
        // это браузер
        this.page = page;
        // здесь мы описываем техническую реализацию страницы
        // здесь все про элементы

        this.emailinputA = page.getByRole('textbox', { name: 'Email' });
        this.passwordinputA = page.getByRole('textbox', { name: 'Password' });


        this.LoginButton = page.getByRole('button', { name: 'Login' });

    }

    // Бизнес-сценарии на страничке
    async login(user)
    // ({email, password, username})
    {
        return test.step('Ввод логопасов для авторизации', async () => {
        // Деструктуризация объекта - разбираем объект на переменные
        const { email, password, username } = user;

        await this.emailinputA.click();
        await this.emailinputA.fill(email);
        await this.passwordinputA.click();
        await this.passwordinputA.fill(password);
        await this.LoginButton.click();
        });
    }


}
