/**
 * Compiles the main styles.less file and creates a source-map
 * 
 * @author   Iain van der Wiel <iain@e-sites.nl>
 * @version  0.1.0
 */

gulp.task('less', function () {
	var less = require('gulp-less');
	
	return gulp.src(conf.path.css + '/styles.less')
			.pipe(handleError('less', 'LESS compiling failed'))
			.pipe(sourcemaps.init())
			.pipe(less())
			.on('error', function(err){ console.log(err.message); this.emit('end');})
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(conf.path.css))
			.pipe(handleSuccess('less', 'LESS compiling succeeded'));
});

tasker.addTask('default', 'less');
tasker.addTask('deploy', 'less');
tasker.addTask('watch', 'less', conf.path.css + '/styles.less');