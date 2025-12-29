import { RequestHandler } from '../utils/request-handler';

export class ArticlesController {
    constructor(private api: RequestHandler, private authToken: string) { }

    async create(article: object) {
        return this.api
            .path('/articles')
            .headers({ 'Authorization': this.authToken })
            .body({ article })
            .post(201);
    }

    async update(slug: string, article: object) {
        return this.api
            .path(`/articles/${slug}`)
            .headers({ 'Authorization': this.authToken })
            .body({ article })
            .put(200);
    }

    async getArticle(slug: string) {
        return this.api
            .path(`/articles/${slug}`)
            .get(200);
    }

    async delete(slug: string) {
        return this.api
            .path(`/articles/${slug}`)
            .headers({ 'Authorization': this.authToken })
            .delete(204);
    }

    // ----------------- raw method (for negative cases) ----------------->
    async getArticleRaw(slug: string) {
        return this.api
            .path(`/articles/${slug}`)
            .getRaw();
    }
}