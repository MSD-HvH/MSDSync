export const Clamp = <V extends number, F extends number, S extends number>(value: V, min: F, max: S) => {
	return Math.min(Math.max(min, value), max);
};

export const HSVtoRGB = (h: number, s: number, v: number) => {
	let r: number, g: number, b: number, i: number, f: number, p: number, q: number, t: number;

	i = Math.floor(h * 6);
	f = h * 6 - i;
	p = v * (1 - s);
	q = v * (1 - f * s);
	t = v * (1 - (1 - f) * s);

	switch (i % 6) {
		case 0:
			(r = v), (g = t), (b = p);
			break;
		case 1:
			(r = q), (g = v), (b = p);
			break;
		case 2:
			(r = p), (g = v), (b = t);
			break;
		case 3:
			(r = p), (g = q), (b = v);
			break;
		case 4:
			(r = t), (g = p), (b = v);
			break;
		case 5:
			(r = v), (g = p), (b = q);
			break;
	}

	// @ts-ignore
	return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
};

export const RGBToHSV = function (color: RGBAColor): [number, number, number] {
	const g = color[1];
	const b = color[2];
	const a = color[3];
	const r = color[0];

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const d = max - min;
	let h;
	const s = max === 0 ? 0 : d / max;
	const v = max / 255;

	switch (max) {
		case min:
			h = 0;
			break;
		case r:
			h = g - b + d * (g < b ? 6 : 0);
			h /= 6 * d;
			break;
		case g:
			h = b - r + d * 2;
			h /= 6 * d;
			break;
		case b:
			h = r - g + d * 4;
			h /= 6 * d;
			break;
	}

	// @ts-ignore
	return [h, s, v];
};
