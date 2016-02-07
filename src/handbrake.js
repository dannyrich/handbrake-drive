'use strict';

const _ = require('lodash');
const handbrake = require('handbrake-js');
const path = require('path');
const fs = require('fs');

const config = require('../config/config.json');

if (!config.HANDBRAKE_OUTPUT_DIR) {
	throw { message: "config.json not setup properly.", name: "config_error" };
}

function getHandbrakeOptions() {
	return _.extend({}, config.HANDBRAKE_OPTIONS || {});
}

function getDriveLocation(driveName) {
	let drive = path.join('Volumes', 'driveName');

	if (isDVD(drive)) {
		return getDVDLoc(drive);
	} else if (isBD(drive)) {
		return getBDLoc(drive);
	}

	return false;
}

function isDVD(loc) {
	try {
		let stat = fs.statSync(getDVDLoc(loc));
		return stat.isFile() || stat.isDirectory();
	} catch (e) {
		return false;
	}
}

function getDVDLoc(loc) {
	return path.join(loc, 'VIDEO_TS');
}

function isBD(loc) {
	try {
		let stat = fs.statSync(getBDLoc(loc));
		return stat.isFile() || stat.isDirectory();
	} catch (e) {
		return false;
	}
}

function getBDLoc(loc) {
	return path.join(loc, 'BDMV');
}

function prepAndRip(driveName, handlers) {
	const loc = getDriveLocation(driveName);

	if (loc) {
		const options = $.extend(getHandbrakeOptions(), {
			input: loc,
			output: path.join(config.HANDBRAKE_OUTPUT_DIR, `${driveName}.m4v`),
		});
		let key;

		handbrake
			.spawn(getHandbrakeOptions());

		for (key in handlers) {
			handbrake.on(key, handers[key]);
		}
	}
}


exports = module.exports = {
	rip: prepAndRip
};