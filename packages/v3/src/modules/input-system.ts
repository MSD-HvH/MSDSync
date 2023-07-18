import type { WindowOptions } from "./window.js";

export class InputSystem {
	/**
	 * Последние нажатые клавиши
	 *
	 * @private
	 * @type {boolean[]}
	 */
	private lastPressedKeys: boolean[] = [];

	/**
	 * Позиция мышки
	 *
	 * @type {[number, number]}
	 */
	private mousePos: [number, number] = [0, 0];

	/**
	 * Позиция мышки до момента, когда была нажата клавиша
	 *
	 * @type {[number, number]}
	 */
	private mouseCachePos: [number, number] = [0, 0];

	/**
	 * Нажатые клавиши
	 *
	 * @private
	 * @type {boolean[]}
	 */
	private pressedKeys: boolean[] = [];

	/**
	 * @constructor
	 */
	constructor() {}

	public readonly UpdateInputSystem = (): InputSystem => {
		for (let i = 0; i < 0xff; ++i) {
			this.lastPressedKeys[i] = this.pressedKeys[i] as boolean;
			this.pressedKeys[i] = Input.IsKeyPressed(i);
		}

		return this;
	};

	public readonly GetMouseX = (): number => {
		return Input.GetCursorPosition()[0];
	};

	public readonly GetMouseY = (): number => {
		return Input.GetCursorPosition()[1];
	};

	public readonly GetMousePos = (): { x: number; y: number } => {
		return {
			x: this.GetMouseX(),
			y: this.GetMouseY(),
		};
	};

	public readonly GetHoldPos = <K extends number>(key: K = 0x01 as K): { x: number; y: number } => {
		if (!this.IsDown(key)) this.mousePos = this.mouseCachePos;

		this.mouseCachePos = Input.GetCursorPosition();

		return {
			x: this.mousePos[0],
			y: this.mousePos[1],
		};
	};

	public readonly IsInBounds = <W extends WindowOptions>(window: W, mouse?: { x: number; y: number }): boolean => {
		const { x: mouse_x, y: mouse_y } = mouse || this.GetMousePos();
		const { x, y, width, height } = window;

		return mouse_x >= x && mouse_y >= y && mouse_x <= x + width && mouse_y <= y + height;
	};

	public readonly IsPressed = <K extends number>(key: K = 0x01 as K): boolean => {
		return !this.lastPressedKeys[key] && (this.pressedKeys[key] as boolean);
	};

	public readonly IsReleased = <K extends number>(key: K = 0x01 as K): boolean => {
		return this.lastPressedKeys[key] && (!this.pressedKeys[key] as boolean);
	};

	public readonly IsDown = <K extends number>(key: K = 0x01 as K): boolean => {
		return this.pressedKeys[key] as boolean;
	};
}
