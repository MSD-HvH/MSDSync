/**
 * Возвращает число, значение которого ограничено заданным диапазоном.
 *
 * ---
 * @example
 * ```ts
 * Clamp(70, 50, 100) // 70;
 * Clamp(200, 50, 100) // 100;
 * Clamp(0, 50, 100) // 50
 * ```
 * ---
 *
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const Clamp = <V extends number, F extends number, S extends number>(value: V, min: F, max: S): number => {
	return Math.min(Math.max(min, value), max);
};

export const Lerp = (a: number, b: number, time: number) => {
	return a * (1 - time) + b * time;
};
