'use strict';

function Progress(string) {
	this.stream = process.stderr;
	this.showTimeout = null;
	this.perc = 0;
	this.string = string;
}

Progress.prototype.tick = (perc, string) => {
	this.perc = perc;
	this.string = string || this.string;

	if (this.perc >= 1) {
		this.completed();
	}

	this.show();
}

Progress.prototype.show = () => {
	let string = this.string + ' ' + Array(Math.round(20 * this.perc)).join('=') + Array(Math.round(20 - (20 * this.perc)));

	if (string !== this.lastString) {
		this.stream.cursorTo(0);
		this.stream.write(string);
		this.stream.clearLine(1);

		this.lastString = string;
	}
}

Progress.prototype.completed = () => {
	this.stream.write('\n');
}

exports = module.exports = Progress;