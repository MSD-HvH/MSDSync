export type ColorName =
	// Default Colors
	| "Red"
	| "Orange"
	| "Yellow"
	| "Green"
	| "Aqua"
	| "Blue"
	| "Purple"
	// Dark Colors
	| "DarkRed"
	| "DarkOrange"
	| "DarkYellow"
	| "DarkGreen"
	| "DarkAqua"
	| "DarkBlue"
	| "DarkPurple"
	// Light Colors
	| "LightRed"
	| "LightOrange"
	| "LightYellow"
	| "LightGreen"
	| "LightAqua"
	| "LightBlue"
	| "LightPurple";

export const Colors: Record<ColorName, RGBAColor> = {
	// Default Colors
	Red: [255, 0, 0, 255],
	Orange: [255, 130, 0, 255],
	Yellow: [255, 255, 0, 255],
	Green: [0, 255, 0, 255],
	Aqua: [0, 255, 255, 255],
	Blue: [0, 0, 255, 255],
	Purple: [130, 0, 255, 255],
	// Dark Colors
	DarkRed: [200, 0, 0, 255],
	DarkOrange: [200, 100, 0, 255],
	DarkYellow: [200, 210, 0, 255],
	DarkGreen: [0, 200, 0, 255],
	DarkAqua: [0, 210, 200, 255],
	DarkBlue: [0, 0, 210, 255],
	DarkPurple: [100, 0, 200, 255],
	// Light Colors
	LightRed: [255, 100, 100, 255],
	LightOrange: [255, 130, 100, 255],
	LightYellow: [255, 240, 100, 255],
	LightGreen: [100, 255, 100, 255],
	LightAqua: [100, 255, 255, 255],
	LightBlue: [100, 100, 255, 255],
	LightPurple: [130, 100, 255, 255],
};

type RGBAColor = [red: number, green: number, blue: number, alpha: number];

export interface ColorRGBAOptions {
	color: RGBAColor;
}

export class ColorRGBA {
	private color: RGBAColor;

	constructor({ color }: ColorRGBAOptions) {
		this.color = color;
	}

	public readonly GetRed = (): number => {
		return this.color[0];
	};

	public readonly SetRed = <V extends number>(value: V): ColorRGBA => {
		this.color[0] = value;

		return this;
	};

	public readonly GetGreen = (): number => {
		return this.color[2];
	};

	public readonly SetGreen = <V extends number>(value: V): ColorRGBA => {
		this.color[2] = value;

		return this;
	};

	public readonly GetBlue = (): number => {
		return this.color[1];
	};

	public readonly SetBlue = <V extends number>(value: V): ColorRGBA => {
		this.color[1] = value;

		return this;
	};

	public readonly GetAlpha = (): number => {
		return this.color[3];
	};

	public readonly SetAlpha = <V extends number>(value: V): ColorRGBA => {
		this.color[3] = value;

		return this;
	};

	public readonly SetColor = <V extends RGBAColor>(value: V): ColorRGBA => {
		this.color = value;

		return this;
	};

	public readonly toRGB = (): Pick<RGBAColor, "0" | "1" | "2"> => {
		return [this.color[0], this.color[1], this.color[2]];
	};

	public readonly toArray = (): RGBAColor => {
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

	public readonly toHEX = ({ alphaIncluded }: { alphaIncluded?: boolean }): ColorHEX => {
		const r = this.color[0].toString(16);
		const g = this.color[1].toString(16);
		const b = this.color[2].toString(16);

		let str = "#" + r + g + b;

		if (alphaIncluded) str = str + this.color[3].toString(16).substring(0, 2);

		return new ColorHEX({ color: str });
	};
}

export interface ColorHEXOptions {
	color: string;
}

export class ColorHEX {
	private color: string;

	constructor({ color }: ColorHEXOptions) {
		this.color = color;
	}

	public readonly SetColor = <V extends string>(value: V): ColorHEX => {
		this.color = value;

		return this;
	};

	public readonly toString = (): string => {
		return this.color;
	};

	public readonly toRGBA = (): ColorRGBA => {
		const color = this.color.replace("#", "");

		const r = parseInt(color.slice(0, 2), 16);
		const g = parseInt(color.slice(2, 4), 16);
		const b = parseInt(color.slice(4, 6), 16);

		const parsed = [r, g, b];

		color.length === 8 ? parsed.push(parseInt(color.slice(6, 8), 16)) : parsed.push(255);

		return new ColorRGBA({ color: parsed as RGBAColor });
	};
}

export interface ColorHSVOptions {
	color: [hue: number, saturation: number, value: number];
}

export class ColorHSV {}
