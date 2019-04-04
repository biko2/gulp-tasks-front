var path = require('path');

module.exports = function (gulp, customPaths, customOptions) {
    'use strict';
// Setting pattern this way allows non gulp- plugins to be loaded as well.
var plugins = require('gulp-load-plugins')({
    pattern: '*',
    rename: {
      'node-sass-import-once': 'importOnce',
      'gulp-sass-glob': 'sassGlob',
      'run-sequence': 'runSequence',
      'gulp-clean-css': 'cleanCSS',
      'gulp-stylelint': 'gulpStylelint',
      'gulp-eslint': 'gulpEslint',
      'gulp-babel': 'babel',
      'gulp-util': 'gutil',
      'gulp-notify': 'notify',
      'gulp-concat': 'concat',
      'gulp-uglify': 'uglify',
      'gulp-imagemin': 'imagemin',
      'gulp-twig' : 'twig',
      'gulp-data' : 'data',
      'glob': 'glob',
      'flatten': 'gulp-flatten',
      'gulp-svg-sprite': 'svgsprite',
        }
    });
    //Default paths.
    var paths = {
      styles: {
        source: 'src/assets/scss/',
        destination: 'assets/css/'
      },
      scripts: {
        source: 'src/assets/js/',
        destination: 'assets/js',
        
      },
      scriptsVendorFiles: [
      ],
      images: {
        source: 'src/assets/images/',
        destination: 'assets/images/'
      },
      fonts: {
        source: 'src/assets/fonts/',
        destination: 'assets/fonts/'
      },
      styleGuide: 'styleguide',
      jekyll: 'src/pages/',
      twigPages: {
        src: 'src/twigPages/' ,
        componentsSrc: 'src/twigPages/components/' ,
        data: 'src/twigPages/data/',
        destination: 'assets/pages/',
        componentsDestination:'assets/pages/components'
      },
      svg : {
        source: 'src/assets/svg',
        destination: 'assets/svg'
      }
    };
console.log(paths);
console.log(customPaths);


    //Mezclamos los custom paths con los defaults.
    Object.assign(paths,customPaths );

    //Default options.
    var options = {
        drupalLibraries: {
          destination:'./generated.libraries.yml'
        },
        // ----- Browsersync ----- //
        browserSync: {
          // Put your local site URL here to prevent Browsersync
          // from prompting you to add additional scripts to your page.
          // open: 'external',
          //xip: true,
          //logConnections: true
      
          server: {baseDir: ['assets']},
          startPath: "/pages",
          port: 3005,
          online: false,
      
          open: true,
          //ghostMode: false,
          logConnections: true,
        },
      
        // ----- JEKYLL ----- //
      
        jekyll: {
          files: path.join(paths.jekyll, '**/*'),
        },
      
        // ----- CSS ----- //
      
        css: {
          files: path.join(paths.styles.destination, '**/*.css'),
          file: path.join(paths.styles.destination, '/styles.css'),
          destination: path.join(paths.styles.destination)
        },
      
        // ----- Sass ----- //
      
        sass: {
          files: path.join(paths.styles.source, '**/*.scss'),
          file: path.join(paths.styles.source, 'styles.scss'),
          destination: path.join(paths.styles.destination),
          AUTOPREFIXER_BROWSERS: [
            'ie >= 10',
            'ie_mob >= 10',
            'ff >= 30',
            'chrome >= 34',
            'safari >= 9',
            'opera >= 23',
            'ios >= 8',
            'android >= 4.4',
            'bb >= 10'
          ]
        },
      
        // ----- JS ----- //
        js: {
          files: path.join(paths.scripts.source, '**/*.js'),
          compiledFiles: path.join(paths.scripts.destination, '**/*.js'),
          vendorFiles: paths.scriptsVendorFiles,
          destination: path.join(paths.scripts.destination),
          vendorDestination: path.join(paths.scripts.destination,'vendors')
        },
      
        // ----- eslint ----- //
        jsLinting: {
          files: {
            theme: [
              paths.scripts.source + '**/*.js',
              '!' + paths.scripts.source + '**/*.min.js'
            ],
            gulp: [
              'gulpfile.js',
              'gulp-tasks/**/*'
            ]
          }
      
        },
        // ----- Fonts ----- //
        fonts: {
          files: paths.fonts.source + '**/*.{ttf,woff,otf,eot,svg,woff2}',
          destination: paths.fonts.destination
        },
        // ----- Images ----- //
        images: {
          files: paths.images.source + '**/*.{png,gif,jpg,svg,xml,webmanifest}',
          destination: paths.images.destination
        },
        // ----- TWIG pages ---- //
        twigPages: {
          baseSrc: path.join(paths.twigPages.src),
          src: path.join(paths.twigPages.src, '/*.twig'),
          componentsSrc: path.join(paths.twigPages.componentsSrc, '/**/*.twig'),
          allSrc: path.join(paths.twigPages.src, '/**/*'), //Needed for watch task
          data:path.join(paths.twigPages.data),
          destination: path.join(paths.twigPages.destination),
          componentsDestination: path.join(paths.twigPages.componentsDestination)
        },
      
        // ----- KSS Node ----- //
        styleGuide: {
          source: [
            paths.styles.source
          ],
          builder: 'builder/twig',
          destination: 'styleguide/',
          css: [
            path.relative(paths.styleGuide, paths.styles.destination + 'styles.css'),
            path.relative(paths.styleGuide, paths.styles.destination + 'style-guide-only/kss-only.css')
          ],
          js: [],
          homepage: 'style-guide-only/homepage.md',
          title: 'Living Style Guide'
        },
      
        // ------ pa11y ----- //
        pa11y: {
          urls: [ // An array of urls to test.
            // For testing in a travis environment:
            // 'http://127.0.0.1:8888',
            // 'http://127.0.0.1:8888/themes/custom/yourtheme/styleguide'
            'http://localhost:8000',
            'http://localhost:8000/node/1'
          ],
          failOnError: true, // fail the build on error
          showFailedOnly: true, // show errors only and override reporter
          reporter: 'console',
          includeWarnings: true, // including warnings by default. - set it to false to disable
          includeNotices: true, // including notices by default. - set it to false to disable
          log: {
            debug: console.log.bind(console),
            error: console.error.bind(console),
            info: console.info.bind(console)
          },
          standard: 'WCAG2AA', // choose from Section508, WCAG2A, WCAG2AA, and WCAG2AAA
          page: {
            settings: {
              loadImages: false,
              userName: '', // .htacess username
              password: '' // .htaccess password
            }
          },
          threshold: { // Set to -1 for no threshold.
            errors: 1,
            warnings: 10,
            notices: -1
          }
        },
        svg: {
          files: path.join(paths.svg.source, '**/*.svg'),
          destination: path.join(paths.svg.destination),
          mode: {
            symbol: { // symbol mode to build the SVG
              render: {
                css: true, // CSS output option for icon sizing
                scss: true // SCSS output option for icon sizing
              },
              dest: 'sprite', // destination folder
              prefix: '.svg--%s', // BEM-style prefix if styles rendered
              sprite: 'sprite.svg', //generated sprite name
              example: true // Build a sample page, please!
            }
          },
        },
        svg2: {
          files: path.join(paths.svg.source, '**/*.svg'),
          destination: path.join(paths.svg.destination),
          mode: {
            symbol: { // symbol mode to build the SVG
              //dest: path.join(paths.svg.destination), // destination foldeer
              sprite: 'sprite.svg', //sprite name
              example: true // Build sample page
            },
            css: { // Activate the «view» mode
            //  bust: false,
             // dest: path.join(paths.svg.destination),
              render: {
                css: true // Activate Sass output (with default options)
              }
            }
          },
          svg: {
            xmlDeclaration: false, // strip out the XML attribute
            doctypeDeclaration: false // don't include the !DOCTYPE declaration
          }
        }
    }

    //Asignamos las opciones custom.
    Object.assign(options,customOptions );


    //Cargamos las task del gulp.
    require('./gulp-tasks/svg')(gulp, plugins, options);
    require('./gulp-tasks/twigpages')(gulp, plugins, options);
    require('./gulp-tasks/browser-sync')(gulp, plugins, options);
    require('./gulp-tasks/images')(gulp, plugins, options);
    require('./gulp-tasks/clean-css')(gulp, plugins, options);
    require('./gulp-tasks/clean-js')(gulp, plugins, options);
    require('./gulp-tasks/clean-styleguide')(gulp, plugins, options);
    require('./gulp-tasks/clean-twigpages')(gulp, plugins, options);
    require('./gulp-tasks/clean')(gulp, plugins, options);
    require('./gulp-tasks/compile-sass')(gulp, plugins, options);
    require('./gulp-tasks/compile-js')(gulp, plugins, options);
    require('./gulp-tasks/compile-styleguide')(gulp, plugins, options);
    require('./gulp-tasks/jekyll')(gulp, plugins, options);
    require('./gulp-tasks/lint-js')(gulp, plugins, options);
    require('./gulp-tasks/lint-css')(gulp, plugins, options);
    require('./gulp-tasks/minify-css')(gulp, plugins, options);
    require('./gulp-tasks/minify-js')(gulp, plugins, options);
    require('./gulp-tasks/fonts')(gulp, plugins, options);
    require('./gulp-tasks/drupal-libraries')(gulp, plugins, options);
    require('./gulp-tasks/drupal-dev')(gulp, plugins, options);

    require('./gulp-tasks/build')(gulp, plugins, options);
    require('./gulp-tasks/watch')(gulp, plugins, options);
    require('./gulp-tasks/serve')(gulp, plugins, options);
    require('./gulp-tasks/default')(gulp, plugins, options);
  };
