var options = {

  // See https://github.com/sass/node-sass#options
  'sass': {
    outputStyle: 'expanded',
    errLogToConsole: true
  },

  'paths': {
    'output': './dest',
    'copy': './copy'
  },

  'globs': {
    'input': ['scss/**/*.scss'],
    'copy': ['copy/css-social-buttons/**'],
  },

  // See https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-api
  'cleanup': {
    advanced: true,
    processImport: false
  },

  // See https://github.com/ai/browserslist#queries
  'browsers': [
    'last 3 versions',
    'ie 10',
    'ie 11',
    '> 1% in US'
  ],

}



var gulp = require('gulp');
var util = require('gulp-util');
var del = require('del');
var scss = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean-css');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');



gulp.task('default', ['clean', 'build', 'copy']);



gulp.task('clean', function(callback) {
  del(options.paths.output + '/?**', function() {
    callback(); // No-op; helps gulp manage concurrency.
  });
});



gulp.task('build', ['clean'], function() {
  return gulp.src(options.globs.input, {
      base: 'scss'
    })
    .pipe(sourcemaps.init())

    .pipe(scss(options.sass))
    .pipe(autoprefixer(options.browsers))
    .pipe(clean(options.cleanup))

    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(options.paths.output))
});



gulp.task('copy', ['clean'], function() {
  return gulp.src(options.globs.copy, {
      base: options.paths.copy
    })
    .pipe(gulp.dest(options.paths.output));
})



gulp.task('doc', ['default'], function() {});

gulp.task('dev', ['default'], function() {
  util.log('Press Ctrl+C to end watch.');
  gulp.watch([options.globs.input], ['default']);
});