import { test } from '@playwright/test';
export class NewCommentPage {
    constructor(page) {
        // это браузер
        this.page = page;
        // здесь мы описываем техническую реализацию страницы
        // здесь все про элементы
        this.inputDropdownUser = page.locator('div.nav-link.dropdown-toggle.cursor-pointer');
        this.Profile = page.getByText('Profile', { exact: true });
        this.Readmore = page.locator('span').filter({ hasText: 'Read more...' }).first();


        this.writeComment = page.getByPlaceholder('Write a comment...');
        this.PostComment = page.getByRole('button', { name: 'Post Comment' });

        this.getComment = page.locator('p.card-text');
    }

    // Бизнес-сценарии на страничке
    async myAllArticle() {
        return test.step('Перейти в список всех статей', async () => {
        await this.inputDropdownUser.click();
        await this.Profile.click();
        });
    }
    async addComment(testComment) {
        return test.step('Добавить новый коммент', async () => {
        await this.Readmore.scrollIntoViewIfNeeded();
        await this.Readmore.click();
        await this.writeComment.click();
        await this.writeComment.fill(testComment.comment);
        await this.PostComment.click();
        });
    }

    GetComment() {

        return this.getComment;
       
    }
}
