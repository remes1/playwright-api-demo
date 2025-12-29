import { test, expect } from '../fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { expectSchema } from '../utils/schema-validator';

test.describe('User registration', () => {

    test('Register new user', async ({ user }) => {
        const username = faker.internet.username();
        const email = `${faker.string.alphanumeric(10)}@example.com`;
        const password = 'Qwerty123!';

        const response = await user.register(username, email, password);

        await expectSchema('user', 'POST_user', response);

        expect(response.user.username).toBe(username);
        expect(response.user.email).toBe(email);
    });

    test('Register with existing email should fail', async ({ user }) => {
        const username = faker.internet.username();
        const existingEmail = process.env.EMAIL!;
        const password = 'Qwerty123!';

        const response = await user.registerRaw(
            username,
            existingEmail,
            password
        );

        const responseJson = await response.json();

        expect(response.status()).toBe(422);
        expect(responseJson.errors.email).toContain('has already been taken');
    });

    test.describe('Username validation', () => {
        const cases = [
            { username: '', errorMessage: "can't be blank" },
            { username: 'a', errorMessage: 'is too short (minimum is 3 characters)' },
            { username: '1234567890123456789012345678901234567890', errorMessage: 'is too long (maximum is 20 characters)' }
        ];

        for (const { username, errorMessage } of cases) {
            test(`Register should fail with username "${username || '<empty>'}"`, async ({ user }) => {
                const email = `${faker.string.alphanumeric(10)}@example.com`;
                const password = 'Qwerty123!';

                const response = await user.registerRaw(
                    username,
                    email,
                    password
                );

                const responseJson = await response.json();

                expect(response.status()).toBe(422);
                expect(responseJson.errors.username).toContain(errorMessage);
            });
        }
    });
});
