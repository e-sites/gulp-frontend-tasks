/**
 * Concats/minifies all JS files as defined in config.json under the 'build' key
 * 
 * @author   Iain van der Wiel <iain@e-sites.nl>
 * @version  0.1.0
 */

var uglify = require('gulp-uglify'),
	group = require('gulp-group-files'),
	concat = require('gulp-concat'),
	del = require('del'),
	rev = require('gulp-rev'),
	jsPath = conf.path.js;

gulp.task('clean:js', function () {
	del([
		jsPath + '/build/*'
	]);
});

gulp.task('jsconcat', ['clean:js'], group(conf.jsGroups, function (name, files) {
	return gulp.src(files)
			.pipe(_plumbError('jsconcat', 'JS concatenation failed'))
			.pipe(sourcemaps.init())
			.pipe(concat(name + '.js'))
			.pipe(uglify())
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(jsPath + '/build'))
			.pipe(_notifySuccess('jsconcat', 'JS concatenation succeeded'));
}));

gulp.task('js', ['jsconcat'], function () {
	return gulp.src(jsPath + '/build/*.js')
			.pipe(_plumbError('js', 'JS manifest generation failed'))
			.pipe(rev())
			.pipe(gulp.dest(jsPath + '/build'))
			.pipe(rev.manifest())
			.pipe(gulp.dest(jsPath + '/build'))
			.pipe(_notifySuccess('js', 'JS manifest generation succeeded'));
});