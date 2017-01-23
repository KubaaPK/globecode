    var gulp = require('gulp');
    var sass = require('gulp-sass');
    var browserify = require('browserify');
    var source = require('vinyl-source-stream');
    var buffer = require('vinyl-buffer');
    var browserSync = require('browser-sync').create();
    var uglify = require('gulp-uglify');
    var concat = require('gulp-concat');
    var historyApiFallback = require('connect-history-api-fallback');


    gulp.task('scripts', function(){
        return gulp.src(['./src/assets/**/*.js'])
                .pipe(uglify())
                .pipe(concat('vendor.min.js'))
                .pipe(gulp.dest('./public/'));
    });

    gulp.task('browserify', function() {
        // Grabs the app.js file
        return browserify('./src/app/app.js')
            // bundles it and creates a file called main.js
            .bundle()
            .pipe(source('main.js'))
            .pipe(gulp.dest('./public/'));
    })

    gulp.task('copy', ['browserify','scss'], function() {
        gulp.src(['./src/**/*.html','./src/**/*.css'])
            .pipe(gulp.dest('./public'))
            .pipe(browserSync.stream())
    });

    gulp.task('scss', function() {
        gulp.src('./src/assets/sass/*.sass')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('./src/assets/stylesheets/'));
    });

    gulp.task('build',['scss', 'copy', 'scripts']);

    gulp.task('browser-sync', ['build'], function() {
        browserSync.init({
            server: {
                baseDir: "./public",
                middleware: [ historyApiFallback() ],
                // The key is the url to match
                // The value is which folder to serve (relative to your current working directory)
                routes: {
                    "/bower_components": "bower_components",
                    "/node_modules": "node_modules"
                }
            },
            browser:"chrome"
        });
    });


    gulp.task('default', ['browser-sync'], function(){
        gulp.watch("./src/**/*.*", ["build"]);
        gulp.watch("./public/**/*.*").on('change', browserSync.reload);
    })