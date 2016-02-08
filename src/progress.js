'use strict';

function Progress(string) {
	this.stream = process.stderr;
	this.showTimeout = null;
	this.perc = 0;
}

Progress.prototype.tick = function (perc, string) {
	console.log('Tick');
	console.log(this);
	this.perc = perc;
	this.string = string || this.string;

	if (this.perc >= 1) {
		this.completed();
	}

	this.show();
}

Progress.prototype.show = function () {
	let string = this.string + ' ' + Array(Math.round(20 * this.perc)).join('=') + Array(Math.round(20 - (20 * this.perc)));

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