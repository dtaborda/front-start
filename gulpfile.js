var gulp = require('gulp'),
	jsonConfig = require('./package.json'),
	Multistream = require('multistream'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	compass = require('gulp-compass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifyCss = require('gulp-minify-css'),
	watch = require('gulp-watch'),
	browserSync = require('browser-sync'),
	htmlMin = require('gulp-htmlmin'),
	del = require('del'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    rev = require('gulp-rev'), // add revision hash to file names
    revReplace = require('gulp-rev-replace'),
    useref = require('gulp-useref'),
	paths = {
		src:'src/',
		dest:'dest/',
		noVendor:'!src/{vendor,vendor/**}',
		bootstrap: 'src/vendor/bootstrap-sass/'
	};

// js: jshint + concat + uglify (banner) =>  sourcemaps
// css: sass + minify
// dev: browser livereload
// html min
// clean
// img optim

// assets tasks
// source maps

gulp.task('scripts', function(filesPath){
	return gulp.src([paths.src +  '**/*.js', paths.noVendor])
	  //  .pipe(jshint('.jshintrc'))
	  //  .pipe(jshint.reporter('jshint-stylish'))
	    .pipe(concat('main.js'))
	    .pipe(rev())
	    .pipe(gulp.dest(paths.dest + 'scripts'))
	    .pipe(rename({suffix: '.min'}))
	    .pipe(uglify({ preserveComments: 'some'}))
	    .pipe(gulp.dest(paths.dest + 'scripts'));
});

gulp.task('styles', function(){
	return gulp.src([paths.src + 'styles/**/main.scss', paths.src + 'app/components/**/*.scss'])
		//concat main file with directive css
		.pipe(concat('build.scss'))
		// write the new scss file on src/styles
		.pipe(gulp.dest(paths.src + 'styles'))
		// apply sass transformations
		.pipe(compass({
			css: paths.dest + 'styles',
			sass: paths.src + 'styles',
			image: paths.src + 'images'
		}))
		// rename the result as main.css
		.pipe(rename('main.css'))
		// apply autoprefixer transformations
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	    .pipe(gulp.dest(paths.src + 'styles'))
		.pipe(rev())
	    .pipe(gulp.dest(paths.dest + 'styles'))
	    .pipe(rename({ suffix: '.min' }))
		.pipe(minifyCss())
	    .pipe(gulp.dest(paths.dest + 'styles'));
});

gulp.task('bootstrap-theme', function(){

	return 	gulp.src([paths.bootstrap + 'lib/theme.scss'])
		.pipe(compass({
			css: paths.bootstrap + 'dist/css',
			sass: paths.bootstrap + 'lib',
			image: paths.bootstrap
		}))
		.pipe(rename('bootstrap-theme.css'))
	    .pipe(gulp.dest(paths.bootstrap + 'dist/css'))
	    .pipe(rename({ suffix: '.min' }))
		.pipe(minifyCss())
	    .pipe(gulp.dest(paths.bootstrap + 'dist/css'));
});

gulp.task('bootstrap', function(){

	return 	gulp.src([paths.bootstrap + 'lib/bootstrap.scss'])
		.pipe(compass({
			css: paths.bootstrap + 'dist/css',
			sass: paths.bootstrap + 'lib',
			image: paths.bootstrap
		}))
	    .pipe(gulp.dest(paths.bootstrap + 'dist/css'))
	    .pipe(rename({ suffix: '.min' }))
		.pipe(minifyCss())
	    .pipe(gulp.dest(paths.bootstrap + 'dist/css'));
});

gulp.task('html', function(){
	return gulp.src([paths.src + '**/*.html', paths.noVendor])
	.pipe(htmlMin({collapseWhitespace: true}))
	.pipe(gulp.dest(paths.dest));
});

gulp.task('images', function(){
	return gulp.src(paths.src + 'images/**/*')
	    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
	    .pipe(gulp.dest(paths.dest + 'images'));
});

gulp.task('replace',function(){
	var assets = useref.assets();
	gulp.src(paths.src + 'index.html')
	  	.pipe(assets)
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(revReplace())
        .pipe(gulp.dest('dist'));
})

// dev tasks
gulp.task('jshint', function(){
	return gulp.src([paths.src +  '**/*.js', paths.noVendor])
	    .pipe(jshint('.jshintrc'))
	    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('browser-sync-build', function() {
    browserSync({
        server: {
            baseDir: paths.dest
        }
    });
});

gulp.task('browser-sync-dev', function() {
    browserSync({
        server: {
            baseDir: paths.src
        }
    });
});

gulp.task('reload', function(){
	browserSync.reload();
});

gulp.task('clean', function(){
	del(paths.dest);
	del(paths.src + 'styles/build.scss');
	del(paths.src + 'styles/main.css');

});

gulp.task('copy-vendor',function(){
	return gulp.src(paths.src + 'vendor/**/*')
			.pipe(gulp.dest(paths.dest + 'vendor/'));
});

gulp.task('copy-imgs',function(){
	return gulp.src(paths.src + 'images/**/*')
			.pipe(gulp.dest(paths.dest + 'images/'));
});

gulp.task('watch', function(){
	// Watch .scss and js files
	gulp.watch([paths.src + 'styles/**/*.scss', paths.src + 'app/**/*.scss'], ['styles']);
	gulp.watch(paths.src + 'app/**/*.js', ['scripts']);
	gulp.watch(paths.src + 'images/**/*', ['images']);
	gulp.watch(paths.src + '**/*.html', ['html']);


	// Watching changed files
	gulp.watch([paths.dest + 'styles/**/*.min.css',
			paths.dest + 'scripts/**/*.js',
			paths.dest + '**/*.html',
			paths.dest + 'images/**/*'], ['reload']);
});

// console tasks
gulp.task('default', function(){
	gulp.start('dev');
});

gulp.task('build',['clean'], function(){
	gulp.start('scripts', 'styles', 'html', 'copy-imgs','copy-vendor')
});

gulp.task('dev-build',['scripts', 'styles', 'html', 'copy-imgs','copy-vendor'],function(){
	gulp.start('watch','browser-sync-build');
});

gulp.task('dev',function(){
	gulp.start('browser-sync-dev');

	gulp.watch([paths.src + 'styles/**/*.scss', paths.src + 'app/**/*.scss'], ['styles']);
	gulp.watch(paths.src + 'app/**/*.js', ['jshint','reload']);

	gulp.watch([paths.dest + 'styles/**/*.css',
		paths.src + '**/*.html',
		paths.src + 'images/**/*'], ['reload']);
});