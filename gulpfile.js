const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

gulp.task('sass', function(){
  return gulp.src('scss/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('./'))
});

// Uglify .js.
gulp.task('uglify-js', function(){
  return gulp.src(['js/*.js'])
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

// Minifys .css and reload browser.
gulp.task('mini-css', function() {
    return gulp.src('styles.css')
    .pipe(cssnano())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Compile and minify css.
gulp.task('do-sass', gulp.series('sass', 'mini-css'))

gulp.task('watch', function(){
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('scss/**/*.scss', gulp.series('do-sass'));
  gulp.watch('js/**/*.js', gulp.series('uglify-js'));
  gulp.watch("*.html").on('change', browserSync.reload);
});
