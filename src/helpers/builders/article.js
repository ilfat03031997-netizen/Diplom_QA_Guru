import { faker } from '@faker-js/faker';
export class ArticleBuilder {
    ArTitle() {
        this.title = faker.lorem.words(5);
        return this;
    }
    ArticleAbout() {
        this.about = faker.lorem.sentences(2);
        return this;
    }

    YourArticle() {
        this.body = faker.lorem.paragraphs(3);
        return this;
    }
    Entertags() {
        this.tags = faker.lorem.words(1);
        return this;
    }
    build() {
         const result = structuredClone(this);
         return result;

    }
}
