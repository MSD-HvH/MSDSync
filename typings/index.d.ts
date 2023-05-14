import { Checkbox, ColorPicker, Dropdown } from "src/modules/onetap-ui/index.js";

declare interface WindowOptions {
	/**
	 * Расположение по оси X
	 *
	 * @type {number}
	 */
	x: number;

	/**
	 * Расположение по оси Y
	 *
	 * @type {number}
	 */
	y: number;

	/**
	 * Ширина
	 *
	 * @type {number}
	 */
	width: number;

	/**
	 * Высота
	 *
	 * @type {number}
	 */
	height: number;
}

declare type CallbackFunction<E> = (element: E, ...args: any[]) => void;