function advForInterval({
	interval = 0,
	init = () => {},
	condition = () => false,
	operation = () => {},
	callback = () => {},
	endFunc = () => {},
} = {}) {
	if (interval === 0) {
		for (let i = init(); condition(i); i = operation(i)) {
			callback(i);
		}
		endFunc();
	} else {
		let i = init();
		const int = setInterval(() => {
			if (!condition(i)) {
				clearInterval(int);
				endFunc();
				return;
			}
			callback(i);
			i = operation(i);
		}, interval);
	}
}
function forInterval(callback, iterations = 0, interval = 0, endFunc) {
	return advForInterval({
		interval,
		init: () => 1,
		condition: (i) => i <= iterations,
		operation: (i) => i + 1,
		callback,
		endFunc,
	});
}
