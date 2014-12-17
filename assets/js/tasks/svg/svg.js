/**
 * Does SVG stuff :)
 * 
 * @author   Iain van der Wiel <iain@e-sites.nl>
 * @version  0.1.0
 */

gulp.task('clean:svg', function () {
	var del = require('del');

	del([
		conf.path.svg + '/dist/'
	]);
});

gulp.task('svgconcat', ['clean:svg'], function () {
	var svgstore = require('gulp-svgstore');

	return gulp.src(conf.path.svg + '/src/*.svg')
			.pipe(_plumbError('svgconcat', 'SVG concatenation failed'))
			.pipe(svgstore({fileName: 'dist.svg'}))
			.pipe(gulp.dest(conf.path.svg + '/dist/'))
			.pipe(_notifySuccess('svgconcat', 'SVG concatenation succeeded'));
});

gulp.task('svg2png', ['clean:svg'], function () {
	var rename = require('gulp-rename'),
		svg2png = require('gulp-svg2png');

	return gulp.src(conf.path.svg + '/src/*.svg')
			.pipe(_plumbError('svg2png', 'SVG to PNG conversion failed'))
			.pipe(svg2png())
			.on('error', function(err){ console.log(err.message); this.emit('end');})
			.pipe(rename(function (path) {
				path.basename = 'dist.svg.' + path.basename;
			}))
			.on('error', function(err){ console.log(err.message); this.emit('end');})
			.pipe(gulp.dest(conf.path.svg + '/dist/'))
			.pipe(_notifySuccess('svg2png', 'SVG to PNG conversion succeeded'));
});

gulp.task('svg', ['clean:svg', 'svgconcat', 'svg2png']);

_registerTask('default', 'svg');
_registerTask('deploy', 'svg');
_registerTask('watch', 'svg', conf.path.svg + '/src');