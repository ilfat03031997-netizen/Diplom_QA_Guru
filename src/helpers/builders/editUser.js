import { faker } from '@faker-js/faker';
export class EditUserBuilder {
    EdUser(options = { length: 5 }) {
        this.EditUser = faker.string.alpha({ length: options.length });
        return this;
    }
    build() {
        return {
            EditUser: this.EditUser,
        };
    }
}
