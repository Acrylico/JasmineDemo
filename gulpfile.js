var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var scripts = ['src/*.js', 'src/**/*.js'];
var libs = ['bower_components/angular/angular.js',
    'bower_components/angular-route/angular-route.js'];
var tests = ['spec/*.js'];

// Lint Task
gulp.task('lint', function () {
    return gulp.src(scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate JS - TESTS
gulp.task('tests', function () {
    return gulp.src(tests)
        .pipe(concat('tests-all.js'))
        .pipe(gulp.dest('dist'))
});

// Concatenate & Minify JS - LIBRARIES
gulp.task('libs', function () {
    return gulp.src(libs)
        .pipe(concat('libs-all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('libs-all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// Concatenate & Minify JS -- APP
gulp.task('appscripts', function () {
    return gulp.src(scripts)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch(scripts, ['lint', 'appscripts', 'tests']);
});

// Default Task
gulp.task('default', ['lint', 'libs', 'appscripts', 'tests']);
