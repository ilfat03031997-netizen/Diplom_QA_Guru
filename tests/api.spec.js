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

    let todo;

      test.beforeEach({ tag: '@post' }, async ({ api }) => {



        todo = new ToDoBuilder().withTitle().withDoneStatus().withDescription().build();

        const Accept = 'application/json';

        ({ body, headers, statuscode } = await api.todos.post(token, todo, Accept));



        expect(statuscode).toEqual(201);
        expect(body.id).toBeDefined();

        todo.id = body.id
        expect(body.title).toEqual(todo.title);
        expect(body.doneStatus).toEqual(todo.doneStatus);
        expect(body.description).toEqual(todo.description);
    });


        test('05 - получение списка конкретного задания', { tag: '@get' }, async ({ api }) => {

          const Accept = 'application/json';
          ({ body, headers, statuscode } = await api.todos.getByid(token, todo.id, Accept));


          expect(statuscode).toEqual(200);
          expect(body.todos[0].id).toEqual(todo.id);
          expect(body.todos[0].title).toEqual(todo.title);
          expect(body.todos[0].doneStatus).toEqual(todo.doneStatus);
          expect(body.todos[0].description).toEqual(todo.description);
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









