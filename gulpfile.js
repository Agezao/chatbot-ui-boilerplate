'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var streamqueue = require('streamqueue');
var clean = require('gulp-clean');
 
// Style bundling
var stylesToBundle = [
  './node_modules/botui/build/botui.min.css',
  './node_modules/botui/build/botui-theme-default.css'];

gulp.task('bundle-sass', function () {
  var sassStream = gulp.src('./app/styles/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS());
  var vendors = gulp.src(stylesToBundle);

  return streamqueue({ objectMode: true },
      vendors,
      sassStream
    )
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('./build'));
});

// JS building
var scriptsToBundle = [
  './node_modules/botui/build/botui.js',
  './app/services/*.js',
  './app/index.js'];

gulp.task('bundle-js', function() {
  return gulp.src(scriptsToBundle)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./build'));
});

//

gulp.task('copy-statics', function () {
  return gulp.src(['./app/index.html'])
    .pipe(gulp.dest('./build/'));
});

gulp.task('clean-build', function () {
  return gulp.src('./build/**/*.*', {read: false})
    .pipe(clean());
});

gulp.task('watch-dev', function () {
  gulp.watch('./app/**/*.*', ['default']);
});

///////

gulp.task('default', ['clean-build', 'bundle-js', 'bundle-sass', 'copy-statics']);

gulp.task('dev', ['watch-dev']);