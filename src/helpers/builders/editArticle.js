import { faker } from '@faker-js/faker';
export class EditArticleBuilder {
    EdArticle() {
        this.EditArticle = faker.lorem.words(10);
        return this;
    }
    build() {
        return {
            EditArticle: this.EditArticle,
        };
    }
}