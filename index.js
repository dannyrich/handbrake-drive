'use strict';

const drive = require('./src/drive');
const handbrake = require('./src/handbrake');
const Progress = require('./src/progress');

let progress;

drive.watch(handbrake.rip, {
	error: onError,
	start: onStart,
	output: onOutput,
	progress: onProgress,
	complete: onComplete
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
	progress.perc(p.percentComplete, `Encoding @${p.fps} - ETA ${p.eta}`);
}

function onComplete() {
	progress.perc(1, 'Completed');
}