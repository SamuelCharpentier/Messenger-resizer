import { mount } from 'svelte';
import './app.css';
import App from './App.svelte';

const TARGET_SELECTOR =
	'[aria-label="Liste des publications"]';
const RESIZER_SELECTOR = '#my-custom-resizer';

let elementObserver: MutationObserver | undefined;

function mountSvelteComponent(): void {
	if (document.querySelector(RESIZER_SELECTOR)) return;

	const target =
		document.querySelector<HTMLElement>(
			TARGET_SELECTOR,
		);
	if (!target) return;

	mount(App, {
		target,
		props: { parentElement: target },
	});
}

function delayedMount(): void {
	setTimeout(mountSvelteComponent, 3000);
}

function findElement(): boolean {
	const element =
		document.querySelector<HTMLElement>(
			TARGET_SELECTOR,
		);

	if (elementObserver) {
		elementObserver.disconnect();
	}

	if (element) {
		elementObserver = new MutationObserver(
			delayedMount,
		);
		elementObserver.observe(element, {
			childList: true,
			subtree: true,
		});
		delayedMount();
		return true;
	}

	return false;
}

(function init() {
	if (!findElement()) {
		const documentObserver = new MutationObserver(
			() => {
				if (findElement()) {
					documentObserver.disconnect();
				}
			},
		);
		documentObserver.observe(document.documentElement, {
			childList: true,
			subtree: true,
		});
	}
})();
