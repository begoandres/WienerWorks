//There include the dependencies installed (hulp,browser sync, gulp-sass)
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {

    browserSync.init({
        server: "./app/"
    });

    gulp.watch("app/scss/*.scss", gulp.series('sass'));
    gulp.watch("app/*.html").on('change', browserSync.reload);
}));

// gulp command default allows local server to start, watch
// for sass file cnages.
gulp.task('default', gulp.series('serve'));
//code added from https://themesberg.com/blog/tutorial/gulp-4-bootstrap-sass-browsersync#comment-4934195750
