import { test } from '@playwright/test';

export class LikeArticlePage {
    constructor(page) {
        // это браузер
        this.page = page;
        // здесь мы описываем техническую реализацию страницы
        // здесь все про элементы
        this.buttonLike = page.locator('button:has(.ion-heart)');


        this.getLike = page.locator('button:has(.ion-heart)');
    }

    // Бизнес-сценарии на страничке
    async addLike() {
        return test.step('Поставить лайк', async () => {
        await this.buttonLike.click();
        });
    }


    async getLikeCount() {
    const text = await this.buttonLike.innerText();
    const match = text.match(/\d+/);
    return match ? Number(match[0]) : 0;
}

    GetLike() {
        return this.getLike;
    }
}
