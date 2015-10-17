var gulp = require('gulp');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('webserver', function() {
  connect.server({
    livereload: {
      enable: true,
      port: 9009
    },
    root: ['.']
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

gulp.task('watch', function() {
    gulp.watch('js/src/*.js', ['minifyJs']);
    gulp.watch('*.html', ['reload']);
});

gulp.task('default', ['minifyJs', 'webserver', 'reload', 'watch']);
