/**
 * @file
 * Task: Generate TWIG based pages.
 */

 module.exports = function (gulp, plugins, options) {
    'use strict';
    let path = require('path');
    let fs = require('fs');
    let glob = require('glob');
      gulp.task('twigPages:base', function () {
        //Define empty variable for page list.
        let pageList = [];
        //Iterate over source files.
        let pageListFiles =  glob.sync(options.twigPages.src);
        pageListFiles.forEach(function(file){
            //If index exits
            if(path.parse(file)['name'] == "index") {
                return;
            }
            //Adding entry to the list.
            pageList.push(path.basename(file,'.twig'));
        });
        let componentList = [];

        let componentListFiles =  glob.sync(options.twigPages.componentsSrc);
        componentListFiles.forEach(function(file){
            //Adding entry to the list.
           componentList.push(path.basename(file,'.twig'));
        });
        return gulp.src([path.join(options.twigPages.baseSrc,'index.html')])
            .pipe(plugins.data(function(file){
                return {
                    pageList:pageList,
                    componentList:componentList
                }
            }))
            .pipe(plugins.twig({
                base:path.join(options.twigPages.baseSrc),
                functions:[
                    {
                        name: "svgSprite",
                        func: function (args) {
                            return '<svg><use xlink:href="/svg/sprite/sprite.svg#' + args + '"></use></svg>';
                        }
                    }
                ]
            }))
            .on('error', function (err) {
                process.stderr.write(err.message + '\n');
                this.emit('end');
            })
            //Save files.
            .pipe(gulp.dest(options.twigPages.destination));
        
    });
    gulp.task('twigPages:pages', function () {
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
        .pipe(plugins.twig({
            base:path.join(options.twigPages.baseSrc),
            functions:[
                {
                    name: "svgSprite",
                    func: function (args) {
                        return '<svg><use xlink:href="/svg/sprite/sprite.svg#' + args + '"></use></svg>';
                    }
                }
            ]
        }))
        .on('error', function (err) {
            process.stderr.write(err.message + '\n');
            this.emit('end');
        })
        //Save files.
        .pipe(gulp.dest(options.twigPages.destination));
    });
    gulp.task('twigPages:components', function () {
        return gulp.src([options.twigPages.componentsSrc])
            .pipe(plugins.plumber({
                handleError: function (err) {
                    console.log(err);
                    this.emit('end');
                }
            }))
            .pipe(plugins.twig({
                useFileContents:true,
                base:path.join(options.twigPages.baseSrc),
                functions:[
                    {
                        name: "svgSprite",
                        func: function (args) {
                            return '<svg><use xlink:href="/svg/sprite/sprite.svg#' + args + '"></use></svg>';
                        }
                    }
                ]
            }))
            .on('error', function (err) {
                process.stderr.write(err.message + '\n');
                this.emit('end');
            })
            //Save files.
            .pipe(gulp.dest(options.twigPages.componentsDestination));
      });
    gulp.task('watch:twigPages', function () {
        return gulp.watch(options.twigPages.allSrc,gulp.series('twigPages','browser-sync:reload'));
      });
      gulp.task('twigPages', gulp.parallel('twigPages:base','twigPages:components','twigPages:pages'));
  };