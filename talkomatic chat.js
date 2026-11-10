// works for accurate talko (https://talkomatic.serveousercontent.com/) and classic talko (classic.talkomatic.co)
if (typeof chatInput === "undefined") {
	globalThis.chatInput =
		document.body.querySelector(".myslot textarea") ??
		document.body.querySelector(
			`.current-user .chat-input-wrapper .chat-input`,
		);
}

// chat functions
function updateText() {
	const updateEvent = new Event("change");
	chatInput.dispatchEvent(updateEvent);
}
function setText(text = "") {
	chatInput.textContent = chatInput.value = text;
	updateText();
}
function clearText() {
	chatInput.textContent = chatInput.value = "";
	updateText();
}
function appendText(text = "") {
	chatInput.textContent += text;
	chatInput.value += text;
	updateText();
}
// more coming soon prob
