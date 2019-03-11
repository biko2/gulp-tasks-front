var path = require('path');

var yaml = require('js-yaml');

module.exports = function (gulp, plugins, options) {
    'use strict';
  
    gulp.task('drupal:libraries', function () {
      if(options.js.vendorFiles.length === 0){
  
        plugins.notify("Sin VENDORS libraries que compilar.");
        return Promise.resolve('Vendors ignored');
      }
      let vendorsYml = {};
      for(var vendorFile of options.js.vendorFiles){
          let vendorName = path.parse(vendorFile)['name'] ;
          let vendorPath = path.join(options.js.destination,path.basename(vendorFile));
          let vendor = {
            version: 'VERSION',
            js: {
                [vendorPath]: {}
            }
          };
          //vendorsYml.push(vendor);
          vendorsYml[vendorName] = vendor;
          console.log(vendor);
          
      }
      console.log(yaml.dump(vendorsYml));
      
      //return Promise.resolve('Vendors finished');
      return gulp.src(
        options.js.vendorFiles
      )
        .pipe(plugins.plumber({ errorHandler: plugins.notify.onError('Error compilando VENDORS JS') }))
       // .pipe(plugins.concat('vendor.js'))
        .pipe(plugins.flatten())
        .pipe(gulp.dest(options.js.destination))
        .pipe(plugins.notify("Compilación VENDORS JS terminada"));
    });
  };
  