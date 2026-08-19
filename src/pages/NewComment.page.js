import { test } from '@playwright/test';
export class NewCommentPage {
    constructor(page) {
        // это браузер
        this.page = page;
        // здесь мы описываем техническую реализацию страницы
        // здесь все про элементы
        this.inputDropdownUser = page.locator('div.nav-link.dropdown-toggle.cursor-pointer');
        this.Profileyou = page.locator('a.dropdown-item:has-text("Profile")');
        this.AllArt = page.getByRole('link', { name: 'My Articles' });
        this.Readmore = page.locator('span').filter({ hasText: 'Read more...' }).first();


        this.writeComment = page.getByPlaceholder('Write a comment...');
        this.PostComment = page.getByRole('button', { name: 'Post Comment' });

        this.getComment = page.locator('p.card-text');
    }

    // Бизнес-сценарии на страничке
    async myAllArticle() {
        return test.step('Перейти в список всех статей', async () => {
        await this.inputDropdownUser.click();
        await this.Profileyou.click();
        });
    }
    async readmore() {
        return test.step('Перейти в окно для комента', async () => {
            await this.Readmore.click();
        });
    }

    async addComment(testComment) {
        return test.step('Добавить новый коммент', async () => {
        const { comment } = testComment;


        await this.writeComment.click();
        await this.writeComment.fill(comment);
        await this.PostComment.click();
        });
    }

    GetComment() {

        return this.getComment;

    }
}
