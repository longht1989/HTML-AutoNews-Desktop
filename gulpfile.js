// ====================================
// gulp file
// ====================================
/*
 * TABLE OF CONTENTS
 *
 * require gulp
 * define paths of folder, project name
 * error
 * styles
 * copy
 * compress PNG
 */
// > require gulp
var gulp = require('gulp'),
    del = require('del'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    cssmin = require('gulp-minify-css'),
    rename = require("gulp-rename"),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    inject = require('gulp-inject-string'),
    imagemin = require('gulp-imagemin'),
    imageminPngquant = require('imagemin-pngquant'),
    removeCode = require('gulp-remove-code'),
    cssbeautify = require('gulp-cssbeautify'),
    rmLines = require('gulp-rm-lines');

// > define paths of folder, project name
var paths = {
    source_folder: "./source",
    dist_folder: "dist",
    js_dev: './source/js',
    js: './dist/js',
    scss_dev: './source/scss',
    css: './dist/styles/css',
    html_dev: "./source/html",
    html: "./dist/html",
    fonts_dev: "./source/fonts",
    fonts: "./dist/styles/fonts",
    img_dev: "./source/img",
    img: "./dist/styles/img",
    figImg_dev: "./source/figurations",
    figImg: "./dist/figurations"
};

// > get datetime version
function getDateTime() {
    var d = new Date();
    var month = d.getMonth() + 1;
    if(month < 10) month = 0 + "" + month;
    var day = d.getDate();
    if(day < 10) day = 0 + "" + day;
    var hours = d.getHours();
    if(hours < 10) hours = 0 + "" + hours;
    var minutes = d.getMinutes();
    if(minutes < 10) minutes = 0 + "" + minutes;
    var n = d.getFullYear() + "" + month + "" + day + "" + hours + "" + minutes;
    return n;
}

// > error
function reportError(error, project, css_file) {
    var text = error.toString();
    text = text.replace(/\n/gm, " \\A ");
    text = text.replace(/('|")/gm, " ");
    gulp.src(paths.dist_folder + '/' + project + '/styles/css/' + css_file)
        .pipe(inject.append("body:before{content : '" + text + "';white-space: pre;padding: 50px;display: block;}"))
        .pipe(gulp.dest(paths.dist_folder + '/' + project + '/styles/css'))
        .pipe(browserSync.stream({ once: true }));
};

// > styles 
function style(project, scss_file, css_file) {
    gulp.src(paths.source_folder + '/' + project + '/scss/' + scss_file)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', function(err) {
            reportError(err, project, css_file);
        }))
        .pipe(cssmin())
        .pipe(sourcemaps.write('../maps', {
            mapFile: function(mapFilePath) {
                return mapFilePath.replace('.css.map', "-" + getDateTime() + '.map');
            }
        }))
        .pipe(gulp.dest(paths.dist_folder + '/' + project + '/styles/css'))
        .pipe(browserSync.stream({ once: true }));
};

// > copy 
function copy_js(project) {
    gulp.src(paths.source_folder + '/' + project + '/js/**/*.js')
        .pipe(gulp.dest(paths.dist_folder + '/' + project + '/js'));
};

function copy_html(project) {
    gulp.src(paths.source_folder + '/' + project + '/html/**/*.html')
        .pipe(gulp.dest(paths.dist_folder + '/' + project + '/html'));
};

function copy_fig_img(project) {
    gulp.src(paths.source_folder + '/' + project + '/figurations/**/*')
        .pipe(gulp.dest(paths.dist_folder + '/' + project + '/figurations'));
};

function copy_font(project) {
    gulp.src(paths.source_folder + '/' + project + '/fonts/**/*')
        .pipe(gulp.dest(paths.dist_folder + '/' + project + '/styles/fonts'));
};

function copy_img(project) {
    gulp.src(paths.source_folder + '/' + project + '/img/**/*')
        .pipe(gulp.dest(paths.dist_folder + '/' + project + '/styles/img'));
};

// > compress PNG
function compress_png(project) {
    gulp.src(paths.source_folder + '/' + project + '/img/**/*.png')
        .pipe(imagemin(imageminPngquant({ speed: '1' })))
        .pipe(gulp.dest(paths.dist_folder + '/' + project + '/styles/img'));
}

// > delete
function delete_dist(project) {
    del.sync([paths.dist_folder + '/' + project + '/*', '!' + paths.dist_folder + '/' + project + '/.git']);
};

function abf(project, link_static) {
    gulp.src(paths.dist_folder + '/' + project + '/styles/css/' + project + '.css')
        .pipe(rename({
            basename: project + '-abf'
        }))
        .pipe(inject.replace('../fonts', link_static + '/fonts'))
        .pipe(inject.replace('../img', link_static + '/img'))
        .pipe(gulp.dest(paths.dist_folder + '/' + project + '/styles/css'))
        .pipe(browserSync.stream({ once: true }));
        // demo 
        // gulp.task('autonews-d', function() { task_run('autonews-desktop', 'https://baomoi-static.zadn.vn/desktop/styles'); });
};

function task_run(project, link_static) {
    copy_img(project);
    style(project, project + ".scss", project + ".css");
    copy_js(project);
    copy_html(project);
    copy_fig_img(project);
    copy_font(project);
    compress_png(project);
    if (link_static) {abf(project, link_static)};

    browserSync.init({ server: { baseDir: "./" }, open: false });
    gulp.watch(paths.source_folder + '/' + project + '/scss/**/*', function(obj) {
        if (obj.type === 'changed') {
            del.sync([paths.dist_folder + '/' + project + '/styles/maps/**']);
            style(project, project + ".scss", project + ".css");
        }
    });
    gulp.watch(paths.source_folder + '/' + project + '/js/**/*', function(obj) {
        if (obj.type === 'changed') {
            copy_js(project);
        }
    });
    gulp.watch(paths.source_folder + '/' + project + '/html/**/*', function(obj) {
        if (obj.type === 'changed') {
            copy_html(project);
        }
    });
}
gulp.task('autonews-d', function() { task_run('autonews-desktop'); });
gulp.task('delete-autonews-d', function() { delete_dist('autonews-desktop'); });
