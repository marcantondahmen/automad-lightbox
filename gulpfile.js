var gulp = require('gulp'),
	cleanCSS = require('gulp-clean-css'),
	concat = require('gulp-concat'),
	less = require('gulp-less'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	gutil = require('gulp-util');
	
// Error handling to prevent watch task to fail silently without restarting.
var onError = function(err) {
		gutil.log(gutil.colors.red('ERROR', err.plugin), err.message);
		gutil.beep();
		new gutil.PluginError(err.plugin, err, {showStack: true})
		this.emit('end');
};

// Concat minify and prefix all required js files.
gulp.task('js', function () {

	var uglifyOptions = {
			compress: {
				hoist_funs: false,
				hoist_vars: false
			},
			output: {
				comments: /(license|copyright)/i,
				max_line_len: 500
			}
		};
		
	return 	gulp.src('js/lightbox.js')
			.pipe(uglify(uglifyOptions))
			.pipe(concat('lightbox.min.js'))
			.pipe(gulp.dest('dist'));

});

// Compile, minify and prefix alpha.less.
gulp.task('less', function () {

	var cleanCSSOptions = {
			format: { wrapAt: 500 },
			rebase: false
		};

	return gulp.src('less/lightbox.less')
		.pipe(less())
		.on('error', onError)
		.pipe(cleanCSS(cleanCSSOptions))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('dist'));

});

gulp.task('watch', function () {
	gulp.watch('less/lightbox.less', gulp.series('less'));
	gulp.watch('js/lightbox.js', gulp.series('js'));
});

gulp.task('default', gulp.series('less', 'js'));