function stringify(value, tabs, tabChar = " ") {
	if (!Number.isInteger(tabs) && tabs != null)
		throw new TypeError(
			"The number of tabs must be an integer or nullish.",
		);
	if (typeof tabChar !== "string")
		throw new TypeError("The tab character must be a string.");

	const finalTabChar = tabChar.repeat(tabs) ?? "",
		newlineChar = tabs == null ? "" : "\n";

	switch (typeof value) {
		case "string":
			return `"${value.replaceAll('"', '\\"')}"`;

		case "number":
			return `${value}`;

		case "boolean":
			return value ? "true" : "false";

		case "undefined":
			return "undefined";

		case "object":
			if (value === null) return "null";
			else if (Array.isArray(value)) {
				return `[${newlineChar}${value.map((v) => finalTabChar + stringify(v, tabs, tabChar)).join(", ")}${newlineChar}]`;
			} else {
				if (Object.keys(value).length === 0) return "{}";
				let string = "{" + newlineChar;
				for (const [i, [k, v]] of Object.entries(value).entries()) {
					if (i > 0) string += "," + newlineChar;
					const stringifiedValue = stringify(v, tabs, tabChar)
						.split("\n")
						.map((line, index) => {
							if (index === 0) return line;
							return finalTabChar + line;
						})
						.join("\n");
					string += `${finalTabChar}${k}: ${stringifiedValue}`;
				}
				string += newlineChar + "}";
				return string;
			}

		case "function":
			const descriptor = Object.getOwnPropertyDescriptor(
				value,
				"prototype",
			);
			const nativeStringified = value.toString();
			const bodyContent = Boolean(descriptor)
				? nativeStringified.slice(
					nativeStringified.indexOf("{") + 1,
					nativeStringified.lastIndexOf("}"),
				)
				: nativeStringified.split('=>')[1].trim();
			if (!descriptor) {
				// arrow function
				const args = nativeStringified.split('=>')[0].trim();
				return `${args} => ${bodyContent}`;
			} else if (descriptor.writable) {
				// function
				const header = nativeStringified.slice(
					0,
					nativeStringified.indexOf("{"),
				);
				const args = header.slice(
					header.indexOf("(") + Number(value.name === ''),
					header.lastIndexOf(")"),
				);
				return `function ${value.name}(${args}) {${bodyContent}}`;
			} else {
				// class
				const constructorRegex =
					/constructor\s*\(([\S\s]*?)\)\s*{([\S\s]*?)}/m;
				const constructorMatch =
					constructorRegex.exec(nativeStringified);
				const args = constructorMatch?.[1] ?? "";
				const parent = Object.getPrototypeOf(value);
				const extending = parent !== Function.prototype && parent != null ? parent.name : null;
				const header = [value.name ? value.name : null, extending ? `extends ${extending}` : ''].filter(Boolean).join(' ');
				return `class ${header ? header + ' ' : ''}{${bodyContent}}`;
			}

		case "bigint":
			return value.toString() + "n";

		case "symbol":
			return value.toString();

		default:
			throw new Error(`Unknown type "${typeof value}"`);
	}
}
