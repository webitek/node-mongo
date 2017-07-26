'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const path = require('path'); // Path
const jade = require('gulp-jade');
const uglify = require('gulp-uglifyjs');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer= require('gulp-autoprefixer');
const svgSprite = require("gulp-svg-sprite");
const rename = require('gulp-rename'); // Подключаем библиотеку для переименования файлов
const imagemin = require('gulp-imagemin'); // Подключаем библиотеку для работы с изображениями
const pngquant    = require('imagemin-pngquant');  // Подключаем библиотеку для работы с png
const cache = require('gulp-cache'); // Подключаем библиотеку кеширования
const browserSync = require('browser-sync').create(); // server
const concat = require('gulp-concat'); // Подключаем gulp-concat (для конкатенации файлов)
const notify = require('gulp-notify'); // view error
const remember = require('gulp-remember'); //cach
const resolver = require('stylus').resolver; // remeber path for img
const gulpIf =  require('gulp-if'); // if else

/***************************************************************************************
 * {sass,scss,css} & sourcemaps
 ***************************************************************************************/
gulp.task('sass', function () {
    return gulp.src('./sources/styles/*.{sass,scss,css}')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            define:{ url:resolver()}
        }).on('error', notify.onError()))
        .pipe(autoprefixer('last 3 version', '> 1%', 'IE 9',{ cascade: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css'));
});



/***************************************************************************************
 * jade
 ***************************************************************************************/
gulp.task('jade', function() {
    return gulp.src('./sources/views/*.jade')
        .pipe(jade({ pretty: true})).on('error', notify.onError())
        .pipe(gulp.dest('./'))
});



/***************************************************************************************
 * images
 ***************************************************************************************/
gulp.task('img', function() {
    return gulp.src('./sources/img/**/**/**/*.{jpg,png,gif,svg,jpeg}') // Берем все изображения из img
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('./img')); // Выгружаем на продакшен
});



/***************************************************************************************
 * javascript libraries
 ***************************************************************************************/
gulp.task('libs', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        './sources/libs/jquery-2.2.4.min.js'
    ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('./js')); // Выгружаем в папку ./js
});



/***************************************************************************************
 * custom javascript
 ***************************************************************************************/
gulp.task('javascript', function () {

    const options = {
        mangle: false,
        compress: false,
        preserveComments: false
    };

    return gulp.src('./sources/js/**/*.js')
        .pipe(uglify(options)).on('error', notify.onError())
        .pipe(concat('core.min.js')) // Собираем их в кучу в новом файле core.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('./js')); // Выгружаем в папку ./js

});



/***************************************************************************************
 * svg-sprite htnl
 ***************************************************************************************/
gulp.task('svg', function() {

    var config = {
        mode: {
            symbol:
                {
                    dist:           './',
                    inline: false,
                    sprite          : "./svg-sprite.svg"
                }
        }
    };

    return gulp.src(['./sources/svgs/html/*.svg'])
        .pipe(svgSprite(config)).on('error', function(error){ console.log(error); })
        .pipe(gulp.dest('./img'));

});



/***************************************************************************************
 * svg-sprite css
 ***************************************************************************************/
gulp.task('svg-css', function() {

    var config = {
        mode: {
            css: {
                dest: '.',
                sprite: 'svg-sprite.svg',
                layout: 'vertical',
                prefix: '.i-',
                dimensions: true,
                render: {
                    scss: {
                        dest: '_sprite.scss'
                    }
                }
            }
        }
    };

    return gulp.src(['./sources/svgs/css/*.svg'])
        .pipe(svgSprite(config)).on('error', function(error){ console.log(error); })
        .pipe(gulpIf('*.scss', gulp.dest('./sources/styles/003-patterns'), gulp.dest('./css')));
});



/***************************************************************************************
 * watch
 ***************************************************************************************/
gulp.task('watch', function () {

    gulp.watch(['./sources/styles/**/*.*'], gulp.series('sass')).on('unlink', function(filepath){
        remember.forget('sass', path.resolve(filepath));
    });

    gulp.watch(['./sources/views/**/*.jade'], gulp.series('jade')).on('unlink', function(filepath){
        remember.forget('jade', path.resolve(filepath));
    });

    gulp.watch(['./sources/img/**/*.{jpg,png,gif,svg}'], gulp.series('img')).on('unlink', function(filepath){
        remember.forget('img', path.resolve(filepath));
    });

    gulp.watch(['./sources/js/libs/*.js'], gulp.series('libs')).on('unlink', function(filepath){
        remember.forget('libs', path.resolve(filepath));
    });

    gulp.watch(['./sources/js/*.js'], gulp.series('javascript')).on('unlink', function(filepath){
        remember.forget('javascript', path.resolve(filepath));
    });

    gulp.watch(['./sources/svgs/html/*.svg'], gulp.series('svg')).on('unlink', function(filepath){
        remember.forget('svg', path.resolve(filepath));
    });

    gulp.watch(['./sources/svgs/css/*.svg'], gulp.series('svg-css')).on('unlink', function(filepath){
        remember.forget('svg-css', path.resolve(filepath));
    });

});



/***************************************************************************************
 * build
 ***************************************************************************************/
gulp.task('build', gulp.series(
    gulp.parallel('sass', 'javascript', 'libs', 'svg', 'svg-css', 'img' ), 'jade'),
    'watch'
);



/***************************************************************************************
 * server start
 ***************************************************************************************/
gulp.task('server', function() {
    browserSync.init({
        server: './'
    });
    browserSync.watch('./')/*.on('change', browserSync.reload)*/;
});



/***************************************************************************************
 * default
 ***************************************************************************************/
gulp.task('default', gulp.series('build',
    gulp.parallel('watch','server'))
);