var gulp = require('gulp');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');

gulp.task('webserver', function() {
  connect.server({
    livereload: {
      enable: true,
      port: 9009
    }
  });
});

gulp.task('reload', function() {
  gulp.src(['js/dist/*.js', '*.html'])
    .pipe(connect.reload());
})

gulp.task('minifyJs', function() {
    gulp.src(['js/src/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('js/dist/'))
        .pipe(connect.reload());
});

gulp.task('minifyCss', function() {
    gulp.src(['css/src/*.less'])
        .pipe(less())
        .pipe(sourcemaps.init())
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css/dist/'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('js/src/*.js', ['minifyJs']);
    gulp.watch('css/src/*.less', ['minifyCss']);
    gulp.watch('*.html', ['reload']);
});

gulp.task('default', ['minifyJs', 'minifyCss', 'webserver', 'reload', 'watch']);
