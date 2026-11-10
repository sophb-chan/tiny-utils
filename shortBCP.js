function shortenBCP(bcpCode) {
	const convRegex =
		/^[\t ]*([a-z]+)(?:(?:-[^-\n\r\f]+)*(?:-([A-Z]{2}|\d+))(?:-[^-\n\r\f]+)*)?[\t ]*$/;
	const match = convRegex.exec(bcpCode);
	if (match != null) {
		match[1] = match[1].toLowerCase();
		if (match[2]) match[2] = match[2].toUpperCase();
		return match.slice(1).join("");
	} else return null;
}
function getBCPType(bcpCode) {
	const shortBCPRegex = /^[\t ]*[a-z]+(?:[A-Z]{2}|\d+)?[\t ]*$/,
		BCP47Regex =
			/^[\t ]*[a-z]+(?:-[^-\n\r\f]+)*(?:-(?:[A-Z]{2}|\d+))?(?:-[^-\n\r\f]+)*[\t ]*$/,
		looseBCP47Regex =
			/^[\t ]*[a-z]+(?:-[^-\n\r\f]+)*(?:-(?:[A-Za-z]{2}|\d+))?(?:-[^-\n\r\f]+)*[\t ]*$/;

	if (shortBCPRegex.test(bcpCode)) return "shortbcp";
	else if (BCP47Regex.test(bcpCode)) return "bcp47";
	else if (looseBCP47Regex.test(bcpCode)) return "loosebcp47";
	else return "unknown";
}
