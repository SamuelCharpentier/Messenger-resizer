<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { DragToResize } from './drag_handler';

	export let parentElement: HTMLElement;

	let resizer: HTMLDivElement | null = null;
	let dragToResize: DragToResize | null = null;

	onMount(() => {
		console.log(parentElement);
		if (!resizer) return;
		dragToResize = new DragToResize(resizer, {
			elementToResize: parentElement as HTMLElement,
			storageKey:
				'div[role="navigation"][aria-label="Liste des publications"]',
		});
	});
	onDestroy(() => {
		if (dragToResize) {
			dragToResize.destroy();
		}
	});
</script>

<div id="my-custom-resizer" bind:this={resizer}></div>

<style>
	:global(body.dragging *) {
		user-select: none;
		cursor: ew-resize;
	}
	:global(div[aria-label='Liste des publications']) {
		position: relative;
		min-width: 200px;
	}
	#my-custom-resizer {
		--spacing: 1.5px;
		--resizer-width: var(
			--messenger-card-spacing,
			16px
		);
		position: absolute;
		top: 5%;
		right: calc(-1 * var(--resizer-width));
		width: var(--resizer-width);
		height: 90%;
		background: transparent;
		border-radius: var(--resizer-width);
		cursor: ew-resize;
	}
	#my-custom-resizer:hover::before,
	:global(body.dragging) #my-custom-resizer::before {
		background: rgba(255, 255, 255, 0.15);
	}
	#my-custom-resizer::before {
		content: '';
		position: absolute;
		inset: calc(var(--spacing) * 2);
		border-radius: 100vw;
	}
	#my-custom-resizer::after {
		content: '';
		position: absolute;
		inset-block: calc(var(--resizer-width) / 2);
		left: 50%;
		transform: translateX(-50%);
		width: 2px;
		border-radius: 2px;
		background: rgba(255, 255, 255, 0.3);
	}
	#my-custom-resizer:hover::after,
	:global(body.dragging) #my-custom-resizer::after {
		background: rgba(255, 255, 255, 0.8);
	}
</style>
