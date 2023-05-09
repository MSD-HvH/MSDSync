export interface ColorRGBAOptions {
	/**
	 * Цвет в формате RGBA
	 *
	 * @type {[number, number, number, number]}
	 */
	color: [number, number, number, number];
}

export interface ColorRGBAStructure {
	/**
	 * Возвращает красный оттенок цвета
	 *
	 * @returns {number} Красный
	 */
	GetRed: () => number;

	/**
	 * Установить красный оттенок цвета
	 *
	 * @param {number} value
	 * @returns {ColorRGBA}
	 */
	SetRed: <V extends number>(value: V) => ColorRGBA;

	/**
	 * Возвращает зеленый оттенок цвета
	 *
	 * @returns {number} зеленый
	 */
	GetGreen: () => number;

	/**
	 * Установить зеленый оттенок цвета
	 *
	 * @param {number} value
	 * @returns {ColorRGBA}
	 */
	SetGreen: <V extends number>(value: V) => ColorRGBA;

	/**
	 * Возвращает синий оттенок цвета
	 *
	 * @returns {number} Синий
	 */
	GetBlue: () => number;

	/**
	 * Установить синий оттенок цвета
	 *
	 * @param {number} value
	 * @returns {ColorRGBA}
	 */
	SetBlue: <V extends number>(value: V) => ColorRGBA;

	/**
	 * Возвращает прозрачность цвета
	 *
	 * @returns {number} Прозрачность
	 */
	GetAlpha: () => number;

	/**
	 * Установить прозрачность цвета
	 *
	 * @param {number} value
	 * @returns {ColorRGBA}
	 */
	SetAlpha: <V extends number>(value: V) => ColorRGBA;

	/**
	 * Установить новый цвет
	 *
	 * @param {[number, number, number, number]} value
	 * @returns {ColorRGBA}
	 */
	SetColor: <V extends [number, number, number, number]>(value: V) => ColorRGBA;

	/**
	 * Преобразует цвет в массив
	 *
	 * @returns {[number, number, number, number]}
	 */
	toArray: () => [number, number, number, number];

	/**
	 * Преобразует цвет в объект
	 *
	 * @returns {{ r: number; g: number; b: number; a: number }}
	 */
	toJSON: () => { r: number; g: number; b: number; a: number };

	/**
	 * Возвращает цвет в формате HEX
	 *
	 * @param {{ alphaIncluded?: boolean }} options
	 * @returns {ColorHEX}
	 */
	toHEX: (options?: { alphaIncluded?: boolean }) => ColorHEX;
}

export class ColorRGBA implements ColorRGBAOptions, ColorRGBAStructure {
	public color: [number, number, number, number];

	/**
	 * @constructor
	 * @param {ColorRGBAOptions} options
	 */
	constructor(options: ColorRGBAOptions) {
		this.color = options.color;
	}

	public readonly GetRed = (): number => {
		return this.color[0];
	};

	public readonly SetRed = <V extends number>(value: V): ColorRGBA => {
		this.color[0] = value;

		return this;
	};

	public readonly GetBlue = (): number => {
		return this.color[1];
	};

	public readonly SetBlue = <V extends number>(value: V): ColorRGBA => {
		this.color[1] = value;

		return this;
	};

	public readonly GetGreen = (): number => {
		return this.color[2];
	};

	public readonly SetGreen = <V extends number>(value: V): ColorRGBA => {
		this.color[2] = value;

		return this;
	};

	public readonly GetAlpha = (): number => {
		return this.color[3];
	};

	public readonly SetAlpha = <V extends number>(value: V): ColorRGBA => {
		this.color[3] = value;

		return this;
	};

	public readonly SetColor = <V extends [number, number, number, number]>(value: V): ColorRGBA => {
		this.color = value;

		return this;
	};

	public readonly toArray = (): [number, number, number, number] => {
		return this.color;
	};

	public readonly toJSON = (): { r: number; g: number; b: number; a: number } => {
		return {
			r: this.color[0],
			g: this.color[1],
			b: this.color[2],
			a: this.color[3],
		};
	};

	public readonly toHEX = (options?: { alphaIncluded?: boolean }): ColorHEX => {
		const r = this.color[0].toString(16);
		const g = this.color[1].toString(16);
		const b = this.color[2].toString(16);

		let str = "#" + r + g + b;

		if (options?.alphaIncluded) str = str + this.color[3].toString(16).substring(0, 2);

		return new ColorHEX({ color: str });
	};
}

export interface ColorHEXOptions {
	/**
	 * Цвет в формате HEX
	 *
	 * @type {string}
	 */
	color: string;
}

export interface ColorHEXStructure {
	/**
	 * Установить новый цвет
	 *
	 * @param {string} value
	 * @returns {ColorHEX}
	 */
	SetColor: <V extends string>(value: V) => ColorHEX;

	/**
	 * Возвращает цвет в формате RGBA
	 *
	 * @returns {ColorRGBA}
	 */
	toRGBA: () => ColorRGBA;
}

export class ColorHEX implements ColorHEXOptions, ColorHEXStructure {
	public color: string;

	/**
	 * @constructor
	 * @param {ColorHEXOptions} options
	 */
	constructor(options: ColorHEXOptions) {
		this.color = options.color;
	}

	SetColor = <V extends string>(value: V): ColorHEX => {
		this.color = value;

		return this;
	};

	toRGBA = (): ColorRGBA => {
		const color = this.color.replace("#", "");

		const r = parseInt(color.slice(0, 2), 16);
		const g = parseInt(color.slice(2, 4), 16);
		const b = parseInt(color.slice(4, 6), 16);

		const parsed = [r, g, b];

		color.length === 8 ? parsed.push(parseInt(color.slice(6, 8), 16)) : parsed.push(255);

		return new ColorRGBA({ color: parsed as [number, number, number, number] });
	};
}
