import { RequestHandler } from '../utils/request-handler';

export class CommentsController {
    constructor(private api: RequestHandler, private authToken: string) { }

    async create(articleSlug: string, comment: { body: string }) {
        return this.api
            .path(`/articles/${articleSlug}/comments`)
            .headers({ 'Authorization': this.authToken })
            .body({ comment })
            .post(200);
    }

    async getComments(articleSlug: string) {
        return this.api
            .path(`/articles/${articleSlug}/comments`)
            .headers({ 'Authorization': this.authToken })
            .get(200);
    }

    async delete(articleSlug: string, commentId: number) {
        return this.api
            .path(`/articles/${articleSlug}/comments/${commentId}`)
            .headers({ 'Authorization': this.authToken })
            .delete(200);
    }
}