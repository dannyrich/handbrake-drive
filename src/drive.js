'use strict';

const DriveWatch = require('drive-watch');

let callbacks = [];

function runCallbacks(eventType, driveName) {
	if (eventType !== 'mount') {
		return;
	}

	callbacks.forEach(callback => callback(driveName));
}

const dw = new DriveWatch(runCallbacks, { 
	scanInterval: 60000
});

dw.start();

export default Drive = {
	watch: (callback) => {
		if (typeof callback === 'function') {
			callbacks.push(callback);
		}
	},
	unwatch: (callback) => {
		let index = callbacks.indexOf(callback);

		if (index >= 0) {
			callbacks = callbacks
				.slice(0, index)
				.concat(callbacks.slice(index + 1));
		}
	}
};