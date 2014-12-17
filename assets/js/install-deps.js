(function () {
	'use strict';

	var fs = require('fs'),
		exec = require('child_process').exec,
		walk = require('walk'),
		walker = walk.walk('./assets/js/tasks/'),
		allDeps = {};

	// Read all dependencies
	walker.on('file', function (root, fileStats, next) {
		if ( fileStats.name.indexOf('.json') !== -1 ) {
			fs.readFile(root + '/' + fileStats.name, {encoding: 'utf-8'}, function (err, data) {
				var deps = JSON.parse(data).dependencies;

				for (var dep in deps) {
					allDeps[dep] = deps[dep];
				}
			});
		}

		next();
	});

	walker.on('end', function() {
		_installNextDep();
	});

	function _installNextDep() {
		var dep = Object.keys(allDeps)[0],
			ver = allDeps[dep];

		if ( !dep ) {
			return;
		}

		_execInstaller(dep, ver);

		delete allDeps[dep];
	}

	function _execInstaller(dep, ver) {
		var installer = exec('npm install ' + dep + '@' + ver);

		console.log('installing: ' + dep);

		installer.stderr.on('data', function (data) {
			console.log('error:' + data);
		});

		installer.on('close', _installNextDep);
	}
}())