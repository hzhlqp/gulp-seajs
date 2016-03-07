var gulp = require('gulp');
var del = require('del');
var changed = require('gulp-changed');
var ngAnnotate = require('gulp-ng-annotate');
var transport = require('gulp-seajs-transport');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

var paths = {
    staticScript: [
                '../code/trunk/static/js/static/*.js',
                '!../code/trunk/static/js/static/*.min.js'
             ],
    commonScript: [
                 '../code/trunk/static/js/common/*.js',
                 '!../code/trunk/static/js/common/*.min.js'
              ],
    css: [
            '../code/trunk/static/css/*.css',
            '!../code/trunk/static/css/*.min.css'
        ]
}

/*默认执行*/
gulp.task('default', ['watch', 'staticScript', 'commonScript', 'css']);

/*清楚数据流*/
// gulp.task('clean', function(){
//     return del(['build']);
// });

/*监听改变*/
gulp.task('watch', function() {
    gulp.watch(paths.staticScript, ['staticScript']);
    gulp.watch(paths.commonScript, ['commonScript']);
    gulp.watch(paths.css, ['css']);
});

/*javascript 提取id、压缩     static模块*/
gulp.task('staticScript', function(){
    return gulp.src(paths.staticScript)
       .pipe(changed('build'))
       .pipe(ngAnnotate())
       .pipe(transport())
       .pipe(uglify())
       .pipe(rename({suffix: '.min'}))
       .pipe(gulp.dest('../code/trunk/static/js/static'));
});

/*javascript 提取id、压缩     common模块*/
gulp.task('commonScript', function(){
    return gulp.src(paths.commonScript)
       .pipe(changed('build'))
       .pipe(ngAnnotate())
       .pipe(transport())
       .pipe(uglify())
       .pipe(rename({suffix: '.min'}))
       .pipe(gulp.dest('../code/trunk/static/js/common'));
});

/*css压缩*/
gulp.task('css', function(){
    return gulp.src(paths.css)
    .pipe(changed('build'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('../code/trunk/static/css'));
});
