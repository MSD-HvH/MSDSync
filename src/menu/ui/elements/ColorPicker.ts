import { Clamp, ColorPicker, Easings, InputSystem, RGBToHSV, SubTab, Window } from "../../../modules/index.js";
import { ElementBackgroundColor, ElementOutline } from "./index.js";

const LerpColor = function (value: number, min: RGBAColor, max: RGBAColor): RGBAColor {
	const r = min[0] * (1 - value) + max[0] * value;
	const g = min[1] * (1 - value) + max[1] * value;
	const b = min[2] * (1 - value) + max[2] * value;
	const a = min[3] * (1 - value) + max[3] * value;
	return [r, g, b, a];
};

const Gradient = (
	x: number,
	y: number,
	w: number,
	h: number,
	top_left: RGBAColor,
	top_right: RGBAColor,
	bottom_left: RGBAColor,
	bottom_right: RGBAColor
) => {
	if (h < w) {
		for (let i = 0; i < h; i++) {
			Render.GradientRect(
				x,
				y + i,
				w,
				1,
				1,
				LerpColor(i / h, top_left, bottom_left),
				LerpColor(i / h, top_right, bottom_right)
			);
		}
	} else {
		for (let i = 0; i < w; i++) {
			Render.GradientRect(
				x + i,
				y,
				1,
				h,
				0,
				LerpColor(i / w, top_left, top_right),
				LerpColor(i / w, bottom_left, bottom_right)
			);
		}
	}
};

const RGBALine = (alpha: number = 1): RGBAColor[] => {
	return [
		[255, 0, 0, alpha * 255],
		[255, 255, 0, alpha * 255],
		[0, 255, 0, alpha * 255],
		[0, 255, 255, alpha * 255],
		[0, 0, 255, alpha * 255],
		[255, 0, 255, alpha * 255],
		[255, 0, 0, alpha * 255],
	];
};

class ChimeraColorPicker<N extends string, P extends string[]> extends ColorPicker<N, P> {
	private state: boolean = true;
	private readonly window: Window;

	constructor(options: { name: N; path: P } & { window: Window }) {
		super(options);

		this.window = options.window;
		// this.SetEnabled(0);
	}

	public readonly GetWindow = (): Window => {
		return this.window;
	};

	public readonly RenderBox = (): ChimeraColorPicker<N, P> => {
		const { x, y, width, height } = this.window.toJSON();
		const color = this.GetColor();
		const padding = 4;

		Render.FilledRect(x, y, width, height, ElementBackgroundColor);
		Render.Rect(x, y, width, height, [color[0], color[1], color[2], 255]);

		Render.GradientRect(x + padding, y + padding, width - padding * 2, height - padding * 2, 0, color, [
			Clamp(color[0] - 10, 0, 255),
			Clamp(color[1] - 10, 0, 255),
			Clamp(color[2] - 10, 0, 255),
			Clamp(color[3] - 10, 0, 255),
		]);

		return this;
	};

	public readonly GetState = (): boolean => {
		return this.state;
	};

	public readonly SetState = <V extends boolean>(value: V): ChimeraColorPicker<N, P> => {
		this.state = value;

		return this;
	};

	private readonly GetBoxBackgroundSize = (): WindowOptions => {
		const { x, y, height } = this.window.toJSON();

		return {
			x: x,
			y: y + height + 5,
			width: 130,
			height: 130,
		};
	};

	public readonly RenderBoxBackground = () => {
		if (!this.state) return;

		const { x, y, width, height } = this.GetBoxBackgroundSize();

		Render.FilledRect(x, y, width, height, ElementBackgroundColor);
		Render.Rect(x, y, width, height, ElementOutline);
	};

	public readonly RenderRGBABox = () => {
		const { x, y, width, height } = this.GetBoxBackgroundSize();
		const color = this.GetColor();
		const colorHSV = RGBToHSV(color);

		Gradient(
			x + 5,
			y + 5,
			width - 10,
			height - 40,
			[255, 255, 255, 255],
			[color[0], color[1], color[2], 255],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		);

		Render.Rect(x + 5, y + 5, width - 10, height - 50, ElementOutline);

		Render.FilledCircle(
			x + 5 + (width - 10) * colorHSV[1],
			y + 5 + (height - 50) * (1 - colorHSV[2]),
			3,
			[255, 255, 255, 255]
		);

		Render.Circle(x + 5 + (width - 10) * colorHSV[1], y + 5 + (height - 50) * (1 - colorHSV[2]), 3, [0, 0, 0, 255]);
	};

	public readonly RenderOpacityLine = () => {
		const { x, y, width, height } = this.GetBoxBackgroundSize();
		const color = this.GetColor();

		Render.GradientRect(
			x + 5,
			y + height - 40,
			width - 10,
			10,
			1,
			[color[0], color[1], color[2], 0],
			[color[0], color[1], color[2], 255]
		);

		Render.Rect(x + 5, y + height - 40, width - 10, 10, ElementOutline);
	};

	public readonly RenderColorLine = () => {
		const { x, y, width, height } = this.GetBoxBackgroundSize();
		const colors = RGBALine(1);

		colors.forEach((color, i) => {
			if (!colors[i + 1]) return;

			Render.GradientRect(
				x + 5 + i * ((width - 10) / 6),
				y + height - 25,
				(width - 10) / 6,
				10,
				1,
				color,
				colors[i + 1] as RGBAColor
			);
		});

		Render.Rect(x + 5, y + height - 25, width, 10, ElementOutline);
	};
}

const subtab = new SubTab({ name: "Hello", path: "Config" });
const colorpicker = new ChimeraColorPicker({
	name: "Colorpicker",
	path: subtab.GetPath(),
	window: new Window({ x: 100, y: 100, width: 20, height: 20 }),
});

const input = new InputSystem();

const on_Draw = () => {
	input.UpdateInputSystem();

	colorpicker.RenderBox();
	colorpicker.RenderBoxBackground();
	colorpicker.RenderRGBABox();
	colorpicker.RenderOpacityLine();
	colorpicker.RenderColorLine();
};

Cheat.RegisterCallback("Draw", "on_Draw");
