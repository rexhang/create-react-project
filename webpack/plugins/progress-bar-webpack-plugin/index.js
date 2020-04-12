const ProgressBar = require('progress');
const chalk = require('chalk');
const webpack = require('webpack');

module.exports = function ProgressBarPlugin(options) {
	options = options || {};
	
	const stream = options.stream || process.stderr;
	const enabled = stream && stream.isTTY;
	
	if (!enabled) {
		return function () {
		};
	}
	
	const barLeft = chalk.bold('[');
	const barRight = chalk.bold(']');
	const preamble = chalk.cyan.bold('  build ') + barLeft;
	const barFormat = options.format || preamble + ':bar' + barRight + chalk.green.bold(' :percent');
	const summary = options.summary !== false;
	const summaryContent = options.summaryContent;
	const customSummary = options.customSummary;
	
	delete options.format;
	delete options.total;
	delete options.summary;
	delete options.summaryContent;
	delete options.customSummary;
	
	const barOptions = Object.assign({
		complete: '=',
		incomplete: ' ',
		width: 20,
		total: 100,
		clear: true
	}, options);
	
	const bar = new ProgressBar(barFormat, barOptions);
	
	let running = false;
	let startTime = 0;
	let lastPercent = 0;
	
	return new webpack.ProgressPlugin(function (percent, msg) {
		if (!running && lastPercent !== 0 && !customSummary) {
			stream.write('\n');
		}
		
		const newPercent = Math.floor(percent * barOptions.width);
		
		if (lastPercent < percent || newPercent === 0) {
			lastPercent = percent;
		}
		
		if (percent > 0.1024) {
			bar.update(percent, {
				msg: msg
			});
		}
		
		if (!running) {
			running = true;
			startTime = new Date;
			lastPercent = 0;
		} else if (percent === 1) {
			const now = new Date;
			const buildTime = (now - startTime) / 1000 + '\u79d2';
			
			bar.terminate();
			
			if (summary) {
				stream.write(chalk.green.bold('>>> \u6784\u5efa\u5b8c\u6210\u5566~ \u5c45\u7136\u53ea\u82b1\u4e86 -> ' + buildTime + '\n'));
			} else if (summaryContent) {
				stream.write(summaryContent + '(' + buildTime + ')\n\n');
			}
			
			if (customSummary) {
				customSummary(buildTime);
			}
			
			running = false;
		}
	});
};
