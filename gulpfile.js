var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var notify = require("gulp-notify");
var rename = require("gulp-rename");
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var csscomb = require('gulp-csscomb');
var bourbon = require('node-bourbon');
var csso = require('gulp-csso');
var htmlhint = require("gulp-htmlhint");

gulp.task('sprite', function() {
    var spriteData =
        gulp.src('./src/img/sprite/*.*') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.scss',
                padding:16
            }));

    spriteData.img.pipe(gulp.dest('./app/img/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('./src/scss/components')); // путь, куда сохраняем стили
});

gulp.task('pug', function() {
    return gulp.src(['src/pug/**/*.pug', '!src/pug/**/_*.pug'])
        .pipe(pug({pretty: '\t'}))
        .on("error", notify.onError())
        .pipe(browserSync.reload({stream: true}))
        .pipe(gulp.dest('app'));
});

gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass({includePaths: require("node-bourbon").includePaths})
            .on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(autoprefixer(['last 15 versions'])) //подключаем Autoprefixer
        .pipe(cleanCSS())
        .pipe(csscomb())
        .pipe(csso()) // минифицируем css, полученный на предыдущем шаге
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browserSync', ['sass', 'pug'], function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    })
});

gulp.task('compress', function() {
    gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/img'))
});


gulp.task('htmlhint', function() {
    gulp.src("./src/**/*.html")
        .pipe(htmlhint())
        .pipe(htmlhint.reporter())
});

gulp.task('watch', ['pug','sass', 'browserSync'], function() {
    gulp.watch('src/pug/**/*.pug', ['pug']);
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
});





