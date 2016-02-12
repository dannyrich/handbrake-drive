'use strict';

function Progress() {
    this.stream = process.stderr;
    this.showTimeout = null;
    this.perc = 0;
}

Progress.prototype.tick = function tick(perc, string) {

    this.perc = perc;
    this.string = string || this.string;

    this.show();
};

Progress.prototype.show = function show() {

    const numTot = 20;
    const numFilled = Math.min(20, Math.round(numTot * this.perc));
    const numEmpty = numTot - numFilled;

    const bar = '◼'.repeat(numFilled) + '◻︎'.repeat(numEmpty);

    const string = `|${bar}| ${this.string}`;

    if (string !== this.lastString) {
        this.stream.cursorTo(0);
        this.stream.write(string);
        this.stream.clearLine(1);

        this.lastString = string;
    }
};

Progress.prototype.completed = function completed() {
    this.stream.write('\n');
};

exports = module.exports = new Progress();
