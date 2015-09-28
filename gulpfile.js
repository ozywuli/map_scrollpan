var gulp = require('gulp');
var del = require('del');
var fileinclude = require('gulp-file-include');
var minifyHTML = require('gulp-minify-html');
var sass = require('gulp-sass');
var neat = require('node-neat').includePaths;
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var cache = require('gulp-cache');
var plumber = require('gulp-plumber');
var cmq = require('gulp-combine-media-queries');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var streamify = require('gulp-streamify');

var hbsfy = require('hbsfy');

// var neatPath = neat.with('node_modules/node-neat/node_modules/bourbon-neat/app/assets/stylesheets')

// HTML
gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(gulp.dest('dev'));

});

gulp.task('html-build', function() {
  var opts = {
    conditionals: true,
    spare: true
  };

    return gulp.src('dev/*.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('dist'));

});


// CSS
gulp.task('css', function() {
  return gulp.src('src/assets/scss/main.scss')
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(sass({
        includePaths: require('node-neat').includePaths,
        outputStyle: 'expanded'
    }))

    .pipe( autoprefixer('last 2 version') )
    .pipe( cmq({
        log: true
    }))
    .pipe(gulp.dest('dev/assets/css'));
});

gulp.task('css-build', function() {
    return gulp.src('dev/assets/css/*')
        .pipe( rename({suffix: '.min'}) )
        .pipe( minifycss() )
        .pipe( gulp.dest('dist/assets/css') )
});



// JS
gulp.task('js', function() {
  browserify({
    entries: ['src/assets/js/main.js'],
    transform: [hbsfy]
  })
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('dev/assets/js'));
});








gulp.task('js-build', function() {
    return gulp.src('dev/assets/js/*')
    .pipe(streamify(uglify('main.min.js')))
    .pipe(gulp.dest('dist/assets/js'));
});


// Data
gulp.task('data', function() {
  return gulp.src('src/assets/data/*')
    .pipe( gulp.dest('dev/assets/data') )
});


gulp.task('img', function() {
  return gulp.src('src/assets/img/**/*')
    .pipe(gulp.dest('dev/assets/img'))
});


// Clean
// gulp.task('clean', function(cb) {
//     del(['dist'], cb)
// });



// Initialize development
gulp.task('default', function() {
    gulp.start('html', 'css', 'js', 'data', 'img');
});

// Watch for changes during development
gulp.task('watch', function() {

    gulp.start('html', 'css', 'js', 'data', 'img');

    gulp.watch(['src/*.html', 'src/partials/*'], ['html']);

    // Watch .scss files
    gulp.watch('src/assets/scss/**/*', ['css']);

    gulp.watch('src/assets/data/*', ['data']);

    gulp.watch('src/assets/img/**/*', ['img']);



  var watcher  = watchify(browserify({
    entries: ['src/assets/js/main.js'],
    transform: [hbsfy],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source('main.js'))
      .pipe(gulp.dest('dev/assets/js'))
      console.log('Updated');
  })
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('dev/assets/js'));

});


// Deploy... great success!
gulp.task('build', function() {
    gulp.start('html-build', 'css-build', 'js-build');
});

