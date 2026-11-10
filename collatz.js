function collatz(
	int,
	odd = (x) => 3 * x + 1,
	even = (x) => x / 2,
	loop = [4, 2, 1],
) {
	if (int < 1) return null;

	const compareArrays = (arr1, arr2) =>
		[...arr1.entries()].every(([i, v]) => arr2[i] === v);

	let x = int;
	const lastValues = [],
		path = [];
	do {
		if (x % 2) x = odd(x);
		else x = even(x);

		lastValues.push(x);
		path.push(x);
		if (lastValues.length > loop.length) lastValues.shift();
	} while (
		!(
			lastValues.length === loop.length && compareArrays(lastValues, loop)
		) &&
		x !== 1
	);
	return path;
}
function collatzExplodes(int, odd, even, loop, thresh = (int) => int * 2) {
	const path = collatz(int, odd, even, loop) ?? [];
	return path.some((v) => v >= thresh(int));
}
function getCollatzExplosions(start, end, odd, even, loop, thresh) {
	const trace = [];
	for (let i = start; i <= end; i++) {
		trace.push(collatzExplodes(i, odd, even, loop, thresh));
	}
	return [null, ...trace.filter((v) => v != null)]; // so that explodes[int] gives a straight answer instead of having to do -1
}
