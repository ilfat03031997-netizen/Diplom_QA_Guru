import { test } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    // это браузер
    this.page = page;
    // здесь мы описываем техническую реализацию страницы
    // здесь все про элементы
    this.ArticleFirst = page.getByText('Read more...');

    this.ButtonEdit = page.getByRole('link', { name: 'Edit Article' });

    this.EditArt = page.getByRole('textbox', { name: 'Write your article (in markdown)'});

    this.buttonUpdate = page.getByRole('button', { name: 'Update Article' });

  }

  // Бизнес-сценарии на страничке
  async EditArticle(EditArt) {
    return test.step('Редактирование статьи', async () => {
    await this.ArticleFirst.click();
    await this.ButtonEdit.first().click();

    await this.EditArt.click();
    await this.EditArt.fill(EditArt.EditArticle);

    await this.buttonUpdate.click();
    });
  }

  GetArticleE(expectedText) {

    return this.page.getByText(expectedText, { exact: true });

  }
}
