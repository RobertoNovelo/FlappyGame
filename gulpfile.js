var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');



// JavaScript build task, removes whitespace and concatenates all files
gulp.task('scripts', function() {
  return browserify('FlappyGame/js/main.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

// Minify index
gulp.task('html', function() {
  return gulp.src('FlappyGame/index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('build/'));
});

// Watch task
gulp.task('watch', function() {
	gulp.watch('FlappyGame/js/*.js', ['jshint']);
});

// Default task
gulp.task('default', ['jshint', 'watch']);

// Build task
gulp.task('build', ['jshint', 'html', 'scripts']);