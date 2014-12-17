/**
 * Compiles the main styles.less file and creates a source-map
 * 
 * @author   Iain van der Wiel <iain@e-sites.nl>
 * @version  0.1.0
 */

gulp.task('less', function () {
	var less = require('gulp-less');
	
	return gulp.src(conf.path.css + '/styles.less')
			.pipe(_plumbError('less', 'LESS compiling failed'))
			.pipe(sourcemaps.init())
			.pipe(less())
			.on('error', function(err){ console.log(err.message); this.emit('end');})
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(conf.path.css))
			.pipe(_notifySuccess('less', 'LESS compiling succeeded'));
});

_registerTask('default', 'less');
_registerTask('deploy', 'less');
_registerTask('watch', 'less', conf.path.css + '/styles.less');