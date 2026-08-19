import { faker } from '@faker-js/faker';
export class ToDoBuilder {
    withID({ min , max } = {}) {
        this.id = faker.number.int({min, max})
        return this;
    }
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
    //Поле о котором не знает сервер - для негативного теста
    withOtherfild({ length = 8 } = {}) {
        this.otherfild = faker.string.alpha(length)
        return this;
    }
    build() {
        const result = structuredClone(this);
        return result;
    }
    // Новый метод – возвращает XML-строку
    buildXML() {
        return `<todo>
    <title>${this.title}</title>
    <doneStatus>${this.doneStatus}</doneStatus>
    <description>${this.description}</description>
</todo>`;
    }
}
