import { test } from '@playwright/test';





export class heartbeatService {
    constructor(request) {
        // это браузер
        this.request = request;
        // здесь мы описываем техническую реализацию эндпоинтов
        this.path = '/heartbeat';
    }

    // Бизнес-сценарии для эндпоинта
    async patch(token) {
        return test.step('patch/heartbeat', async () => {


            let response = await this.request.patch(`${this.path}`, {
                headers: {
                    'x-challenger': token
                }
            });


            const headers = await response.headers();
            const statuscode = await response.status();

            return { headers, statuscode };
        })

    }
    async delete(token) {
        return test.step('delete/heartbeat', async () => {


            let response = await this.request.delete(`${this.path}`, {
                headers: {
                    'x-challenger': token
                }
            });

            const headers = await response.headers();
            const statuscode = await response.status();

            return { headers, statuscode };
        })

    }

    async post(token, Method) {
        return test.step('post/heartbeat', async () => {


            let response = await this.request.post(`${this.path}`, {
                headers: {
                    'x-challenger': token,
                    'X-HTTP-Method-Override': Method
                }
            });

            const headers = await response.headers();
            const statuscode = await response.status();

            return { headers, statuscode };
        })

    }
}
