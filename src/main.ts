import { mount } from 'svelte';
import './app.css';
import App from './App.svelte';

const TARGET_SELECTOR =
	'[aria-label="Liste des publications"]';
const RESIZER_SELECTOR = '#my-custom-resizer';
const MESSENGER_FAVICON =
	'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://messenger.com&size=64';

function setFavicon(): void {
	let link = document.querySelector<HTMLLinkElement>(
		'link[rel="icon"]',
	);
	if (!link) {
		link = document.createElement('link');
		link.rel = 'icon';
		document.head.appendChild(link);
	}
	if (link.href !== MESSENGER_FAVICON) {
		link.href = MESSENGER_FAVICON;
	}
}

function mountIfNeeded(): void {
	const target =
		document.querySelector<HTMLElement>(
			TARGET_SELECTOR,
		);
	if (!target) return;
	if (target.querySelector(RESIZER_SELECTOR)) return;

	mount(App, {
		target,
		props: { parentElement: target },
	});
	setFavicon();
}

mountIfNeeded();

new MutationObserver(mountIfNeeded).observe(
	document.documentElement,
	{ childList: true, subtree: true },
);
