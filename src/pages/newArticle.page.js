import { test } from '@playwright/test';


export class newArticlePage {
    constructor(page) {
    // это браузер
        // это браузер
        this.page = page;
        // здесь мы описываем техническую реализацию страницы
        // здесь все про элементы
        this.ArticleNew = page.getByRole('link', { name: 'New Article' });
        this.ArticleTitleinp = page.getByRole('textbox', { name: 'Article Title' });
        this.WhatisArtAboutinp = page.getByRole('textbox', { name: /What's this article about\?/i });
        this.ArticleYourinput = page.getByRole('textbox', { name: 'Write your article (in markdown)' });
        this.EnterTagsinput = page.getByRole('textbox', { name: 'Enter tags' });
        this.PublishBut = page.getByText('Publish Article', { exact: true });

    }
    // Бизнес-сценарии на страничке

    async clickNewArticle() {
        return test.step('Перейти к созданию новой статьи', async () => {
        await this.ArticleNew.click();
         });
    }

    async newArticlewrite(testArticle) {
         return test.step('Создание новой статьи', async () => {
        const { title, about, YourArticle, Entertags } = testArticle;

        await this.ArticleTitleinp.click();
        await this.ArticleTitleinp.fill(title);
        await this.WhatisArtAboutinp.click();
        await this.WhatisArtAboutinp.fill(about);
        await this.ArticleYourinput.click();
        await this.ArticleYourinput.fill(YourArticle);
        await this.EnterTagsinput.click();
        await this.EnterTagsinput.fill(Entertags);

        await this.PublishBut.click();
        });
    }
}
