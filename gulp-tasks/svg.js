/**
 * @file
 * Task: Optimize images.
 */

module.exports = function (gulp, plugins, options) {
  'use strict';

  
  gulp.task('svg:sprite-page', function() {
    return gulp.src(options.svg.files)
      .pipe(plugins.svgsprite(options.svg))
      .pipe(gulp.dest(options.svg.destination));
  });
  gulp.task('svg', gulp.series('svg:sprite-page'));
};
