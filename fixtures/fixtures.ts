import { test as baseTest, expect } from '@playwright/test';
import { RequestHandler } from '../utils/request-handler';
import { ArticlesController } from '../controllers/articles-controller';
import { UserController } from '../controllers/user-controller';
import { TagsController } from '../controllers/tags-controller';
import { CommentsController } from '../controllers/comments-controller';

type Fixtures = {
    api: RequestHandler;
    user: UserController;
    authToken: string;
    tags: TagsController;
    articles: ArticlesController;
    comments: CommentsController;
};

export const test = baseTest.extend<Fixtures>({
    api: async ({ request }, use) => {
        const handler = new RequestHandler(request, process.env.BASE_URL!);
        await use(handler);
    },

    user: async ({ api }, use) => {
        await use(new UserController(api));
    },

    authToken: async ({ user }, use) => {
        const response = await user.login(
            process.env.EMAIL!,
            process.env.PASSWORD!
        );

        await use(`Token ${response.user.token}`);
    },

    articles: async ({ api, authToken }, use) => {
        await use(new ArticlesController(api, authToken));
    },

    tags: async ({ api }, use) => {
        await use(new TagsController(api));
    },

    comments: async ({ api, authToken }, use) => {
        await use(new CommentsController(api, authToken));
    },
});

export { expect };