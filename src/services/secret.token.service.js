import { test, expect } from '@playwright/test';
import { Api } from './api'



export class SecretTokenService {
    constructor(request) {
        // это браузер
        this.request = request;
        // здесь мы описываем техническую реализацию эндпоинтов
        this.path = '/secret/token'
    }

    // Бизнес-сценарии для эндпоинта


    async post(token, Auth) {
        return test.step('post/secret/token', async () => {

            let response = await this.request.post(`${this.path}`, {
                headers: {
                    'x-challenger': token,

                    'Authorization': Auth
                }

            });
            const statuscode = await response.status();

            return { statuscode };
        })
    }

}