var gulp = require('gulp');
var sass = require('gulp-sass');
var fileinclude = require('gulp-file-include');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var connect = require('gulp-connect');

gulp.task('sass', function () {
  gulp.src('./src/sass/*.scss')
    .pipe(
      sass({
        outputStyle: 'compressed'
      }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload());
});

gulp.task('copy-images', function () {
  gulp.src(['./src/img/**/*'])
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('copy-fonts', function () {
  gulp.src(['./src/fonts/**/*'])
    .pipe(gulp.dest('./dist/fonts'));
});
 
gulp.task('fileinclude', function() {
  gulp.src(['./src/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

gulp.task('compileJS', function(){
  gulp.src([ 
    "./src/js/lib/jquery-1.12.0.min.js",
    "./src/js/lib/*.js"
  ])
    .pipe(concat('concat-lib.js'))
    //.pipe(uglify())
    .pipe(gulp.dest("./dist/js"));
    gulp.src([ 
      "./src/js/**/*.js",
      "./src/modules/**/*.js",
      "!./src/js/lib/*.js"
    ])
    .pipe(babel()) 
    .pipe(concat('app.js'))
    //.pipe(uglify()) 
    .pipe(gulp.dest("./dist/js"))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  	gulp.watch('./src/**/*.scss', ['sass']);
    gulp.watch(['./src/**/*.html'], ['fileinclude']);
  	gulp.watch('./src/**/*.js', ['compileJS']);
  	gulp.watch(['./src/img/**/*.png','./src/img/**/*.jpg','./src/img/**/*.gif'], ['copy-images']);
    connect.server({
      root: 'dist',
      livereload: true
    });
});