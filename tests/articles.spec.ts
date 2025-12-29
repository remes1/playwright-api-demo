import { expect, test } from '../fixtures/fixtures';
import { expectSchema } from '../utils/schema-validator';
import articlePostPayload from '../request-objects/POST-article.json';
import { faker } from '@faker-js/faker';

test.describe('Articles API tests', () => {

    test('Create, update and delete article, add comment and delete comment for article', async ({ articles, comments }) => {
        let slug: string;
        let updatedTitle: string;
        let commentId: number;
        let commentBody: string;

        await test.step('Create article', async () => {
            const articleTitle = faker.lorem.sentence(3);
            articlePostPayload.title = articleTitle;
            const createdArticleResponse = await articles.create(articlePostPayload);

            await expectSchema('articles', 'POST_articles', articlePostPayload);
            expect(createdArticleResponse.article.title).toBe(articleTitle);

            slug = createdArticleResponse.article.slug;
        });

        await test.step('Update article', async () => {
            updatedTitle = faker.lorem.sentence(3);
            articlePostPayload.title = updatedTitle;

            const updatedArticleResponse = await articles.update(slug, articlePostPayload);
            await expectSchema('articles', 'PUT_articles', articlePostPayload);

            expect(updatedArticleResponse.article.title).toBe(updatedTitle);

            slug = updatedArticleResponse.article.slug;
        });

        await test.step('Get article', async () => {
            const fetchedUpdatedArticle = await articles.getArticle(slug);
            await expectSchema('articles', 'GET_article', fetchedUpdatedArticle);

            expect(fetchedUpdatedArticle.article.title).toBe(updatedTitle);
        });

        await test.step('Add comment to article', async () => {
            commentBody = faker.lorem.sentence(5);

            const commentResponse = await comments.create(slug, {
                body: commentBody
            });

            await expectSchema('comments', 'POST_comment', commentResponse);

            expect(commentResponse.comment.body).toBe(commentBody);

            commentId = commentResponse.comment.id;
        });

        await test.step('Get comments for article', async () => {
            const commentsResponse = await comments.getComments(slug);
            await expectSchema('comments', 'GET_comments', commentsResponse);

            expect(commentsResponse.comments[0].body).toEqual(commentBody);
        });

        await test.step('Delete comment', async () => {
            await comments.delete(slug, commentId);
        });

        await test.step('Delete article', async () => {
            await articles.delete(slug);
        });

        await test.step('Verify article deletion', async () => {
            const getDeletedArticleResponse = await articles.getArticleRaw(slug);
            expect(getDeletedArticleResponse.status()).toBe(404);
        });
    });
});