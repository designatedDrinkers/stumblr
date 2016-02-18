var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var minify = require('gulp-minify');

gulp.task('default', ['styles', 'babel', /*'browserify',*/ 'watch']);

gulp.task('styles', function(){
  return gulp.src('./react/src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./react/public/css'));
});

gulp.task('babel', function(){
  return gulp.src('./react/src/jsx/**/*.jsx')
    .pipe(babel({presets: ['es2015', 'react']}))
    .pipe(gulp.dest('./react/src/js'));
});

gulp.task('browserify', function(){
  return gulp.src('./react/src/js/app.js')
    .pipe(browserify())
    .pipe(gulp.dest('./react/public/js'));
});

gulp.task('minify', function() {
  return gulp.src('./react/public/js/app.js')
    .pipe(minify())
    .pipe(gulp.dest('./react/public/js'));
});

gulp.task('watch', function(){
  gulp.watch('./react/src/scss/**/*.scss', ['styles']);
  gulp.watch('./react/src/jsx/**/*.jsx', ['babel']);
  // gulp.watch('./react/src/js/**/*.js', ['browserify']);
});
