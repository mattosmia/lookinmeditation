'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var bake = require("gulp-bake");
var clean = require('gulp-clean');
 
sass.compiler = require('node-sass');
 
gulp.task('clean', function () {
    return gulp.src('./build', {read: false, allowEmpty: true})
        .pipe(clean());
});

// compiling SASS into CSS and copying to build folder
gulp.task('sass', function () {
  return gulp.src('./src/assets/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/assets/'));
});

// baking HTML templates and copying to build folder
gulp.task('html', function () {
  return gulp.src('./src/*.html')
    .pipe(bake({
      "/* header */": "./src/partials/header.txt",
      "/* footer */": "./src/partials/footer.txt"
    }))
    .pipe(gulp.dest('./build/'));
});

// copy JS to build folder (no changes)
gulp.task('js', function () {
	return gulp.src('./src/assets/js/*')
		.pipe(gulp.dest('./build/assets/js/'));
});

// copy images to build folder (no changes)
gulp.task('img', function () {
	return gulp.src('./src/assets/img/*')
		.pipe(gulp.dest('./build/assets/img/'));
});
 
 
gulp.task('watch', function() {
    gulp.watch('./src/assets/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/*.html', gulp.series('html'));
    gulp.watch('./src/assets/**/*.js', gulp.series('js'));
    gulp.watch('./src/assets/img/*', gulp.series('img'));
});

gulp.task('build', gulp.series(
  'clean', 'sass', 'js', 'img', 'html'
));

gulp.task('default', gulp.series(
  'build'
));