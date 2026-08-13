import { faker } from '@faker-js/faker';
export class UserBuilder {
    withEmail() {
        // Генерирует уникальную строку из 8 маленьких букв/цифр
        // Результат всегда безопасен: bin.x7y2mz91@robot.dev
        const randomId = faker.string.alphanumeric({ length: 8, casing: 'lower' });
        this.email = `bin.${randomId}@robot.dev`;
        return this;
    }

    withPassword(length = 10) {
        // Заменяем internet.password на alphanumeric
        // Пароль будет состоять только из латинских букв и цифр (без &, #, \, $, %)
        this.password = faker.string.alphanumeric({ length: length });
        return this;
    }

    withUsername(nameOrOptions) {
        if (typeof nameOrOptions === 'string') {
            this.username = nameOrOptions;
        } else {
            this.username = faker.person.fullName(nameOrOptions);
        }
        return this;
    }

    build() {
        return {
            ...(this.email && { email: this.email }),
            ...(this.password && { password: this.password }),
            ...(this.username && { username: this.username })
        };
    }
}
