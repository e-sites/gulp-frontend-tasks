/**
 * Concats all external Handlebars templates in one templates.js file
 * 
 * @author   Iain van der Wiel <iain@e-sites.nl>
 * @version  0.1.0
 */

var wrap = require('gulp-wrap'),
	declare = require('gulp-declare'),
	concat = require('gulp-concat'),
	group = require('gulp-group-files'),
	handlebars = require('gulp-handlebars');

gulp.task('handlebars', function () {
	return gulp.src(conf.path.js + '/templates/*.hbs')
			.pipe(_plumbError('handlebars', 'Handlebars precompiling failed'))
			.pipe(handlebars())
			.pipe(wrap('Handlebars.template(<%= contents %>)'))
			.pipe(declare({
				namespace: 'app.templates',
				noRedeclare: true, // Avoid duplicate declarations
			}))
			.pipe(concat('templates.js'))
			.pipe(gulp.dest(conf.path.js + '/templates'))
			.pipe(_notifySuccess('handlebars', 'Handlebars precompiling succeeded'));
});