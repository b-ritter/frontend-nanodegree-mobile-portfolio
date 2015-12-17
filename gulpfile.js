var gulp = require('gulp');

// Testing
var browserSync = require('browser-sync').create();
var ngrok = require('ngrok');
var psi = require('psi');
var sequence = require('run-sequence');
var site = '';
var portVal = 3020;

// Compiling js and sass
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var app_js_path = 'js/app_src/';
var app_js = [

];

// Normal browser sync
gulp.task('browser-sync', function() {
    browserSync.init({
        port: portVal,
        open: false,
        server: {
          baseDir: ''
        },
        tunnel: 'pizza'
    });
});

app_js.forEach(function(currentValue, index, app_js){
  app_js[index] = app_js_path + currentValue;
});

gulp.task('styles', function() {
    gulp.src('scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
				.pipe(autoprefixer())
        .pipe(gulp.dest('css/'));
});

gulp.task('concat-js', function(){
  return gulp.src(app_js)
    .pipe(concat('*.js'))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('js/'));
});

gulp.task('watch', function(){
 gulp.watch('scss/**/*.scss', ['styles']);
 gulp.watch( app_js, ['concat-js']);
});

gulp.task('min', function(){
	return gulp.src('js/**/*.js')
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(''));
});



gulp.task('default', [ 'watch' ]);
