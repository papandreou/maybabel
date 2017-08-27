var semver = require('semver');
var fs = require('fs');
var pathModule = require('path');

// Un-es6ified version of https://github.com/sindresorhus/locate-path/blob/master/index.js#L14
function locatePathSync(iterable, opts) {
    var cwd = opts && opts.cwd;
    if (typeof cwd === 'undefined') {
        cwd = process.cwd();
    }
    for (var i = 0 ; i < iterable.length ; i += 1) {
        el = iterable[i];
		if (fs.existsSync(pathModule.resolve(cwd, el))) {
			return el;
		}
	}
};

// Un-es6ified version of https://github.com/sindresorhus/find-up/blob/master/index.js#L28
function pkgUpSync(filename, opts) {
    opts = opts || {};

    var dir = pathModule.resolve(opts.cwd || '');
    var root = pathModule.parse(dir).root;

    var filenames = [].concat(filename);

    // eslint-disable-next-line no-constant-condition
    while (true) {
        var file = locatePathSync(filenames, {cwd: dir});

        if (file) {
            return pathModule.join(dir, file);
        } else if (dir === root) {
            return null;
        }

        dir = pathModule.dirname(dir);
    }
};


var requiredNodeVersion = fs.readFileSync(pathModule.resolve(pkgUp.sync().replace(/[^/]+$/, ''), '.nvmrc'), 'utf-8').trim();

// Pad the contents of .nvmrc with as many times .0 as necessary to form an x.y.z version number
while ((requiredNodeVersion.match(/\./g) || []).length < 2) {
    requiredNodeVersion += '.0';
}

if (semver.lt(process.version.replace(/^v/, ''), requiredNodeVersion)) {
    require('babel-register');
}
