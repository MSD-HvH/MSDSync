import { Slider, InputSystem, Window, Clamp } from "../../../modules/index.js";

export class ChimeraSlider<N extends string, P extends string[]> extends Slider<N, P> {
	private readonly window: Window;

	constructor(options: { name: N; path: P; min: number; max: number } & { window: Window }) {
		super({ ...options, type: "Int" });

		this.window = options.window;
		this.SetEnabled(0);
	}

	public readonly GetWindow = (): Window => {
		return this.window;
	};

	public readonly RenderBox = (): ChimeraSlider<N, P> => {
		const { x, y, width, height } = this.window.toJSON();

		Render.FilledRect(x, y, width, height, [26, 26, 26, 255]);
		Render.Rect(x, y, width, height, [57, 58, 58, 178]);

		const padding = 4;
		const size = (this.GetValue() - this.GetMinimumValue()) / (this.GetMaximumValue() - this.GetMinimumValue());

		Render.FilledRect(
			x + padding,
			y + padding,
			(width - padding * 2) * size,
			height - padding * 2,
			[110, 124, 172, 255]
		);

		return this;
	};

	public readonly RenderText = (options: {
		font: number;
		padding_left?: number;
		padding_bottom?: number;
	}): ChimeraSlider<N, P> => {
		const { x, y } = this.window.toJSON();
		const text_x = x + (options?.padding_left || 6);
		const text_y = y - (options?.padding_bottom || 16);

		Render.String(text_x, text_y, 0, this.GetName(), [243, 244, 255, 255], options.font);

		return this;
	};

	public readonly HandleClick = (options: { input: InputSystem }) => {
		if (options.input.IsInBounds(this.window.toJSON()) && options.input.IsDown(0x01)) {
			const { x, y, width, height } = this.window.toJSON();

			const padding = 4;
			const percent = (width - padding * 2) / Math.abs(this.GetMinimumValue() - this.GetMaximumValue());

			if (
				options.input.IsInBounds({
					x: x + padding,
					y: y + padding,
					width: width - padding * 2,
					height: height - padding * 2,
				})
			) {
				const value = Clamp(
					Math.round((options.input.GetMouseX() - (x + padding)) / percent + this.GetMinimumValue()),
					this.GetMinimumValue(),
					this.GetMaximumValue()
				);

				this.SetValue(value);
			}
		}
	};
}
