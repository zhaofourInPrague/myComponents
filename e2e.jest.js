module.exports = {
    verbose: true,
    testEnvironment: 'jest-environment-puppeteer', // puppeteer这个环境给e2e的
    setupFiles: ['./tests/setup.js'],
    preset: 'jest-puppeteer', // 预设(插件)
    testMatch: ['**/e2e/**/*.(spec|test).(j|t)sx'],
  };