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
	let drive = path.join(path.sep, 'Volumes', driveName);
	return drive;
}

function prepAndRip(driveName, handlers) {
	const loc = getDriveLocation(driveName);

	console.log(`Got ${loc} for location.`);

	if (loc) {
		const options = _.extend(getHandbrakeOptions(), {
			input: loc,
			output: path.join(config.HANDBRAKE_OUTPUT_DIR, `${driveName}.m4v`),
		});
		
		handbrake
			.spawn(options)
			.on('error', handlers.error || () => null)
			.on('start', handlers.start || () => null)
			.on('output', handlers.output || () => null)
			.on('progress', handlers.progress || () => null)
			.on('end', handlers.end || () => null);
	}
}


exports = module.exports = {
	rip: prepAndRip
};