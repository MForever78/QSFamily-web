/**
 * Created by MForever78 on 15/5/10.
 */

var gulp = require('gulp');
var less = require('gulp-less');
var webpack = require('gulp-webpack');
var rename = require('gulp-rename');
var path = require('path');

gulp.task('style', function() {
  return gulp.src('src/less/main.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'src', 'less')]
    }))
    .pipe(gulp.dest('./css'));
});

gulp.task('script', function() {
  return gulp.src('src/js/app.js')
    .pipe(webpack())
    .pipe(rename('app.js'))
    .pipe(gulp.dest('./js'));
});

gulp.task('watch', function() {
  gulp.watch('src/less/*.less', ['style']);
  gulp.watch('src/js/**/*.js', ['script']);
});

gulp.task('default', function() {
  gulp.start('style', 'script');
});
