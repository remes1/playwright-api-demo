import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

const env = process.env.ENV || 'QA';
dotenv.config({ path: `.env.${env}` });

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [['html'], ['list']],
  use: {
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'api-testing'
    },
  ],
});
