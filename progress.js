function progress(
	percentage,
	{
		scale = 10,
		template = "[{bar}] {percent}%",
		roundingFunc = Math.floor,
		fullchar = "█",
		emptychar = "⠀",
	} = {},
) {
	scale = roundingFunc(scale);
	percentage = Math.max(0, Math.min(1, percentage));
	const bar = fullchar
		.repeat(roundingFunc(percentage * scale))
		.padEnd(scale, emptychar);
	return template
		.replaceAll("{bar}", bar)
		.replaceAll("{percent}", roundingFunc(percentage * 100));
}
