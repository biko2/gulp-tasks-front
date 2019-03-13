# GULP TASKS for Drupal __front__ theme
![by Biko2](https://raw.githubusercontent.com/biko2/biko-repo-bagdes/master/png/biko-bagge-pill.png)
![GitHub last commit](https://img.shields.io/github/last-commit/biko2/gulp-tasks-front.svg?style=plastic)
![npm](https://img.shields.io/npm/v/gulp-tasks-front.svg)
![node](https://img.shields.io/node/v/gulp.svg)
![Maintenance](https://img.shields.io/maintenance/yes/2020.svg)



## Install
```
npm install gulp-tasks-front --save-dev
```

## Tasks
- default: Executes *build* task
- build: Compiles everything.
- watch: Track changes on files and recompiles modified part.
- serve: Launch development environment and watches files. Livereload active.
- clean: Deletes destination folder.
- compile:
  - compile:js:
  - compile:sass:
  - compile:styleguide:
- fonts: Copies fonts to destination folder
- images: Optimizes images.
- jekyll: Compiles Jekyll pages. Works but DEPRECATED in favor of TwigPages
- twigPages: Compiles Twig based static pages.
- svg: SVG Sprite sheet. Compiles svg files into sprite sheet.

## Default paths
```
{
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
        data: 'src/twigPages/data/',
        destination: 'assets/pages/'
      },
      svg : {
        source: 'src/assets/svg',
        destination: 'assets/svg'
      }
    };

```

## Default options
```
var options = {
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
          destination: path.join(paths.scripts.destination)
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
          src: path.join(paths.twigPages.src, '/*.twig'),
          allSrc: path.join(paths.twigPages.src, '/**/*'), //Needed for watch task
          data:path.join(paths.twigPages.data),
          destination: path.join(paths.twigPages.destination)
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
          files: path.join(paths.svg.source, '**/*.scss'),
          destination: path.join(paths.svg.destination),
          mode: {
            symbol: { // symbol mode to build the SVG
              dest: path.join(paths.svg.destination), // destination foldeer
              sprite: 'sprite.svg', //sprite name
              example: true // Build sample page
            }
          },
          svg: {
            xmlDeclaration: false, // strip out the XML attribute
            doctypeDeclaration: false // don't include the !DOCTYPE declaration
          }
        }
    }

```