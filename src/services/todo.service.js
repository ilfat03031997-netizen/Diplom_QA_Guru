import { test } from '@playwright/test';




export class TodoService {
    constructor(request) {
        // это браузер
        this.request = request;
        // здесь мы описываем техническую реализацию эндпоинтов

    }

    // Бизнес-сценарии для эндпоинта


    async get(token, Accept) {
        return test.step('get/todo', async () => {


            let response = await this.request.get(`${process.env.BACK_URL_API}/todo`, {
                headers: {
                    'x-challenger': token,
                    'Accept': Accept
                }
            });
            const statuscode = await response.status();
            const headers = await response.headers();


            return { statuscode, headers };
        })
    }

}
