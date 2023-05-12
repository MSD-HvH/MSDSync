/**
 * @class
 */
export class InputSystem {
	/**
	 * Последнее время обновления
	 *
	 * @private
	 * @type {number}
	 */
	private lastTime: number = 0;

	/**
	 * Позиция мышки
	 *
	 * @private
	 * @type {[number, number]}
	 */
	private mousePos: [number, number] = [0, 0];

	/**
	 * Дельта мышки
	 *
	 * @private
	 * @type {[number, number]}
	 */
	private mouseDelta: [number, number] = [0, 0];

	/**
	 * Последние нажатые клавиши
	 *
	 * @private
	 * @type {boolean[]}
	 */
	private lastPressedKeys: boolean[] = [];

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
		const realtime = Globals.Realtime();

		if (realtime === this.lastTime) return this;

		this.lastTime = realtime;

		for (let i = 0; i < 0xff; ++i) {
			this.lastPressedKeys[i] = this.pressedKeys[i] as boolean;
			this.pressedKeys[i] = Input.IsKeyPressed(i);
		}

		const newMousePos = Input.GetCursorPosition();

		this.mouseDelta[0] = newMousePos[0] - this.mousePos[0];
		this.mouseDelta[1] = newMousePos[1] - this.mousePos[1];

		this.mousePos = newMousePos;

		return this;
	};

	public readonly GetMouseX = (): number => {
		return this.mousePos[0];
	};

	public readonly GetMouseY = (): number => {
		return this.mousePos[1];
	};

	public readonly GetMousePos = (): { x: number; y: number } => {
		return {
			x: this.GetMouseX(),
			y: this.GetMouseY(),
		};
	};

	public readonly GetDeltaX = (): number => {
		return this.mouseDelta[0];
	};

	public readonly GetDeltaY = (): number => {
		return this.mouseDelta[1];
	};

	public readonly GetMouseDeltaPos = (): { x: number; y: number } => {
		return {
			x: this.GetDeltaX(),
			y: this.GetDeltaY(),
		};
	};

	public readonly IsInBounds = <W extends WindowOptions>(window: W): boolean => {
		const { x: mouse_x, y: mouse_y } = this.GetMousePos();
		const { x, y, width, height } = window;

		return mouse_x >= x && mouse_y >= y && mouse_x <= x + width && mouse_y <= y + height;
	};

	public readonly IsPressed = <K extends number>(key: K = 0x01 as K): boolean => {
		return !this.lastPressedKeys[key] && (this.pressedKeys[key] as boolean);
	};

	public readonly IsDown = <K extends number>(key: K = 0x01 as K): boolean => {
		return this.pressedKeys[key] as boolean;
	};
}
