const defaultTime = Globals.Frametime() * 8;

export class Easings {
	constructor() {}

	public readonly Lerp = <S extends number, E extends number, T extends number>(options: {
		start: S;
		end: E;
		time?: T;
	}): number => {
		const start = options.start;
		const end = options.end;
		const time = options?.time || defaultTime;

		return start + (end - start) * time;
	};

	public readonly LerpRounded = <S extends number, E extends number, T extends number>(options: {
		start: S;
		end: E;
		time?: T;
	}): number => {
		return Math.round(this.Lerp(options));
	};

	public readonly LerpColor = <S extends RGBAColor, E extends RGBAColor, T extends number>(options: {
		start: S;
		end: E;
		time?: T;
	}): RGBAColor => {
		const start_color = options.start;
		const end_color = options.end;
		const time = options?.time || defaultTime;

		return [
			this.Lerp({ start: start_color[0], end: end_color[0], time }),
			this.Lerp({ start: start_color[1], end: end_color[1], time }),
			this.Lerp({ start: start_color[2], end: end_color[2], time }),
			this.Lerp({ start: start_color[3], end: end_color[3], time }),
		];
	};
}
