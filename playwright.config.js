import { defineConfig } from '@playwright/test';

export default defineConfig({ 
    fullyParallel: true,
    workers: 10,
})