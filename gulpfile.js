const gulp = require(`gulp`);
const sass = require(`gulp-sass`);
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const plumber = require('gulp-plumber');
const del = require(`del`);
const browserSync = require('browser-sync').create();
const rollup = require(`gulp-better-rollup`);
const sourcemaps = require(`gulp-sourcemaps`);
const svgmin = require('gulp-svgmin');

const clean = () => {
    return del([`dist/*`]);
  };

const styles = () => {
return gulp.src(`./sass/style.scss`)
    .pipe(sass())
    .pipe(rename(`style.css`))
    .pipe(autoprefixer({
    browsers: ['> 0.1%'],
    cascade: false
    }))
    .pipe(cleanCSS({level: 2}))
    .pipe(gulp.dest(`./dist/css`))
    .pipe(browserSync.stream());
};

const scripts = () => {
    return gulp.src(`./js/main.js`)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(rollup({}, `iife`))
    .pipe(sourcemaps.write(``))
    .pipe(gulp.dest(`./dist/js`))
    .pipe(browserSync.stream());
  };

const svg = () => {
    return gulp.src('./svg/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('./dist/img'));
}
  
const watch = () => {
    browserSync.init({
      server: {
          baseDir: "./"
      }
    });
    gulp.watch(`./sass/**/*.scss`, styles);
    gulp.watch(`./js/**/*.js`, scripts);
    gulp.watch(`./svg/**/*.svg`, svg);
    gulp.watch(`./*.html`, browserSync.reload);
};

gulp.task(`build`, gulp.series(clean, gulp.parallel(styles, scripts, svg)));
gulp.task(`serve`, gulp.series(`build`, watch));
