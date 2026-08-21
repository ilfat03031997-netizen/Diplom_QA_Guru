import { test } from '../src/helpers/fixtures/index';
import { expect } from '@playwright/test';
import { ToDoBuilder } from '../src/helpers/builders/index';



let token

test.beforeAll('01 - создание новой сессии участника', async ({ api }) => {

    const Accept = 'application/json';

    const headers = await api.challenger.post(Accept);

    token = headers['x-challenger'];


});

test('02 - получение списка challenges', { tag: '@get' }, async ({ api }) => {

    const Accept = 'application/json';
    const { body, headers, statuscode } = await api.challenges.get(token, Accept);

    expect(body.challenges.length).toBeLessThanOrEqual(100);
    expect(headers['x-challenger']).toEqual(token);
    expect(statuscode).toEqual(200);
});


test('12 - POST-запрос для создания задачи, но проверка длины описания завершится неудачей', { tag: '@post' }, async ({ api }) => {

    let todo = new ToDoBuilder().withTitle().withDoneStatus().withDescription({ length: 201 }).build();
    const Accept = 'application/json';
    const { body, headers, statuscode } = await api.todos.post(token, todo, Accept);

    expect(statuscode).toEqual(422);
    expect(headers['x-challenger']).toEqual(token);
    expect(body.errorMessages).toContain("Failed Validation: Maximum allowable length exceeded for description - maximum allowed is 200");
});



test('13 - POST-запрос для создания задачи с указанием максимальной длины полей заголовка и описания.', { tag: '@post' }, async ({ api }) => {

    let todo = new ToDoBuilder().withTitle({ length: 50 }).withDoneStatus().withDescription({ length: 200 }).build();
    const Accept = 'application/json';
    const { body, headers, statuscode } = await api.todos.post(token, todo, Accept);

    expect(statuscode).toEqual(201);
    expect(body.title).toEqual(todo.title);
    expect(headers['x-challenger']).toEqual(token);
    expect(body.description).toEqual(todo.description);
    expect(body.doneStatus).toEqual(todo.doneStatus)
});

test('04 - получение ошибки 404 списка заданий', { tag: '@get' }, async ({ api }) => {

    const Accept = '*/*';
    const { statuscode, headers } = await api.todo.get(token,Accept);

    expect(statuscode).toEqual(404);
    expect(headers['x-challenger']).toEqual(token);
});

test('06 - получение списка конкретного задания, который не существует error 404', { tag: '@get' }, async ({ api }) => {

    const id = 10000;
    const Accept = 'application/json';

    const { headers, statuscode } = await api.todos.getByid(token, id, Accept);

    expect(statuscode).toEqual(404);
    expect(headers['x-challenger']).toEqual(token);
});



