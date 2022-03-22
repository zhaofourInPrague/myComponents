module.exports = {
    verbose: true, // 显示日志
    testEnvironment: 'jsdom',//运行测试的环境
    setupFiles: ['./tests/setup.js'],
    testMatch: ['**/unit/**/*.(spec|test).(js|ts|jsx|tsx)'], // 检查所有的unit文件夹
    collectCoverage: true, // 搜集覆盖率
    collectCoverageFrom: [ // 针对collectCoverage的覆盖文件
      'components/**/*.(js|ts|jsx|tsx)',
      '!components/**/*.stories.(js|ts|jsx|tsx)',
      '!components/**/*.(spec|test).(js|ts|jsx|tsx)',
    ],
  };