import { faker } from '@faker-js/faker';
export class CommentBuilder {
    Testcomment() {
        this.comment = faker.lorem.words(10);
        return this;
    }
    build() {
        return {
            comment: this.comment,
        };
    }
}