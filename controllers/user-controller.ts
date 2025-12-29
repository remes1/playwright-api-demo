import { RequestHandler } from '../utils/request-handler';

export class UserController {
    constructor(private api: RequestHandler) { }

    // ----------------- regular methods (for positive cases) -----------------

    async register(username: string, email: string, password: string) {
        return this.api
            .path('/users')
            .body({ user: { username, email, password } })
            .post(201);
    }

    async login(email: string, password: string) {
        return this.api
            .path('/users/login')
            .body({ user: { email, password } })
            .post(200);
    }

    // ----------------- raw methods (for negative cases) ----------------->

    async registerRaw(username: string, email: string, password: string) {
        return this.api
            .path('/users')
            .body({ user: { username, email, password } })
            .postRaw();
    }

    async loginRaw(email: string, password: string) {
        return this.api
            .path('/users/login')
            .body({ user: { email, password } })
            .postRaw();
    }
}