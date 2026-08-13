import { faker } from '@faker-js/faker';
export class EditUserBuilder {
    EdUser() {
        this.EditUser = faker.lorem.words(10);
        return this;
    }
    build() {
        return {
            EditUser: this.EditUser,
        };
    }
}