import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    TEST_EMAIL: 'maksymlunov29@gmail.com',
    TEST_PASSWORD: 'qqqqqqqq',
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents() {},
  },
});
