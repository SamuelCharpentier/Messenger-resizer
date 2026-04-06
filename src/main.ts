import { mount } from 'svelte';
import App from './App.svelte';

const TARGET_SELECTOR = '[aria-label="Liste des publications"]';
const RESIZER_SELECTOR = '#my-custom-resizer';
const MESSENGER_FAVICON =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAATlBMVEVHcEwIZv8IZv8IZv8IZv8IZv8IZv8IZv8IZv8IZv8IZv8IZv8IZv////8AY/8AWf8AXf/k7/+Otv/O4f+wzP8yfv9tn/9MjP/3/P8Wcv/DC2VYAAAADHRSTlMARA+P4B/IXPIwrXSHPN2wAAACQElEQVRYhd1X2ZKEIAwc75PD8Rr//0cXRSASUJh92KrtJ6Xo0AmEhNfrfyMtGoHiK25RtXmvUJdZEsfODFmjrULpSYnZUkgWQm989APPJto7+q7iPhhN/cB/EFE90wVKL78L4gs30t/xfRbC9EvkrvhF8MWpwgYC4g/R2fyn/UewUizOgR3WZt6eXzcuRzKJ5193IlwA5fqzMfzCOdU1xtZFj4OtzBxT6cyRCU4nQiatwRjA9w+lAxk3dh1k64cQMupRHcYUC2BiKULeDIig/Bgjxged2HgP6HrMJcOsl+PzcAxNRlbuDwGXk3cRMhKUveX/BwbXe4ylA6eIVfjBZmVx4WBe4YkhnQnEpJeHEdyReAwYB04R5n+7bK2qFFYmm/UQ3vwyU+X0rQMQo3UwOqcCNnoNzDTAAHDgYztgCdAxgEGkm6YvVjAGm693ASazdmAUics26I7tgElocBL5cs5ejjSgbNH8CQnoVXkwFYH20u9xU/vFlYiBI77OBXOfnA7ALBQiDqMrvmDMjaKiKJMQpKAUcVwj2IHetCwqCMcZulwCp4h1wQ6YEICqQJdpdSzV49utv1YGfRI4Wt4PWBhiKrNC/YKILK07rl1fvAS7RYgujna35rjab4F7tTgnXD2Oo7754eyyIpqUxsWPsODhh1qo/S+QoE6p9PSpO5yNhgXU38UZKO8fUE+nqfRGL8RAnQU839TkNoGPtv3Z1j0tLlHLpc44F0nVdV2VNDdxtyASIg9+3TmRfvdM/VP8AF1ifbvZpqC2AAAAAElFTkSuQmCC';

function setFavicon(): void {
	const existingIcons = document.querySelectorAll<HTMLLinkElement>(
		'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]',
	);
	existingIcons.forEach((icon) => {
		if (icon.href !== MESSENGER_FAVICON) {
			icon.remove();
		}
	});

	if (!document.querySelector(`link[href="${MESSENGER_FAVICON}"]`)) {
		const link = document.createElement('link');
		link.rel = 'icon';
		link.href = MESSENGER_FAVICON;
		document.head.appendChild(link);
	}
}

function mountIfNeeded(): void {
	const target = document.querySelector<HTMLElement>(TARGET_SELECTOR);
	if (!target) return;
	if (target.querySelector(RESIZER_SELECTOR)) return;

	mount(App, {
		target,
		props: { parentElement: target },
	});
}

function mountAndStyle(): void {
	setFavicon();
	mountIfNeeded();
}

mountAndStyle();

new MutationObserver(mountAndStyle).observe(document.documentElement, {
	childList: true,
	subtree: true,
});
