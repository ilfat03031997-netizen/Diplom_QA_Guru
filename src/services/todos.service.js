import { test } from '@playwright/test';
//import { parseResponse } from '../helpers/parsers/parser.response.js';



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



            let response = await this.request.post(`${process.env.BACK_URL_API}/${this.path}`, {
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

    async get(token) {
        return test.step('get/todos', async () => {


            let response = await this.request.get(`${this.path}`, {
                headers: {
                    'X-Challenger': token,
                    Accept: '*/*'
                }
            });
            const body = await response.json();
            const headers = await response.headers();
            const statuscode = await response.status();

            return { headers, body, statuscode };
        });
    }

    async getByid(token, id, Accept) {
        return test.step('getByid/todos/id', async () => {


            let response = await this.request.get(`${this.path}/${id}`, {
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


    async put(token, id, todo) {
        return test.step('put/todos/id', async () => {



            let response = await this.request.put(`${this.path}/${id}`, {
                headers: {
                    'x-challenger': token
                },
                data: todo
            });
            const body = await parseResponse(response);
            const headers = await response.headers();
            const statuscode = await response.status();

            return { headers, body, statuscode };


        });
    }


    async getParam(token, Urlparams) {
        return test.step('get/todos', async () => {

            const queryString = Object.entries(Urlparams)
                .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
                .join('&');

            let response = await this.request.get(`${this.path}?${queryString}`, {
                headers: {
                    'x-challenger': token
                }
            });
            const body = await response.json();
            const headers = await response.headers();
            const statuscode = await response.status();

            return { headers, body, statuscode };


        });
    }

    async head(token) {
        return test.step('head/todos', async () => {

            let response = await this.request.head(`${this.path}`, {
                headers: {
                    'x-challenger': token
                }
            });

            const headers = await response.headers();
            const statuscode = await response.status();

            return { headers, statuscode };


        });
    }

    async getAccept(token, Accept) {
        return test.step('getAccept/todos', async () => {

            let response = await this.request.get(`${this.path}`, {
                headers: {
                    'x-challenger': token,
                    'Accept': Accept
                }
            });

            const headers = await response.headers();
            const statuscode = await response.status();
            const body = await parseResponse(response);

            return { headers, statuscode, body };
        });
    }

    async delete(token, id, Accept) {
        return test.step('delete/todos', async () => {

            let response = await this.request.delete(`${this.path}/${id}`, {
                headers: {
                    'X-Challenger': token,
                    'Accept': Accept
                }
            });

            const headers = await response.headers();
            const statuscode = await response.status();

            return { headers, statuscode };
        });
    }


    async postAccept(token, todo, Accept, ContentType) {
        return test.step('postAccept/todos', async () => {

            let response = await this.request.post(`${this.path}`, {
                headers: {
                    'x-challenger': token,
                    'Accept': Accept,
                    'Content-Type': ContentType
                },
                data: todo
            });

            const body = await parseResponse(response);
            const headers = await response.headers();
            const statuscode = await response.status();

            return { headers, body, statuscode };
        });

    }

}





