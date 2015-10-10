var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var jasmine = require('gulp-jasmine');

var rjs = require('gulp-requirejs');

gulp.task('hint', function() {
	return gulp.src('src/js/*.js')
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter('default'));
});

gulp.task('js', function() {
	return gulp.src('src/js/*.js')
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dest/js/'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify({
			compress: true
		}))
		.pipe(gulp.dest('dest/js/'))
});


//test

gulp.task('test', function() {
	return gulp.src('spec/test/*.js')
		.pipe(jasmine({
			// reporter: new reporters.JUnitXmlReporter()
		}));

})


gulp.task('css', function() {
	return gulp.src('src/css/main.scss')
		.pipe(sass('src/css/main.css', {
			style: 'expanded'
		}))
		.pipe(autoprefixer('last 2 version'))
		.pipe(gulp.dest('dest/css/'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(minifycss())
		.pipe(gulp.dest('dest/css/'))
});

gulp.task('rjs', function() {
	rjs({
			name: 'user/app',
			baseUrl: 'public/js/',
			out: 'user.js',
			shim: {
				'common': ['jquery', 'bootstrap'],
				'validator': ['jquery', 'common'],
				'moment': {
					exports: 'moment'
				},
				'validator': {
					exports: 'validator'
				},
				'bootstrap': ['jquery'],
				'extension': {
					exports: 'extension',
					deps: ['jquery']
				},
				'pager': {
					exports: 'pager'
				},
				'jquery.fileupload': ['jquery', 'jquery.ui.widget']
			}
		})
		.pipe(gulp.dest('dest/js/'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify({
			compress: true
		}))
		.pipe(gulp.dest('dest/js/'));
});

gulp.task("default", ['rjs'], function() {
	console.log('finished default task');
})

gulp.task('watch', function() {
	gulp.watch('src/js/*.js', ['hint', 'js'])
});