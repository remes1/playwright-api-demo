import { RequestHandler } from '../utils/request-handler';

export class TagsController {
    constructor(private api: RequestHandler) { }

    async getAllTags() {
        return this.api
            .path('/tags')
            .get(200);
    }
}