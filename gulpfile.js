var gulp = require('gulp');
var clean = require('del');
var less = require('gulp-less');
var watch = require('gulp-watch');
var uncss = require('gulp-uncss');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var imagemin = require('gulp-imagemin');
var annotate = require('gulp-ng-annotate')
var minifycss = require('gulp-minify-css');
var pngquant = require('imagemin-pngquant');
var sourcemaps = require('gulp-sourcemaps');
var minifyhtml = require('gulp-minify-html');


// App Files
var appScripts = [
  'app/*.module.js',
  'app/*.constants.js',
  'app/*.route.js',
  'app/**/*.js',
];
var appStyles = [
  'assets/styles/*.less'
];
var appImages = [
  'assets/images/**'
];
var appFonts = [
  'assets/fonts/**'
];
var appVideos = [];

// Vendor Files
var vendorScripts = [
  'bower_components/angular/angular.min.js',
  'bower_components/angular-ui-router/release/angular-ui-router.min.js'
];
var vendorStyles = [];
var vendorFonts = [];


// Start the server
gulp.task('server', ['default'], function() {
  connect.server({
    root: "www",
    port: 2000,
    host: '0.0.0.0',
    livereload: false
  });
});

gulp.task('liveserver', ['default'], function() {
  connect.server({
    root: "www",
    port: 2000,
    host: '0.0.0.0',
    livereload: true
  });
});


// Serve the www/ directory without rebuilding
gulp.task('serve', function() {
  connect.server({
    root: "www",
    port: 2000,
    host: '0.0.0.0',
    livereload: false
  });
});


// Clean
gulp.task('clean', function() {
  return clean(['www/scripts', 'www/assets', 'www/*.html']);
});


// Prune
gulp.task('prune', function() {
  return clean(['vendors']);
});


// Scripts
gulp.task('scripts', function() {
  gulp.src(appScripts)
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(annotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('www/scripts'))
});


// JSHint
gulp.task('hint', function() {
  gulp.src(appScripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
});


// Styles
gulp.task('styles', function() {
  gulp.src('assets/styles/app.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(minifycss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('www/assets/styles/'))
});


// Images
gulp.task('images', function() {
  gulp.src(appImages)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('www/assets/images/'))
});


// Videos
gulp.task('videos', function() {
  gulp.src(appVideos)
    .pipe(gulp.dest('www/assets/videos/'))
});


// Fonts
gulp.task('fonts', function() {
  gulp.src(appFonts)
    .pipe(gulp.dest('www/assets/fonts/'))
});


// Vendor
gulp.task('vendors', function() {
  gulp.src(vendorScripts)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('www/scripts'))
  gulp.src(vendorStyles)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('www/assets/styles'))
  gulp.src(vendorFonts)
    .pipe(gulp.dest('www/assets/fonts'))

});


// Views
gulp.task('views', function() {
  gulp.src('index.html')
    .pipe(minifyhtml())
    .pipe(gulp.dest('www/'));
  gulp.src('assets/views/**/*.html')
    .pipe(minifyhtml())
    .pipe(gulp.dest('www/assets/views'))
  gulp.src('app/components/*.html')
    .pipe(minifyhtml())
    .pipe(gulp.dest('www/assets/views'))
});


// Optimize
gulp.task('optimize', ['vendors', 'views'], function() {
  gulp.src('www/assets/styles/vendor.css')
    .pipe(uncss({
      html: ['www/index.html', 'www/assets/views/*']
    }))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('www/assets/styles/'));
});


// Default task
gulp.task('default', function() {
  gulp.start('scripts', 'vendors', 'views', 'styles', 'fonts');
});


// Build production site
gulp.task('build', ['default'], function() {
  gulp.start('images', 'videos', 'optimize');
});


// Watch
gulp.task('watch', ['default'], function() {

  // Watch app style, JS and image files
  gulp.watch(appScripts, ['scripts']);
  gulp.watch(appStyles, ['styles']);
  gulp.watch(appImages, ['images']);

  // Watch HTML files
  gulp.watch(['index.html', 'assets/views/**/*.html'], ['views']);

  // Watch any files in www/, reload on change
  watch("www/**").pipe(connect.reload());

});

gulp.task('watchlive', ['liveserver'], function() {

  // Watch app style, JS and image files
  gulp.watch(appScripts, ['scripts']);
  gulp.watch(appStyles, ['styles']);
  gulp.watch(appImages, ['images']);

  // Watch HTML files
  gulp.watch(['index.html', 'assets/views/**/*.html'], ['views']);

  // Watch any files in www/, reload on change
  watch("www/**").pipe(connect.reload());

});


// Live task
gulp.task('live', ['watchlive'], function() {
  // Watch app style, JS and image files
  gulp.watch(appScripts, ['scripts']);
  gulp.watch(appStyles, ['styles']);
  gulp.watch(appImages, ['images']);

  // Watch HTML files
  gulp.watch(['index.html', 'assets/views/**/*.html'], ['views']);

  // Watch any files in www/, reload on change
  watch("www/**").pipe(connect.reload());
});
