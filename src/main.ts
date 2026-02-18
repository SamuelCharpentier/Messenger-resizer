import { mount } from 'svelte';
import './app.css';
import App from './App.svelte';

const TARGET_SELECTOR =
	'[aria-label="Liste des publications"]';
const RESIZER_SELECTOR = '#my-custom-resizer';

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
}

mountIfNeeded();

new MutationObserver(mountIfNeeded).observe(
	document.documentElement,
	{ childList: true, subtree: true },
);
