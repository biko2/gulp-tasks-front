/**
 * @file
 * Task: Compile: JavaScript.
 */

/* global module */

module.exports = function (gulp, plugins, options) {
  'use strict';

  gulp.task('compile:js', function () {

    return gulp.src([
      options.js.files
    ])
      .pipe(plugins.plumber({ errorHandler: plugins.notify.onError('Error compilando JS') }))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.babel({
        presets: ['es2015']
      }))
      .pipe(plugins.sourcemaps.write())
      .pipe(plugins.plumber.stop())
      .pipe(plugins.concat('app.js'))
      .pipe(gulp.dest(options.js.destination))
      .pipe(plugins.notify("Compilación JS terminada"));

  });

  gulp.task('compile:vendorjs', function () {

    return gulp.src(
      options.js.vendorFiles
    )
      .pipe(plugins.plumber({ errorHandler: plugins.notify.onError('Error compilando VENDORS JS') }))
      .pipe(plugins.concat('vendor.js'))
      .pipe(gulp.dest(options.js.destination))
      .pipe(plugins.notify("Compilación VENDORS JS terminada"));
  });
};
