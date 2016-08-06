var gulp = require('gulp'),
    $    = require('gulp-load-plugins')({
      pattern: ['gulp-*', 'del', 'browser-sync', 'main-bower-files']
    });

gulp.task('clean', function (cb) {
  $.del('public')
    .then(function (paths) {
      console.log('Deleted files/folders:\n', paths.join('\n'));
      cb();
    })
    .catch(function (err) {
      if (err.message === "Cannot read property 'join' of undefined") {
        console.log("Probably nothing to delete... let's keep going, shall we?");
        cb();
      } else {
        console.log("del error: ", err);
      }
    });
});

gulp.task('jade', function () {
  gulp
    .src(['src/**/*.jade', '!src/**/_*.jade'])
    .pipe($.jade({
      pretty: true
    }))
    .pipe(gulp.dest('public'))
    .pipe($.livereload());
});

gulp.task('sass', function () {
  gulp
    .src('src/main.sass')
    .pipe($.sass()
      .on('error', $.sass.logError))
    .pipe(gulp.dest('public'))
  .pipe($.livereload());
});

gulp.task('js', function () {
  gulp.src('src/**/*.js')
    .pipe($.babel())
    .pipe(gulp.dest('public'))
    .pipe($.livereload());
});

gulp.task('bower', function () {
  // var filterCSS = $.filter('**/*.css');
  var filterJS = $.filter('**/*.js');
  var overrides = {
    jquery: {
      main: [
        './dist/jquery.min.js'
      ]
    }
  }
  // gulp
  //   .src($.mainBowerFiles({overrides: overrides, debugging: true}))
  //   .pipe(filterCSS)
  //   .pipe($.concat('build.css'))
  //   .pipe(gulp.dest('public/lib'));
  gulp
    .src($.mainBowerFiles({overrides: overrides, debugging: true}))
    .pipe(filterJS)
    .pipe($.concat('build.js'))
    .pipe(gulp.dest('public/lib'));
});

gulp.task('browser-sync', function() {
  $.browserSync.init({
    server: {
      baseDir: "./public"
    }
  });
});

gulp.task('copy', function () {
  gulp.src(['src/assets/**/*'])
    .pipe(gulp.dest('public/assets'));
});

gulp.task('watch', function () {
  $.livereload.listen();
  gulp.watch('src/**/*.jade', ['jade']);
  gulp.watch('src/**/*.sass', ['sass']);
  gulp.watch('src/**/*.js', ['js']);
});

gulp.task('build:dev', ['jade', 'sass', 'js', 'bower', 'copy', 'watch']);

gulp.task('serve', ['build:dev'], function () {
  gulp.start('browser-sync');
  gulp.watch(['src/*.jade'], ['jade']).on('change', $.browserSync.reload);
  gulp.watch(['src/**/*.sass'], ['sass']).on('change', $.browserSync.reload);
  gulp.watch(['src/**/*.js'], ['js']).on('change', $.browserSync.reload);
  gulp.watch(['src/assets/*.*'], ['copy']).on('change', $.browserSync.reload);
});

gulp.task('default', ['clean'], function () {
  gulp.start('serve');
});
