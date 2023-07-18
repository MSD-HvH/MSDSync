export interface WindowOptions {
	x: number;
	y: number;
	width: number;
	height: number;
}

export class Window {
	public x: number;
	public y: number;
	public width: number;
	public height: number;

	constructor(options?: Partial<WindowOptions>) {
		this.x = options?.x || 10;
		this.y = options?.y || 10;
		this.width = options?.width || 20;
		this.height = options?.height || 20;
	}

	public readonly GetX = (): number => {
		return this.x;
	};

	public readonly SetX = <V extends number>(value: V): Window => {
		this.x = value;

		return this;
	};

	public readonly GetY = (): number => {
		return this.y;
	};

	public readonly SetY = <V extends number>(value: V): Window => {
		this.y = value;

		return this;
	};

	public readonly GetWidth = (): number => {
		return this.width;
	};

	public readonly SetWidth = <V extends number>(value: V): Window => {
		this.width = value;

		return this;
	};

	public readonly GetHeight = (): number => {
		return this.height;
	};

	public readonly SetHeight = <V extends number>(value: V): Window => {
		this.height = value;

		return this;
	};

	public readonly GetPosition = (): { x: number; y: number } => {
		return {
			x: this.x,
			y: this.y,
		};
	};

	public readonly SetPosition = <X extends number, Y extends number>({ x, y }: { x: X; y: Y }): Window => {
		this.x = x;
		this.y = y;

		return this;
	};

	public readonly GetSize = (): { width: number; height: number } => {
		return {
			width: this.width,
			height: this.height,
		};
	};

	public readonly SetSize = <W extends number, H extends number>({
		width,
		height,
	}: {
		width: W;
		height: H;
	}): Window => {
		this.width = width;
		this.height = height;

		return this;
	};

	public readonly GetWindow = (): Window => {
		return this;
	};

	public readonly SetWindow = <W extends WindowOptions>({ x, y, width, height }: W): Window => {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		return this;
	};

	public readonly toJSON = (): WindowOptions => {
		return {
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
		};
	};

	public readonly IsInBouds = ({
		x,
		y,
		width,
		height,
		size_included,
	}: (WindowOptions | Window) & { size_included?: boolean }): boolean => {
		return size_included || false
			? this.x >= x && this.y >= y && this.x + this.width <= x + width && this.y + this.height <= y + height
			: this.x + this.width >= x && this.y + this.height >= y && this.x <= x + width && this.y <= y + height;
	};
}
