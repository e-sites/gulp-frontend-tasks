/**
 * Concats all external Handlebars templates in one templates.js file
 * 
 * @author   Iain van der Wiel <iain@e-sites.nl>
 * @version  0.1.0
 */

gulp.task('handlebars', function () {
	var wrap = require('gulp-wrap'),
		declare = require('gulp-declare'),
		concat = require('gulp-concat'),
		group = require('gulp-group-files'),
		handlebars = require('gulp-handlebars');
		
	return gulp.src(conf.path.js + '/templates/*.hbs')
			.pipe(handleError('handlebars', 'Handlebars precompiling failed'))
			.pipe(handlebars())
			.pipe(wrap('Handlebars.template(<%= contents %>)'))
			.pipe(declare({
				namespace: 'app.templates',
				noRedeclare: true, // Avoid duplicate declarations
			}))
			.pipe(concat('templates.js'))
			.pipe(gulp.dest(conf.path.js + '/templates'))
			.pipe(handleSuccess('handlebars', 'Handlebars precompiling succeeded'));
});

tasker.addTask('default', 'handlebars');
tasker.addTask('deploy', 'handlebars');
tasker.addTask('watch', 'handlebars', conf.path.js + '/templates/*.hbs');
