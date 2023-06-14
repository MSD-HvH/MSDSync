declare interface WindowOptions {
	x: number;

	y: number;

	width: number;

	height: number;
}

declare type CallbackFunction<E> = (element: E, ...args: any[]) => void;
