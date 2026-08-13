
export class PostArticlePage {
    constructor(page) {
        // это браузер
        this.page = page;
        // здесь мы описываем техническую реализацию страницы
        // здесь все про элементы
        this.inputWriteCommentArt = page.locator("div[class='container'] h1");
    }

    // Бизнес-сценарии на страничке
    // Бизнес-сценарии на страничке

    getInputComment() {
        return this.inputWriteCommentArt;
    }
}
