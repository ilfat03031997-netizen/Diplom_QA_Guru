import { test } from '../src/helpers/fixtures/index';
import { expect } from '@playwright/test';
import { ToDoBuilder } from '../src/helpers/builders/index';




let headers
let body
let token
let statuscode

test.beforeAll('01 - создание новой сессии участника', async ({ api }) => {

    headers = await api.challenger.post();

    token = headers['x-challenger'];


});


test('02 - получение списка challenges', { tag: '@get' }, async ({ api }) => {


    ({ body, headers, statuscode } = await api.challenges.get(token));

    expect(body.challenges.length).toBeLessThanOrEqual(100);
    expect(headers['x-challenger']).toEqual(token);
    expect(statuscode).toEqual(200);
});





test('03 - получение списка заданий', { tag: '@get' }, async ({ api }) => {



        ({ body, headers, statuscode } = await api.todos.get(token));



        expect(body.todos.length).toEqual(10);
        expect(headers['x-challenger']).toEqual(token);
        expect(statuscode).toEqual(200);
    });


test('31 - DELETE-запрос для успешного удаления последней задачи в системе, чтобы в системе больше не осталось задач.', { tag: '@delete' }, async ({ api }) => {



        ({ body } = await api.todos.get(token));

        const ids = body.todos.map(({ id }) => id);



        for (const id of ids) {
            const { headers, statuscode } = await api.todos.delete(token, id);
            expect(statuscode).toBe(204);
        }

        ({ body } = await api.todos.get(token));

        expect(body.todos).toHaveLength(0);


    });



test('04 - получение ошибки 404 списка заданий', { tag: '@get' }, async ({ api }) => {


    ({ statuscode } = await api.todo.get(token));

    expect(statuscode).toEqual(404);
    expect(headers['x-challenger']).toEqual(token);
});

test.describe('Запросы с конткретным id "todo"', () => {

    let todo = new ToDoBuilder().withTitle().withDoneStatus().withDescription().build();

    test('09 - POST-запрос для успешного создания задачи', { tag: '@post' }, async ({ api }) => {

        ({ body, headers, statuscode } = await api.todos.post(token, todo));

        todo.id = await body.id

        expect(statuscode).toEqual(201);
        expect(headers['x-challenger']).toEqual(token);
        expect(body.id).toEqual(todo.id);
        expect(body.title).toEqual(todo.title);
        expect(body.doneStatus).toEqual(todo.doneStatus);
        expect(body.description).toEqual(todo.description);
    });


    test('05 - получение списка конкретного задания', { tag: '@get' }, async ({ api }) => {

        ({ body, headers, statuscode } = await api.todos.getByid(token, todo.id));


        expect(statuscode).toEqual(200);
        expect(headers['x-challenger']).toEqual(token);
        expect(body.todos[0].id).toEqual(todo.id);
        expect(body.todos[0].title).toEqual(todo.title);
        expect(body.todos[0].doneStatus).toEqual(todo.doneStatus);
        expect(body.todos[0].description).toEqual(todo.description);
    });

    test('19 - Обновление существующей задачи', { tag: '@put' }, async ({ api }) => {

        ({ body, headers, statuscode } = await api.todos.put(token, todo.id, todo));

        expect(statuscode).toEqual(200);
        expect(headers['x-challenger']).toEqual(token);
        expect(body.id).toEqual(todo.id);
        expect(body.title).toEqual(todo.title);
        expect(body.doneStatus).toEqual(todo.doneStatus);
        expect(body.description).toEqual(todo.description);


    });

    test('07 - получение списка конкретного задания, с фильтром ?doneStatus=true', { tag: '@get' }, async ({ api }) => {

        const urlParams = new ToDoBuilder().withDoneStatus(true).build();


        ({ body, headers, statuscode } = await api.todos.getParam(token, urlParams));


        expect(body.todos.slice(0, 10).every(todo => todo.doneStatus)).toEqual(true);
    });

    test('25 - PUT-запрос для неудачного создания задачи `', { tag: '@put' }, async ({ api }) => {

        const id = 22;

        ({ body, headers, statuscode } = await api.todos.put(token, id, todo));


        expect(statuscode).toEqual(422)
        expect(body.errorMessages).toContain('Cannot create todo with PUT due to Auto fields id')

    });

    test('20 - PUT-запрос для успешного обновления задачи, указав только заголовок `', { tag: '@put' }, async ({ api }) => {

        const todotitle = new ToDoBuilder().withTitle().build();

        ({ body, headers, statuscode } = await api.todos.put(token, todo.id, todotitle));


        expect(body.title).toContain(todotitle.title);
    });


    test('17 - POST-запрос для успешного обновления списка дел по id', { tag: '@post' }, async ({ api }) => {

        ({ body, headers, statuscode } = await api.todos.post(token, todo, todo.id));


        expect(statuscode).toEqual(200);
        expect(body.id).toEqual(todo.id);
        expect(body.title).toEqual(todo.title);
        expect(body.doneStatus).toEqual(todo.doneStatus);
        expect(body.description).toEqual(todo.description);
    });



    test('18 - POST-запрос на задачу, которой не существует', { tag: '@post' }, async ({ api }) => {

        const id = 100;

        ({ body, headers, statuscode } = await api.todos.post(token, todo, id));

        expect(statuscode).toEqual(404);
        expect(body.errorMessages).toContain('No such todo entity instance with id == 100 found');
    });


    test('23 - DELETE-запрос для успешного удаления задачи', { tag: '@delete' }, async ({ api }) => {

        ({ headers, statuscode } = await api.todos.delete(token, todo.id));

        expect(statuscode).toEqual(204)
    });


});



test('06 - получение списка конкретного задания, который не существует error 404', { tag: '@get' }, async ({ api }) => {

    const id = 10000;

    ({ headers, statuscode } = await api.todos.getByid(token, id));

    expect(statuscode).toEqual(404);
    expect(headers['x-challenger']).toEqual(token);
});





test('08 - получение списка заданий, но возвращает только заголовки и код состояния', { tag: '@head' }, async ({ api }) => {


    ({ headers, statuscode } = await api.todos.head(token));

    expect(statuscode).toEqual(200);
    expect(headers['x-challenger']).toEqual(token);
});


test('25 - получение списка заданий `Accept` со значением`application/xml`', { tag: '@get' }, async ({ api }) => {

    const Accept = 'application/xml';

    ({ body, headers, statuscode } = await api.todos.getAccept(token, Accept));

    expect(statuscode).toEqual(200);
    expect(headers['content-type']).toEqual(Accept);
    expect(body).toContain('<todos>');

});


test('26 - получение списка заданий `Accept` со значением`application/json`', { tag: '@get' }, async ({ api }) => {

    const Accept = 'application/json';

    ({ body, headers, statuscode } = await api.todos.getAccept(token, Accept));

    expect(Array.isArray(body.todos)).toBe(true);
    expect(statuscode).toEqual(200);
    expect(headers['content-type']).toEqual(Accept);
});

test('43 - PATCH-запрос на конечную точку `/heartbeat` и получение ошибки 500 `', { tag: '@patch' }, async ({ api }) => {

    ({ headers, statuscode } = await api.heartbeat.patch(token));

    expect(statuscode).toEqual(500);
});





test('42 - запрос DELETE на конечную точку `/heartbeat` и получение ошибки 405', { tag: '@delete' }, async ({ api }) => {

    ({ headers, statuscode } = await api.heartbeat.delete(token));

    expect(statuscode).toEqual(405);
});


test('10 - POST-запрос для создания задачи, но проверка поля `doneStatus` завершится неудачей', { tag: '@post' }, async ({ api }) => {

    let todo = new ToDoBuilder().withTitle().withDoneStatus('invalid').withDescription().build();



    ({ body, headers, statuscode } = await api.todos.post(token, todo));


    expect(statuscode).toEqual(422);
    expect(body.errorMessages).toContain("Failed Validation: doneStatus should be BOOLEAN but was STRING");
});



test('11 - POST-запрос для создания задачи,  но проверка длины поля `title` завершится неудачей', { tag: '@post' }, async ({ api }) => {

    let todo = new ToDoBuilder().withTitle({ length: 51 }).withDoneStatus().withDescription().build();

    ({ body, headers, statuscode } = await api.todos.post(token, todo));



    expect(statuscode).toEqual(422);
    expect(body.errorMessages).toContain("Failed Validation: Maximum allowable length exceeded for title - maximum allowed is 50");
});



test('12 - POST-запрос для создания задачи, но проверка длины описания завершится неудачей', { tag: '@post' }, async ({ api }) => {

    let todo = new ToDoBuilder().withTitle().withDoneStatus().withDescription({ length: 201 }).build();

    ({ body, headers, statuscode } = await api.todos.post(token, todo));

    expect(statuscode).toEqual(422);
    expect(body.errorMessages).toContain("Failed Validation: Maximum allowable length exceeded for description - maximum allowed is 200");
});



test('13 - POST-запрос для создания задачи с указанием максимальной длины полей заголовка и описания.', { tag: '@post' }, async ({ api }) => {

    let todo = new ToDoBuilder().withTitle({ length: 50 }).withDoneStatus().withDescription({ length: 200 }).build();

    ({ body, headers, statuscode } = await api.todos.post(token, todo));

    expect(statuscode).toEqual(201);
    expect(body.title).toEqual(todo.title);
    expect(body.description).toEqual(todo.description);
});



test('14 - POST-запрос для создания задачи, но проверка длины полезной нагрузки в поле `description` завершится неудачей', { tag: '@post' }, async ({ api }) => {

    let description = '';
    for (let i = 3; i <= 5000; i += 2) {
        description += `*${i}`;
    }
    description += '*';

    let todo = new ToDoBuilder().withTitle().withDoneStatus().withDescription(description).build();

    ({ body, headers, statuscode } = await api.todos.post(token, todo));




    expect(statuscode).toEqual(413);
    expect(body.errorMessages).toContain("Error: request body too large, max allowed is 5000 bytes");
});



test('15 - POST-запрос для создания задачи,  но проверка не пройдена, поскольку полезная нагрузка содержит нераспознанное поле', { tag: '@post' }, async ({ api }) => {

    let todo = new ToDoBuilder().withTitle().withDoneStatus().withOtherfild().build();

    ({ body, headers, statuscode } = await api.todos.post(token, todo));

    expect(statuscode).toEqual(422);
    expect(body.errorMessages).toContain("Failed Validation: Could not find field: otherfild");

});




test('50 - POST-запрос на конечную точку `/secret/token` и получение ошибки 401', { tag: '@post' }, async ({ api }) => {

    let Auth = 'Basic YWRtaW46cGFzc3dvcmRk';

    ({ headers, statuscode } = await api.secrettoken.post(token, Auth));


    expect(statuscode).toEqual(401);
});



test('51 - POST-запрос на конечную точку `/secret/token` и получение кода 201', { tag: '@post' }, async ({ api }) => {

    let Auth = 'Basic YWRtaW46cGFzc3dvcmQ=';

    ({ headers, statuscode } = await api.secrettoken.post(token, Auth));


    expect(statuscode).toEqual(201);

});

test('32 - POST-запрос на конечную точку `/todos` для создания задачи, используя Content-Type `application/json`', { tag: '@post' }, async ({ api }) => {

    const Accept = 'application/json';
    const ContentType = 'application/json';


    let todo = new ToDoBuilder().withTitle().withDoneStatus().withDescription().build();



    ({ body, headers, statuscode } = await api.todos.postAccept(token, todo, Accept, ContentType));

    todo.id = await body.id

    expect(statuscode).toEqual(201);
    expect(headers['content-type']).toEqual(Accept);
    expect(body.id).toEqual(todo.id);
    expect(body.title).toEqual(todo.title);
    expect(body.doneStatus).toEqual(todo.doneStatus);
    expect(body.description).toEqual(todo.description);
});



test('31 - POST-запрос на конечную точку `/todos` для создания задачи, используя Content-Type `application/xml`', { tag: '@post' }, async ({ api }) => {

    const Accept = 'application/xml';
    const ContentType = 'application/xml';

    let todo = new ToDoBuilder().withTitle().withDoneStatus().withDescription().buildXML();

    ({ body, headers, statuscode } = await api.todos.postAccept(token, todo, Accept, ContentType));




    expect(statuscode).toEqual(201);
    expect(headers['content-type']).toEqual(Accept);
    expect(body).toContain('<id>');
    expect(body.title).toEqual(todo.title);
    expect(body.doneStatus).toEqual(todo.doneStatus);
    expect(body.description).toEqual(todo.description);

});


test('76 - POST-запрос на конечную точку `/heartbeat` и получите ошибку 500, если замените параметр Method Verb на PATCH.', { tag: '@post' }, async ({ api }) => {


    let Method = 'PATCH';

    ({ headers, statuscode } = await api.heartbeat.post(token, Method));




    expect(statuscode).toEqual(500);



});





