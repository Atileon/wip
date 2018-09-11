var gulp = require("gulp");
var connect = require("gulp-connect");
var babel = require("gulp-babel");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var sourcemaps = require("gulp-sourcemaps");

// PATHS
var SCRIPT_PATH = "./scripts/**/*.js";
var SASS_PATH = "./scss/styles.scss";
var DIST_PATH = "./dist/";

//Server
gulp.task("connect", () => {
  connect.server({
    root: "dist",
    livereload: true
  });
});

//Scripts
gulp.task("scripts", () => {
  gulp
    .src(SCRIPT_PATH)
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(`${DIST_PATH}js/`))
    .pipe(connect.reload());
});

//Styles
gulp.task("scss", () => {
  gulp
    .src(SASS_PATH)
    .pipe(sourcemaps.init())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH + "css/"))
    .pipe(connect.reload());
});
//Html
gulp.task("html", () => {
  gulp
    .src("./*.html")
    .pipe(gulp.dest(DIST_PATH))
    .pipe(connect.reload());
});
//Watch
gulp.task("watch", ["default"], () => {
  gulp.watch(["./scripts/*.js"], ["scripts"]);
  gulp.watch(["./*.html"], ["html"]);
  gulp.watch(["./scss/**/*.scss"], ["scss"]);
});

//Default Gulp

gulp.task("default", ["connect", "html", "scss", "scripts"]);
