// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (!process.env.CI) {
  dotenv.config({ path: path.resolve(__dirname, '.env') });
}


export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html',], ['line',], ['allure-playwright',],],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    navigationTimeout: 60_000,
    actionTimeout: 15_000,
  },
   


    // UI и API
    projects: [
    {
      name: 'UI',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Chrome'],
        // baseURL будет  для page.goto('/')
        baseURL: process.env.BACK_URL || 'https://realworld.qa.guru/',
      },
    },
    {
      name: 'API',
      testDir: './tests/api',
      use: {
        //  baseURL  для request.get('/')
        baseURL: process.env.BACK_URL_API || 'https://apichallenges.eviltester.com/',
      },
    },
  ],
});
