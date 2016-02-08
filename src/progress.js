'use strict';

function Progress(string) {
	this.stream = process.stderr;
	this.showTimeout = null;
	this.perc = 0;
}

Progress.prototype.tick = function (perc, string) {

	console.log(perc);

	this.perc = perc;
	this.string = string || this.string;

	if (this.perc >= 1) {
		this.completed();
	}

	this.show();
}

Progress.prototype.show = function () {
	const numTot = 20;
	const numFilled = Math.round(numTot * this.perc);

	const bar = Array(numFilled).join('=') + Array(numTot - numFilled).join(' ');

	let string = `|${bar}| ${this.string}`;

	if (string !== this.lastString) {
		this.stream.cursorTo(0);
		this.stream.write(string);
		this.stream.clearLine(1);

		this.lastString = string;
	}
}

Progress.prototype.completed = function () {
	this.stream.write('\n');
}

exports = module.exports = new Progress();