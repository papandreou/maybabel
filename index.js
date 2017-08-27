var semver = require('semver');
var pkgUp = require('pkg-up');
var fs = require('fs');
var pathModule = require('path');

var requiredNodeVersion = fs.readFileSync(pathModule.resolve(pkgUp.sync().replace(/[^/]+$/, ''), '.nvmrc'), 'utf-8').trim();

// Pad the contents of .nvmrc with as many times .0 as necessary to form an x.y.z version number
while ((requiredNodeVersion.match(/\./g) || []).length < 2) {
    requiredNodeVersion += '.0';
}

if (semver.lt(process.version.replace(/^v/, ''), requiredNodeVersion)) {
    require('babel-register');
}
