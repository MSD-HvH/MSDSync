const defaultTime = Globals.Frametime() * 8;

export class Easings {
	constructor() {}

	public readonly Lerp = <S extends number, E extends number, T extends number>({
		start,
		end,
		time,
	}: {
		start: S;
		end: E;
		time?: T;
	}): number => {
		return start + (end - start) * (time || defaultTime);
	};

	public readonly LerpRounded = <S extends number, E extends number, T extends number>(options: {
		start: S;
		end: E;
		time?: T;
	}): number => {
		return Math.round(this.Lerp(options));
	};

	public readonly LerpColor = <S extends RGBAColor, E extends RGBAColor, T extends number>({
		start,
		end,
		time,
	}: {
		start: S;
		end: E;
		time?: T;
	}): RGBAColor => {
		return [
			this.Lerp({ start: start[0], end: end[0], time }),
			this.Lerp({ start: start[1], end: end[1], time }),
			this.Lerp({ start: start[2], end: end[2], time }),
			this.Lerp({ start: start[3], end: end[3], time }),
		];
	};
}
