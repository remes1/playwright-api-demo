import fs from 'fs/promises';
import path from 'path';
import Ajv from 'ajv';
import { createSchema } from 'genson-js'

const SCHEMA_BASE_PATH = './response-schemas';
const ajv = new Ajv({ allErrors: true });

export async function expectSchema(dirName: string, fileName: string, responseBody: object, createSchemaFlag: boolean = false) {
    const schemaPath = path.join(SCHEMA_BASE_PATH, dirName, `${fileName}_schema.json`);

    if (createSchemaFlag) {
        const schema = createSchema(responseBody);
        await fs.mkdir(path.dirname(schemaPath), { recursive: true });
        await fs.writeFile(schemaPath, JSON.stringify(schema, null, 4));
    }

    const schema = await loadSchema(schemaPath);
    const validate = ajv.compile(schema);

    const valid = validate(responseBody);
    if (!valid) {
        throw new Error(
            `Schema validation failed: ${fileName}_schema.json failed\n` +
            `${JSON.stringify(validate.errors, null, 4)}\n\n` +
            `Actual Response body:\n` +
            `${JSON.stringify(responseBody, null, 4)}`
        );
    }
}

async function loadSchema(schemaPath: string) {
    const schemaContent = await fs.readFile(schemaPath, 'utf-8');
    return JSON.parse(schemaContent);
}