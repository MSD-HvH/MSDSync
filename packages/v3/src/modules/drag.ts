import type { InputSystem, Window } from "./index.js";

export class Drag {
	private is_dragging: boolean = false;
	private drag_position: [number, number] = [0, 0];

	constructor() {}

	public readonly CreateDrag = ({ window, input }: { window: Window; input: InputSystem }) => {
		const { x: window_x, y: window_y } = window.GetPosition();
		const { x: mouse_x, y: mouse_y } = input.GetMousePos();
		const { IsInBounds, IsDown } = input;

		if (IsInBounds(window) && IsDown(0x01) && !this.is_dragging) {
			this.drag_position = [window_x - mouse_x, window_y - mouse_y];
			this.is_dragging = true;
		}

		if (!IsDown(0x01)) this.is_dragging = false;

		if (UI.IsMenuOpen() && this.is_dragging) {
			window.SetX(mouse_x + this.drag_position[0]);
			window.SetY(mouse_y + this.drag_position[1]);
		}
	};
}
