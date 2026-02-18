import { DragToBlank } from 'drag-to-blank';

type MyDragToBlankOptions = {
	elementToResize: HTMLElement;
	storageKey: string;
};

export class DragToResize extends DragToBlank {
	//...custom class properties
	protected static override defaultClassName =
		'DragToResize';
	private options?: MyDragToBlankOptions;
	private widthAtDragStart: number | null = null;
	private mouseXAtDragStart: number | null = null;

	//... custom constructor
	constructor(
		element: HTMLElement,
		options?: MyDragToBlankOptions,
	) {
		super(element);
		this.options = options;
		this.restoreWidth();
	}

	private get storageKey(): string {
		return `DragToResize:${this.options?.storageKey}`;
	}

	private restoreWidth(): void {
		if (!this.options) return;
		const saved = localStorage.getItem(this.storageKey);
		if (saved !== null) {
			this.options.elementToResize.style.width = `${saved}px`;
		}
	}

	private saveWidth(): void {
		if (!this.options) return;
		const width =
			this.options.elementToResize.offsetWidth;
		localStorage.setItem(
			this.storageKey,
			String(width),
		);
	}

	private handleEventPropagationAndPrevention(
		event: MouseEvent,
	): void {
		event.stopPropagation();
		event.preventDefault();
	}

	protected dragStart(event: MouseEvent): void {
		this.handleEventPropagationAndPrevention(event);
		if (!this.options) {
			throw new Error('Options are not set');
		}
		const { elementToResize } = this.options;
		this.widthAtDragStart = elementToResize.offsetWidth;
		this.mouseXAtDragStart = event.clientX;
		document.body.classList.add('dragging');
	}

	protected dragMove(event: MouseEvent): void {
		this.handleEventPropagationAndPrevention(event);

		const dragMoveData = this.mouseData.get('dragMove');
		const prevDragMoveData = dragMoveData?.prev;
		if (!dragMoveData || !prevDragMoveData) {
			throw new Error('Drag move data is incomplete');
		}

		this.performResize(dragMoveData.position.x);
	}

	protected dragEnd(event: MouseEvent): void {
		this.handleEventPropagationAndPrevention(event);
		this.saveWidth();
		this.widthAtDragStart = null;
		this.mouseXAtDragStart = null;
		document.body.classList.remove('dragging');
	}

	private performResize(mouseX: number): void {
		requestAnimationFrame(() => {
			if (!this.options) {
				throw new Error('Options are not set');
			}

			const { elementToResize } = this.options;
			if (this.widthAtDragStart === null) {
				throw new Error(
					'Width at drag start is not set',
				);
			}
			if (this.mouseXAtDragStart === null) {
				throw new Error(
					'Mouse X at drag start is not set',
				);
			}

			const deltaX = mouseX - this.mouseXAtDragStart;
			elementToResize.style.width = `${this.widthAtDragStart + deltaX}px`;
		});
	}
}
