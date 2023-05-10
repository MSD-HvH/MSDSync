export interface WindowOptions {
	/**
	 * Положение окна относительно координаты x
	 *
	 * @type {number}
	 */
	x: number;

	/**
	 * Положение окна относительно координаты y
	 *
	 * @type {number}
	 */
	y: number;

	/**
	 * Ширина окна
	 *
	 * @type {number}
	 */
	width: number;

	/**
	 * Высота окна
	 *
	 * @type {number}
	 */
	height: number;
}

/**
 * Класс для создания глобального окна
 *
 * @class
 */
export class Window implements WindowOptions {
	public x: number;
	public y: number;
	public width: number;
	public height: number;

	/**
	 * @constructor
	 * @param {WindowOptions} options
	 */
	constructor(options: WindowOptions) {
		const { x, y, width, height } = options;

		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	/**
	 * Получить позицию окна по координате X
	 *
	 * @returns {number} Текущая позиция по координате X
	 */
	public readonly GetX = (): number => {
		return this.x;
	};

	/**
	 * Установить позицию для окна по координате X
	 *
	 * @param {V} value Значение X
	 * @returns {number} Текущая позиция по координате X
	 */
	public readonly SetX = <V extends number>(value: V): number => {
		this.x = value;

		return this.x;
	};

	/**
	 * Получить позицию окна по координате Y
	 *
	 * @returns {number} Текущая позиция по координате Y
	 */
	public readonly GetY = (): number => {
		return this.y;
	};

	/**
	 * Установить позицию для окна по координате Y
	 *
	 * @param {V} value Значение Y
	 * @returns {number} Текущая позиция по координате Y
	 */
	public readonly SetY = <V extends number>(value: V): number => {
		this.y = value;

		return this.y;
	};

	/**
	 * Получить текущую ширину окна
	 *
	 * @returns {number} Текущая ширина
	 */
	public readonly GetWidth = (): number => {
		return this.width;
	};

	/**
	 * Установить ширину для окна
	 *
	 * @param {V} value Значение ширины
	 * @returns {number} Текущая ширина окна
	 */
	public readonly SetWidth = <V extends number>(value: V): number => {
		this.width = value;

		return this.width;
	};

	/**
	 * Получить текущую высоту окна
	 *
	 * @returns {number} Текущая высота
	 */
	public readonly GetHeight = (): number => {
		return this.height;
	};

	/**
	 * Установить высоту для окна
	 *
	 * @param {V} value Значение высоты
	 * @returns {number} Текущая высота окна
	 */
	public readonly SetHeight = <V extends number>(value: V): number => {
		this.height = value;

		return this.height;
	};

	/**
	 * Получить текущую позицию окна по X, Y
	 *
	 * @returns {[number, number]} X, Y
	 */
	public readonly GetPosition = (): [number, number] => {
		return [this.GetX(), this.GetY()];
	};

	/**
	 * Установить позицию для окна
	 *
	 * @returns {[number, number]} X, Y
	 */
	public readonly SetPosition = <X extends number, Y extends number>(options: { x: X; y: Y }): [number, number] => {
		const { x, y } = options;

		this.x = x;
		this.y = y;

		return this.GetPosition();
	};

	/**
	 * Получить текущие размеры окна
	 *
	 * @returns {[number, number]} Width, Height
	 */
	public readonly GetSize = (): [number, number] => {
		return [this.GetWidth(), this.GetHeight()];
	};

	/**
	 * Установить размеры окна
	 *
	 * @returns {[number, number]} Width, Height
	 */
	public readonly SetSize = <W extends number, H extends number>(options: {
		width: W;
		height: H;
	}): [number, number] => {
		const { width, height } = options;

		this.width = width;
		this.height = height;

		return this.GetSize();
	};

	/**
	 * Проверяет то, находится ли одно окно в пределах другого окна
	 *
	 * @param {{x: number, y: number; width: number, height: number}} options
	 * @returns {boolean}
	 */
	public readonly IsInBounds = (options: {
		x: number;
		y: number;
		width: number;
		height: number;
		sizeIncluded?: boolean;
	}): boolean => {
		const { x, y, width, height } = options;
		const sizeIncluded = options?.sizeIncluded || false;

		return sizeIncluded
			? this.x >= x && this.y >= y && this.x + this.width <= x + width && this.y + this.height <= y + height
			: this.x + this.width >= x && this.y + this.height >= y && this.x <= x + width && this.y <= y + height;
	};
}
