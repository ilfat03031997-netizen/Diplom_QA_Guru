import { test } from '@playwright/test';

export class EditUserPage {
    constructor(page) {
        // это браузер
        this.page = page;
        // здесь мы описываем техническую реализацию страницы
        // здесь все про элементы

        this.UserDropdown = page.locator('div.nav-link.dropdown-toggle.cursor-pointer');
        this.SettingsBut = page.getByText('Settings', { exact: true });
        this.Shortbio = page.getByRole('textbox', { name: 'Short bio about you' });
        this.UpdateSettingsB = page.getByRole('button', { name: 'Update Settings' });
        this.ShortbioUpdate = page.locator('[name="bio"]');
    }


    // Бизнес-сценарии на страничке
    async EditSettings(EditUser) {
        return test.step('Редактирование данных юзера', async () => {


        await this.UserDropdown.click();
        await this.SettingsBut.click();
        await this.Shortbio.click();
        await this.Shortbio.clear(); // Явная очистка поля
        await this.Shortbio.fill(EditUser);
        await this.UpdateSettingsB.click();
        });
    }

    GetBio() {
    return this.ShortbioUpdate;
    }


}
