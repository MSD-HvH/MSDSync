export const Clamp = <V extends number, F extends number, S extends number>(value: V, min: F, max: S) => {
	return Math.min(Math.max(min, value), max);
};
