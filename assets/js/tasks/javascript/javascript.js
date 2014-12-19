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
			.pipe(handleError('jsconcat', 'JS concatenation failed'))
			.pipe(sourcemaps.init())
			.pipe(concat(name + '.js'))
			.pipe(uglify())
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(jsPath + '/build'))
			.pipe(handleSuccess('jsconcat', 'JS concatenation succeeded'));
}));

gulp.task('js', ['jsconcat'], function () {
	var rev = require('gulp-rev');

	return gulp.src(jsPath + '/build/*.js')
			.pipe(handleError('js', 'JS manifest generation failed'))
			.pipe(rev())
			.pipe(gulp.dest(jsPath + '/build'))
			.pipe(rev.manifest())
			.pipe(gulp.dest(jsPath + '/build'))
			.pipe(handleSuccess('js', 'JS manifest generation succeeded'));
});

tasker.addTask('default', 'js');
tasker.addTask('deploy', 'js');
tasker.addTask('watch', 'js', [conf.path.js + '/**/*.js', '!' + conf.path.js + '/build/**/*', '!' + conf.path.js + '/tasks/**/*.js']);