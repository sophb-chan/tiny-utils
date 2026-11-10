function kvReplace(str, kvObj) {
	if (RegExp.escape != null) {
		const replaceRegex = new RegExp(
			`(${RegExp.escape(Object.keys(kvObj).join("|"))})`,
			"g",
		);
		return str.replace(replaceRegex, (v) => kvObj[v]);
	} else {
		let s = str;
		for (const k of Object.keys(kvObj).sort((a, b) => b.length - a.length))
			s = s.replaceAll(k, kvObj[k]);
		return s;
	}
}
