const gulp = require("gulp");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const sourceMaps = require("gulp-sourcemaps");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const browserSync = require("browser-sync");
const config = {
    dist: "app/",
    src: "src/",
    scssin: "src/scss/**/*.scss",
    cssout: "app/css/",
    jsin: "src/js/**/*.js",
    jsout: "app/js/"
};

gulp.task('default', () => { console.log("Add a gulp's parameter!") });

gulp.task("css", () => {
    gulp.src(config.scssin)
        .pipe(sourceMaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ["last 2 versions", "ff >= 42", "ie >= 10", "Chrome >= 46", "safari > 7"]
        }))
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log("SASS file: " + details.stats.originalSize + "B");
            console.log("CSS  file: " + details.stats.minifiedSize + "B");
        }))
        .pipe(rename("style.min.css"))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(config.cssout))
        .pipe(browserSync.stream());
});

gulp.task("js", () => {
    gulp.src(config.jsin)
        .pipe(sourceMaps.init())
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(rename("main.min.js"))
        .pipe(sourceMaps.write())
        .pipe(uglify().on("error", (e) => {
            console.log(e);
        }))
        .pipe(gulp.dest(config.jsout));
});

gulp.task("serve", ["css", "js"], () => {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("index.html", ["reload"]);
    gulp.watch(config.jsin, ["js"]);
    gulp.watch(config.scssin, ["css"]);
});

gulp.task("reload", () => browserSync.reload());