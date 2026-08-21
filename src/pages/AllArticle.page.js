import { test } from '@playwright/test';
export class AllArticlePage {
    constructor(page) {
        // это браузер
        this.page = page;
        // здесь мы описываем техническую реализацию страницы
        // здесь все про элементы
        this.inputDropdownUser = page.locator('div.nav-link.dropdown-toggle.cursor-pointer');
        this.Profileyou = page.locator('a.dropdown-item:has-text("Profile")');
    }

    // Бизнес-сценарии на страничке
    async myAllArticle() {
        return test.step('Перейти в список всех статей', async () => {
        await this.inputDropdownUser.click();
        await this.Profileyou.click();
        });
    }

}
