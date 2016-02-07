'use strict';

const drive = require('./src/drive');
const handbrake = require('./src/handbrake');
const Progress = require('./src/progress');

let progress;

drive.watch((drive) => {
	handbrake.rip(drive, {
		error: onError,
		start: onStart,
		output: onOutput,
		progress: onProgress,
		end: onEnd
	});
});

function onError(error) {
	console.log('ERROR!');
	console.log(error);
}

function onStart() {
	console.log('Handbrake CLI is ready.');
	progress = new Progress('Ripping Disc');
}

function onOutput(output) {

}

function onProgress(p) {
	progress.tick(p.percentComplete, `Encoding @${p.fps} - ETA ${p.eta}`);
}

function onEnd() {
	progress.tick(1, 'Completed');
}