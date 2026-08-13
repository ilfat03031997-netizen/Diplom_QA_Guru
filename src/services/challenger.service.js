import { test, expect } from '@playwright/test';




export class ChallengerService {
    constructor(request) {
        // это браузер
        this.request = request;
        // здесь мы описываем техническую реализацию эндпоинтов

    }

    // Бизнес-сценарии для эндпоинта
    async post() {
        return test.step('post/challenger', async () => {
            let response = await this.request.post(`/challenger`);
            const headers = await response.headers();
            console.log(`https://apichallenges.eviltester.com${headers.location}`)
            return headers;
        })
        
    }
   

}