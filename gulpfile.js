// npm install --save-dev gulp gulp-sass browser-sync sass
const {src, dest, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();


// compile sass into css
function style(){
    // where is my sass file
    return src('./scss/**/*.scss')
    // pass that file through sass compiler
        .pipe(sass().on('error', sass.logError))
    // Where do I save that compiled CSS?
        .pipe(dest('./'))
        .pipe(browserSync.stream());
}

// watch for any changes in scss folder
function watchme(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    watch('./scss/**/*.scss', style);
    watch('./*.html').on('change', browserSync.reload);
}

exports.watchme = watchme;
exports.default = watchme;