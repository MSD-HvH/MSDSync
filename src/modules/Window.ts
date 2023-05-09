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

export interface WindowStructure {
	/**
	 * Получить позицию окна по координате X
	 *
	 * @returns {number} Текущая позиция по координате X
	 */
	GetX: () => number;

	/**
	 * Установить позицию для окна по координате X
	 *
	 * @param {V} value Значение X
	 * @returns {number} Текущая позиция по координате X
	 */
	SetX: <V extends number>(value: V) => number;

	/**
	 * Получить позицию окна по координате Y
	 *
	 * @returns {number} Текущая позиция по координате Y
	 */
	GetY: () => number;

	/**
	 * Установить позицию для окна по координате Y
	 *
	 * @param {V} value Значение Y
	 * @returns {number} Текущая позиция по координате Y
	 */
	SetY: <V extends number>(value: V) => number;

	/**
	 * Получить текущую ширину окна
	 *
	 * @returns {number} Текущая ширина
	 */
	GetWidth: () => number;

	/**
	 * Установить ширину для окна
	 *
	 * @param {V} value Значение ширины
	 * @returns {number} Текущая ширина окна
	 */
	SetWidth: <V extends number>(value: V) => number;

	/**
	 * Получить текущую высоту окна
	 *
	 * @returns {number} Текущая высота
	 */
	GetHeight: () => number;

	/**
	 * Установить высоту для окна
	 *
	 * @param {V} value Значение высоты
	 * @returns {number} Текущая высота окна
	 */
	SetHeight: <V extends number>(value: V) => number;

	/**
	 * Получить текущую позицию окна по X, Y
	 *
	 * @returns {[number, number]} X, Y
	 */
	GetPosition: () => [number, number];

	/**
	 * Установить позицию для окна
	 *
	 * @returns {[number, number]} X, Y
	 */
	SetPosition: <X extends number, Y extends number>(options: { x: X; y: Y }) => [number, number];

	/**
	 * Получить текущие размеры окна
	 *
	 * @returns {[number, number]} Width, Height
	 */
	GetSize: () => [number, number];

	/**
	 * Установить размеры окна
	 *
	 * @returns {[number, number]} Width, Height
	 */
	SetSize: <W extends number, H extends number>(options: { width: W; height: H }) => [number, number];

	/**
	 * Проверяет то, находится ли одно окно в пределах другого окна
	 *
	 * @param {{x: number, y: number; width: number, height: number}} options
	 * @returns {boolean}
	 */
	IsInBounds: (options: { x: number; y: number; width: number; height: number; sizeIncluded: boolean }) => boolean;
}

/**
 * Класс для создания глобального окна
 *
 * @implements {WindowStructure} Настройки окна
 * @class
 */
export class Window implements WindowStructure, WindowOptions {
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

	public readonly GetX = (): number => {
		return this.x;
	};

	public readonly SetX = <V extends number>(value: V): number => {
		this.x = value;

		return this.x;
	};

	public readonly GetY = (): number => {
		return this.y;
	};

	public readonly SetY = <V extends number>(value: V): number => {
		this.y = value;

		return this.y;
	};

	public readonly GetWidth = (): number => {
		return this.width;
	};

	public readonly SetWidth = <V extends number>(value: V): number => {
		this.width = value;

		return this.width;
	};

	public readonly GetHeight = (): number => {
		return this.height;
	};

	public readonly SetHeight = <V extends number>(value: V): number => {
		this.height = value;

		return this.height;
	};

	public readonly GetPosition = (): [number, number] => {
		return [this.GetX(), this.GetY()];
	};

	public readonly SetPosition = <X extends number, Y extends number>(options: { x: X; y: Y }): [number, number] => {
		const { x, y } = options;

		this.x = x;
		this.y = y;

		return this.GetPosition();
	};

	public readonly GetSize = (): [number, number] => {
		return [this.GetWidth(), this.GetHeight()];
	};

	public readonly SetSize = <W extends number, H extends number>(options: {
		width: W;
		height: H;
	}): [number, number] => {
		const { width, height } = options;

		this.width = width;
		this.height = height;

		return this.GetSize();
	};

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
