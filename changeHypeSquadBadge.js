async function changeHSbadge(badgeID) {
	// 1: bravery
	// 2: brilliance
	// 3: balance

	if (![1, 2, 3].includes(badgeID))
		throw new RangeError(
			"Invalid badge ID. Badge ID must be either 1, 2, or 3.",
		);

	const wreq = webpackChunkdiscord_app.push([[Symbol()], {}, (r) => r]);
	webpackChunkdiscord_app.pop();

	const chunks = Object.entries(wreq.m),
		findChunkByCode = (...codes) => {
			for (let i = 0; i < chunks.length; i++) {
				const [id, func] = chunks[i];
				const chunkCode = func.toString();
				if (codes.every((code) => chunkCode.includes(code)))
					return wreq(id);
			}
		};

	const api = Object.values(findChunkByCode("HTTPUtils")).find((e) => e?.get);
	return {
		response: await api.post({
			url: "/hypesquad/online",
			body: { house_id: badgeID },
		}),
		badgeID,
	};
}
