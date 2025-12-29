import { test, expect } from '../fixtures/fixtures';
import { expectSchema } from '../utils/schema-validator';

test('Get tags list', async ({ tags }) => {
    const response = await tags.getAllTags();

    expect(response.tags.length).toBeGreaterThan(0);
    await expectSchema('tags', 'GET_tags', response);
});