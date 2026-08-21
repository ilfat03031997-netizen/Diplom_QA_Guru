import { test } from '@playwright/test';




export class TodosService {
    constructor(request) {
        // это браузер
        this.request = request;
        // здесь мы описываем техническую реализацию эндпоинтов
        this.path = 'todos';
    }

    // Бизнес-сценарии для эндпоинта
    async post(token, todo, Accept) {
        return test.step('post/todos', async () => {



            let response = await this.request.post(`/${this.path}`, {
                headers: {
                    'x-challenger': token,
                    'Accept': Accept
                },
                data: todo
            });

            const body = await response.json();
            const headers = await response.headers();
            const statuscode = await response.status();

            return { headers, body, statuscode };
        });

    }



    async getByid(token, id, Accept) {
        return test.step('getByid/todos/id', async () => {


            let response = await this.request.get(`/${this.path}/${id}`, {
                headers: {
                    'x-challenger': token,
                    'Accept': Accept
                }
            });
            const body = await response.json();
            const headers = await response.headers();
            const statuscode = await response.status();

            return { headers, body, statuscode };


        });
    }

}





