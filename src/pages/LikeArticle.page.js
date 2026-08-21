import { test } from '@playwright/test';

export class LikeArticlePage {
    constructor(page) {
        // это браузер
        this.page = page;
        // здесь мы описываем техническую реализацию страницы
        // здесь все про элементы
        this.buttonLike = page.getByText('( 0 )', { exact: true });


        this.getLike = page.locator('button:has(.ion-heart)');
    }

    // Бизнес-сценарии на страничке
    async addLike() {
        return test.step('Поставить лайк', async () => {
        await this.buttonLike.click();
        });
    }

    GetLike() {
        return this.getLike;
    }
}
