import { test } from '../src/helpers/fixtures/index';
import { expect } from '@playwright/test';
import { ToDoBuilder } from '../src/helpers/builders/index';




let headers
let body
let token
let statuscode

test.beforeAll('01 - создание новой сессии участника', async ({ api }) => {

    const Accept = 'application/json';

    headers = await api.challenger.post(Accept);

    token = headers['x-challenger'];


});

test('02 - получение списка challenges', { tag: '@get' }, async ({ api }) => {

    const Accept = 'application/json';
    ({ body, headers, statuscode } = await api.challenges.get(token, Accept));

    expect(body.challenges.length).toBeLessThanOrEqual(100);
    expect(headers['x-challenger']).toEqual(token);
    expect(statuscode).toEqual(200);
});



test.describe('Запросы с конткретным id "todo"', () => {

    let todo = new ToDoBuilder().withTitle().withDoneStatus().withDescription().build();

    test('09 - POST-запрос для успешного создания задачи', { tag: '@post' }, async ({ api }) => {

        const Accept = 'application/json';

        ({ body, headers, statuscode } = await api.todos.post(token, todo, Accept));

        todo.id = await body.id

        expect(statuscode).toEqual(201);
        expect(headers['x-challenger']).toEqual(token);
        expect(body.id).toEqual(todo.id);
        expect(body.title).toEqual(todo.title);
        expect(body.doneStatus).toEqual(todo.doneStatus);
        expect(body.description).toEqual(todo.description);
    });
    test('17 - POST-запрос для успешного обновления списка дел по id', { tag: '@post' }, async ({ api }) => {

        const Accept = 'application/json';

        ({ body, headers, statuscode } = await api.todos.post(token, todo, Accept, todo.id ));


        expect(statuscode).toEqual(200);
        expect(body.id).toEqual(todo.id);
        expect(body.title).toEqual(todo.title);
        expect(body.doneStatus).toEqual(todo.doneStatus);
        expect(body.description).toEqual(todo.description);
    });
});







test('12 - POST-запрос для создания задачи, но проверка длины описания завершится неудачей', { tag: '@post' }, async ({ api }) => {

    let todo = new ToDoBuilder().withTitle().withDoneStatus().withDescription({ length: 201 }).build();
    const Accept = 'application/json';
    ({ body, headers, statuscode } = await api.todos.post(token, todo, Accept));

    expect(statuscode).toEqual(422);
    expect(body.errorMessages).toContain("Failed Validation: Maximum allowable length exceeded for description - maximum allowed is 200");
});



test('13 - POST-запрос для создания задачи с указанием максимальной длины полей заголовка и описания.', { tag: '@post' }, async ({ api }) => {

    let todo = new ToDoBuilder().withTitle({ length: 50 }).withDoneStatus().withDescription({ length: 200 }).build();
    const Accept = 'application/json';
    ({ body, headers, statuscode } = await api.todos.post(token, todo, Accept));

    expect(statuscode).toEqual(201);
    expect(body.title).toEqual(todo.title);
    expect(body.description).toEqual(todo.description);
});








