var gulp = require("gulp");
var livereload = require("gulp-livereload");
var less = require('gulp-less');
var rename = require("gulp-rename");
var minifycss = require("gulp-minify-css");
var browserify = require("gulp-browserify");
var autoprefixer = require("gulp-autoprefixer");
var concat = require("gulp-concat");

var src = {
    style: "src/css/main.less",
    script: "src/js/app.js",
    lib: "src/css/lib/*.css"
};

var dest = {
    style: "static/css",
    script: "static/js",
    lib: "static/lib"
};

gulp.task("lib", function() {
    return gulp.src(src.lib)
      .pipe(concat('lib.css'))
      .pipe(minifycss())
      .pipe(gulp.dest(dest.lib));
});

gulp.task("style", function() {
    return gulp.src(src.style)
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(gulp.dest(dest.style))
        .pipe(minifycss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(dest.style));
});

gulp.task("script", function() {
    return gulp.src(src.script)
        .pipe(browserify())
        .pipe(gulp.dest(dest.script));
});

gulp.task("default", ['lib', 'style', 'script']);

gulp.task("watch", function() {
    gulp.watch("src/css/**/*", ["style"]);
    gulp.watch("src/js/**/*", ["script"]);
    gulp.watch("src/lib/**/*", ["lib"]);

    livereload.listen();

    gulp.watch(["static/*/**", "index.html"]).on("change", livereload.changed);
});
