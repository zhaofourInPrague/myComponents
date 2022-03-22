const gulp = require('gulp');
const path = require('path');
const rimraf = require('rimraf');

const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const merge2 = require('merge2'); // 合并流 promise.all 这样才能监听

const {compilerOptions} = require('./tsconfig.json');

const tsConfig = {
    noUnusedParameters: true,//不能有未使用的参数
    noUnusedLocals: true,//不能有未使用的本地变量
    strictNullChecks: true,//严格的Null检查 
    target: 'es6',//编译 的目标
    jsx: 'react',//jsx如何处理preserve 保留不处理  react变成React.createElement()
    moduleResolution: 'node',//模块的查找规则 node
    declaration: true,//生成声明文件 d.ts
    allowSyntheticDefaultImports: true,//允许 默认导入
    ...compilerOptions
}

const babelConfig = require('./babel.config');

//准备好要编译 的文件
//glob 文件匹配模板，类似于正则
const source = [
    'components/**/*.{js,ts,jsx,tsx}',
    '!components/**/*.stories.{js,ts,jsx,tsx}',
    '!components/**/e2e/*',
    '!components/**/unit/*',
];

const base = path.join(process.cwd(), 'components');
function getProjectPath(filePath) {
    return path.join(process.cwd(), filePath);
}
const libDir = getProjectPath('lib');
const esDir = getProjectPath('es');

/*
1. 核心函数
*/
function compile(modules){
    const targetDir = modules === false ? esDir : libDir;
    rimraf.sync(targetDir); // 删除老内容
    // 把文件匹配模式传给gulp,gulp会按这个模式把文件匹配了出来
    // ts转义后生成两个流, 一个是js一个是类型声明d.ts
    const {js, dts} = gulp.src(source, {base}).pipe(ts(tsConfig));
    const dtsStream = dts.pipe(gulp.dest(targetDir));
    let jsStream = js;
    if(modules) { // 如果需要转成es5
        jsStream = js.pipe(babel(babelConfig));
    }
    jsStream = jsStream.pipe(gulp.dest(targetDir));
    // jsStream 和 dtsStream 都是流, 所以可以merge2??
    return merge2([jsStream, dtsStream]);
}
// 流： 上次操作的结果数据传给下个操作

gulp.task('compile-with-es', (done) => {
    console.log('compile to es');
    compile(false).on('finish', done); // 这个on是监听流的 merge2
})

gulp.task('compile-with-lib', (done) => {
    console.log('compile to lib');
    compile(true).on('finish', done);
});

// parallel并行
gulp.task('compile', gulp.parallel('compile-with-es', 'compile-with-lib'))