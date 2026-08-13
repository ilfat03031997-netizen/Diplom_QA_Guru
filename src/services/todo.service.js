import { test, expect } from '@playwright/test';
import { Api } from './api'





export class TodoService {
    constructor(request) {
        // это браузер
        this.request = request;
        // здесь мы описываем техническую реализацию эндпоинтов

    }

    // Бизнес-сценарии для эндпоинта
    

    async get(token) {
        return test.step('get/todo', async () => {


            let response = await this.request.get(`/todo`, {
                headers: {
                    'x-challenger': token
                }
            });
            const statuscode = await response.status();

            return { statuscode };
        })
    }

}