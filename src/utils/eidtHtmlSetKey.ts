const eidtHtmlSetKey = (parent = document) => {
	const spans = parent.querySelectorAll('.js-key');

	for (let i = 0; i < spans.length; i++) {
		const span = spans[i];
		const text = span.textContent as string;
		const characters = text.split('');
		const wrappedCharacters = characters.map((char, index, arr) => {
			if (index === 0) {
				return `<i class="first">${char}</i>`;
			}
			else if (index === arr.length - 1) {
				return `<i class="last">${char}</i>`;
			}
			else {
				return `<i>${char}</i>`;
			}
		});
		const wrappedText = wrappedCharacters.join('');
		span.outerHTML = wrappedText;
	}
}

export default eidtHtmlSetKey;