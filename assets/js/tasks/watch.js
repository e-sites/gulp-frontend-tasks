/**
 * Global watch task
 * 
 * @author   Iain van der Wiel <iain@e-sites.nl>
 * @version  0.1.0
 */

gulp.task('watch', function () {
	gulp.watch(conf.path.css + '/**/*.less', ['less']);
	gulp.watch(conf.path.svg + '/src',  ['svgall'])
	gulp.watch(conf.path.sprite + '/src',  ['spriteall'])
	gulp.watch([conf.path.js + '/**/*.js', '!' + conf.path.js + '/build'],  ['js']);
	gulp.watch(conf.path.js + '/templates/*.hbs',  ['handlebars']);
});