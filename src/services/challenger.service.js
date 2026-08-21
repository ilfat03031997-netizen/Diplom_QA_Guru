import { test } from '@playwright/test';




export class ChallengerService {
    constructor(request) {
        // это браузер
        this.request = request;
        // здесь мы описываем техническую реализацию эндпоинтов

    }

    // Бизнес-сценарии для эндпоинта
    async post(Accept) {
        return test.step('post/challenger', async () => {
            let response = await this.request.post(`/challenger`, {
                headers: {
                    'Accept': Accept
                }
            });
            const headers = await response.headers();

            return headers;
        });

    }


}
