/**
 * @file
 * Task: Generate TWIG based pages.
 */

 module.exports = function (gulp, plugins, options) {
    'use strict';
    var path = require('path');
    var fs = require('fs');
    var glob = require('glob');

      gulp.task('twigPages', function () {
        //Define empty variable for page list.
        var pageList = [];
        //Iterate over source files.
        var pageListFiles =  glob.sync(options.twigPages.src)
        pageListFiles.forEach(function(file){
            //If index exits
            if(path.parse(file)['name'] == "index") {
                return;
            }
            //Adding entry to the list.
            pageList.push(path.parse(file)['name'] + '.html');
        });
        return gulp.src([options.twigPages.src])
        //Stay live and reload on error.
        .pipe(plugins.plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        //Setting default data.
        .pipe(plugins.data(function(file){
            return {
                title:'Default Title',
                pageTitle: "Default Page Title",
                pageList: pageList
            }
        }))
        //Getting json data.
        .pipe(plugins.data(function(file){
            var jsonFilePath = options.twigPages.data + path.parse(file.path)['name'] + '.json';
            //Verify exits.
            if(!fs.existsSync(jsonFilePath)){
                //No file, return empty object.
                return {};
            }
            //Return parsed file.
            return JSON.parse(fs.readFileSync(jsonFilePath));
        }))
        //Render via Twig plugin
        .pipe(plugins.twig())
        .on('error', function (err) {
            process.stderr.write(err.message + '\n');
            this.emit('end');
        })
        //Save files.
        .pipe(gulp.dest(options.twigPages.destination));
    });

    gulp.task('watch:twigPages', function () {
        return gulp.watch(options.twigPages.allSrc,gulp.series('twigPages','browser-sync:reload'));
      });
  };