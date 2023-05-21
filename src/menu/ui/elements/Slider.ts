import { Slider, InputSystem, Window, Clamp } from "../../../modules/index.js";
import { AccentColor, ElementBackgroundColor, ElementOutline, FontColor } from "./index.js";

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

		Render.FilledRect(x, y, width, height, ElementBackgroundColor);
		Render.Rect(x, y, width, height, ElementOutline);

		const padding = 4;
		const size = (this.GetValue() - this.GetMinimumValue()) / (this.GetMaximumValue() - this.GetMinimumValue());

		Render.FilledRect(x + padding, y + padding, (width - padding * 2) * size, height - padding * 2, AccentColor);

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

		Render.String(text_x, text_y, 0, this.GetName(), FontColor, options.font);

		return this;
	};

	public readonly HandleClick = (options: { input: InputSystem }) => {
		// #region Переменные
		const { IsInBounds, GetHoldPos, IsDown, GetMouseX } = options.input;
		const { window, GetMinimumValue, GetMaximumValue, SetValue } = this;
		const { x, y, width, height } = window.toJSON();

		const padding = 4;

		const x_offset = x + padding;
		const y_offset = y + padding;
		const width_offset = width - padding * 2;
		const height_offset = height - padding * 2;

		const zone = { x: x_offset, y: y_offset, width: width_offset, height: height_offset };

		const holdPos = GetHoldPos();
		const isInBounds = IsInBounds(zone, holdPos);
		// #endregion

		if (isInBounds && IsDown(0x01)) {
			const percent = (width - padding * 2) / Math.abs(GetMinimumValue() - GetMaximumValue());
			const roundedValue = Math.round((GetMouseX() - (x + padding)) / percent + GetMinimumValue());

			const value = Clamp(roundedValue, GetMinimumValue(), GetMaximumValue());

			SetValue(value);
		}
	};
}
