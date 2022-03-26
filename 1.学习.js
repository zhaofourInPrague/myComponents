/问题/i
/*
1. commonjs2 ??
*/

/storybook/i
/*
1. Introduction.stories.mdx
   mdx: 可以在md中写jsx
2. 三个mdx可以让组件变成一个页面去预览

3. 指令 "storybook": "start-storybook -p 6006" ：起一个服务看组件页
        "build-storybook": "build-storybook" : 打一个静态的html
*/

/unit单元测试配置/i
/*
1. "test:unit": "jest --config unit.jest.js", 添加命令
2. 根目录下配置 unit.jest.js
3. 具体组件文件夹下添加 unit/**.test.tsx
   1. 这个就是具体的test文件内容
*/
// unit.jest.js
module.exports = {
    verbose: true, // 显示日志
    testEnvironment: 'jsdom',//运行测试的环境
    setupFiles: ['./tests/setup.js'], // 必须要有, 下面有描述
    testMatch: ['**/unit/**/*.(spec|test).(js|ts|jsx|tsx)'], // 检查所有的unit文件夹
    collectCoverage: true,
    collectCoverageFrom: [
      'components/**/*.(js|ts|jsx|tsx)',
      '!components/**/*.stories.(js|ts|jsx|tsx)',
      '!components/**/*.(spec|test).(js|ts|jsx|tsx)',
    ],
};

/单元测试setup.js/i
/*
1. 一定要有的适配, 具体不明
2. 每次测试之前适配, 增强Enzyme功能
*/

/e2e测试/i
/*
描述: end to end
1. 针对快照, 也就是最终的渲染结果是否完全一致
*/

/Enzyme分析/i
/*
1. 单元测试和e2e测试都是用setup.js, 各自的*.jest.js配置文件的setupFiles属性配置的都是Enzyme
2. 所以说明测试内部使用的是Enzyme
3. 可以换其他的引擎??
*/

/单元测试setup.js/i
/*
1. 一定要有的适配, 具体不明
2. 每次测试之前适配, 增强Enzyme功能
*/
const React = require('react');
const Enzyme = require('enzyme');

const Adapter = require('@wojtekmaj/enzyme-adapter-react-17')
Enzyme.configure({ adapter: new Adapter() });

/jest-puppeteer.config/
/*
1. 加不加都行
2. 不确定是干什么的
*/

/发布流程/i 
/*npm
1. npm 登录
   1. 访问 https://www.npmjs.com/
*/

/发布的坑/i
/*
1. 必须使用官方仓库地址 registry=https://registry.npmjs.org/
2. 登录npm
3. package.json
   1. "name": "@django-b/myant", 这个@django-b一定要和登录用户一致
   2. "publishConfig": {
         "access": "public", 一定要是 public
         "registry": "https://registry.npmjs.org" -- 这个一定要用https
      },
*/

/travis.yml文件分析/i
/*
language: node_js  语言环境
node_js: 
  - "stable"  版本指定, 最新稳定版
cache:
  directories:
  - node_modules 缓存n_m,加快速度
env:
  - CI=true 环境变量 CI=true
install:
  - yarn config set registry https://registry.npm.taobao.org  
  - yarn install
script:
  - npm run build-storybook
  - npm version patch    改变版本
deploy:
  - provider: pages
    skip_cleanup: true
    github_token: $GITHUB_TOKEN
    local_dir: storybook-static
    on:
      branch: master 
  - provider: npm
    email: zhang_renyang@126.com  
    api_key: "$NPM_TOKEN"
    skip_cleanup: true
    on:
      branch: master
*/


/关联ci流程/i
/*
1. github关联https://app.travis-ci.com/account/repositories
   1. 具体怎么关联上的忘了??
2. 生成npm-token:
   1. npm头像点击选择 access-token
   2. generate new token
   3. 选择 publish + 创建 -> 生成 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

3. 生成github-token:
   1. github点击头像 -> settings -> Developer settings
      -> Personal access tokens
   2. genetate new token
      所有选项勾选 - > 生成 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

4. travis-ci添加token
   1. 点击对应的仓库的settings按钮
   2. Environment Variables一栏下填写token
      NPM_TOKEN + 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
      GITHUB_TOKEN + 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
*/
