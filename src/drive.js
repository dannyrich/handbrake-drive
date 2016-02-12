'use strict';

const DriveWatch = require('drive-watch');

let callbacks = [];

function runCallbacks(eventType, driveName) {
    console.log(`${eventType} on ${driveName}`);

    if (eventType !== 'mount') {
        return;
    }

    setTimeout(() => callbacks.forEach(callback => callback(driveName)), 10000);
}

const dw = new DriveWatch(runCallbacks, {
    scanInterval: 60000
});

dw.start();

exports = module.exports = {
    watch: (callback) => {
        if (typeof callback === 'function') {
            callbacks.push(callback);
        }
    },
    unwatch: (callback) => {
        const index = callbacks.indexOf(callback);

        if (index >= 0) {
            callbacks = callbacks
                .slice(0, index)
                .concat(callbacks.slice(index + 1));
        }
    }
};
