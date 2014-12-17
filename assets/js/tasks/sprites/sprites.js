/**
 * Generates sprites with Glue
 * 
 * @author   Iain van der Wiel <iain@e-sites.nl>
 * @version  0.1.0
 */

gulp.task('clean:sprite', function () {
	var del = require('del');

	del([
		conf.path.sprite + '*.png',
		'!' + conf.path.sprite + 'src'
	]);
});

gulp.task('glue', ['clean:sprite'], function () {
	var glue = require('gulp-sprite-glue');

	return gulp.src(conf.path.sprite + 'src')
			.pipe(_plumbError('glue', 'Glue sprite generation failed'))
			.pipe(glue({
				cachebuster: true,
				img: conf.path.sprite,
				margin: 5,
				namespace: 'spr',
				url: conf.path.sprite,
				less: conf.path.css + '/sprites/',
				lessTemplate: conf.path.sprite + '/src/template.jinja',
				ratios: '2,1',
				project: true
			}))
			.pipe(_notifySuccess('glue', 'Glue sprite generation succeeded'));
});

_registerTask('default', 'glue');
_registerTask('deploy', 'glue');
_registerTask('watch', 'glue', conf.path.sprite + '/src');