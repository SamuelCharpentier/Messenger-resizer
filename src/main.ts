import { mount } from 'svelte';
import './app.css';
import App from './App.svelte';

const target: HTMLElement = document.querySelector(
	'div[role="navigation"][aria-label="Liste des publications"]',
)!;

const app = mount(App, {
	target,
	props: {
		parentElement: target,
	},
});

export default app;
