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

	if (this.perc >= 100) {
		this.completed();
	}

	this.showTimeout = setTimeout(this.show.bind(this), 200);
}

Progress.prototype.show = () => {
	this.clear();

	let string = this.string + ' ' + Array(Math.round(20 * this.perc)).join('=') + Array(Math.round(20 - (20 * this.perc)));

	if (string !== this.lastString) {
		this.stream.cursorTo(0);
		this.stream.write(string);
		this.stream.clearLine(1);

		this.lastString = string;
	}
}

Progress.prototype.clear = () => {
	clearTimeout(this.showTimeout);
	this.showTimeout = null;
}

Progress.prototype.completed = () => {
	this.stream.write('\n');
}

export default Progress;