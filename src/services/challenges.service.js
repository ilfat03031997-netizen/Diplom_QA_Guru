import { test } from '@playwright/test';



export class ChallengesService {
    constructor(request) {
        // это браузер
        this.request = request;
        // здесь мы описываем техническую реализацию эндпоинтов

    }

    // Бизнес-сценарии для эндпоинта
    async get(token, Accept) {
        return test.step('get/challenges', async () => {


            let response = await this.request.get(`/challenges`, {
                headers: {
                    'x-challenger': token,
                    'Accept': Accept
                }
            });
            const body = await response.json();
            const headers = await response.headers();
            const statuscode = await response.status();

            return {headers, body, statuscode };
        })

    }


}
