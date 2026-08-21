
export class PostArticlePage {
    constructor(page) {
        // это браузер
        this.page = page;
        // здесь мы описываем техническую реализацию страницы
        // здесь все про элементы
        this.titleArt = page.locator("div[class='container'] h1");
        this.getallArt = page.getByRole('link', { name: 'My Articles' });
        this.yourArt = page.locator("div[class='col-md-12'] p");
        this.tagss = page.locator(".tag-default.tag-pill.tag-outline");
        this.aboutP = page.getByRole('link').filter({ has: page.locator('p') });
        this.MyArticle = page.locator("div[class='article-actions'] a[class='author']")

    }
    // Бизнес-сценарии на страничке
    // Бизнес-сценарии на страничке

    getTitleArt() {
        return this.titleArt;
    }

    myArticle() {
        return this.MyArticle;
    }

    getALlArticle() {
        return this.getallArt;
    }

    getArticleBody() {
    return this.yourArt;
    }

    getArticleTag() {
    return this.tagss;
    }

    getPreviewAbout() {
    return this.aboutP;
    }

}
