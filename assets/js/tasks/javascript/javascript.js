/**
 * Concats/minifies all JS files as defined in config.json under the 'build' key
 * 
 * @author   Iain van der Wiel <iain@e-sites.nl>
 * @version  0.1.0
 */

var group = require('gulp-group-files'),
	jsPath = conf.path.js,
	taskConf = JSON.parse(fs.readFileSync(__dirname + '/task.json', 'utf8')).conf;

gulp.task('clean:js', function () {
	var del = require('del');

	del([
		jsPath + '/build/*'
	]);
});

gulp.task('jsconcat', ['clean:js'], group(taskConf.jsGroups, function (name, files) {
	var uglify = require('gulp-uglify'),
		concat = require('gulp-concat');

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
	var rev = require('gulp-rev');

	return gulp.src(jsPath + '/build/*.js')
			.pipe(_plumbError('js', 'JS manifest generation failed'))
			.pipe(rev())
			.pipe(gulp.dest(jsPath + '/build'))
			.pipe(rev.manifest())
			.pipe(gulp.dest(jsPath + '/build'))
			.pipe(_notifySuccess('js', 'JS manifest generation succeeded'));
});

_registerTask('default', 'js');
_registerTask('deploy', 'js');
_registerTask('watch', 'js', [conf.path.js + '/**/*.js', '!' + conf.path.js + '/build/**/*', '!' + conf.path.js + '/tasks/**/*.js']);