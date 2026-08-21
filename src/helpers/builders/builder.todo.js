import { faker } from '@faker-js/faker';
export class ToDoBuilder {
    
    withTitle({ length = 6 } = {}) {
        this.title = faker.string.alpha(length)
        return this;
    }

    withDoneStatus(doneStatus) {
        this.doneStatus = doneStatus ?? faker.datatype.boolean()
        return this;
    }

    withDescription({ length = 12 } = {}) {
        this.description = faker.string.alpha(length)
        return this;
    }

    build() {
        const result = structuredClone(this);
        return result;
    }
}
