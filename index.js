'use strict';

const drive = require('./src/drive');
const handbrake = require('./src/handbrake');
const progress = require('./src/progress');

drive.watch((dr) => {
    handbrake.rip(dr, {
        error: onError,
        start: onStart,
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
}

function onProgress(p) {
    progress.tick(p.percentComplete / 100, `Encoding - ETA ${p.eta}`);
}

function onEnd() {
    progress.tick(1, 'Completed');
}
