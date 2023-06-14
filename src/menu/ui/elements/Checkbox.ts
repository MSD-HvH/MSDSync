import { Checkbox, InputSystem, Window } from "../../../modules/index.js";
import { AccentColor, ElementBackgroundColor, ElementOutline, FontColor } from "./index.js";

export class ChimeraCheckbox<N extends string> extends Checkbox<N> {
	private readonly window: Window;

	constructor(options: { name: N } & { window: Window }) {
		super(options);

		this.window = options.window;
		this.SetEnabled(0);
	}

	public readonly GetWindow = (): Window => {
		return this.window;
	};

	public readonly RenderBox = (): ChimeraCheckbox<N> => {
		const { x, y, width, height } = this.window.toJSON();

		Render.FilledRect(x, y, width, height, ElementBackgroundColor);
		Render.Rect(x, y, width, height, ElementOutline);

		if (this.GetValue()) {
			const padding = 4;

			Render.FilledRect(x + padding, y + padding, width - padding * 2, height - padding * 2, AccentColor);
		}

		return this;
	};

	public readonly RenderText = (options: {
		font: number;
		padding_left?: number;
		padding_top?: number;
	}): ChimeraCheckbox<N> => {
		const { x, y, width } = this.window.toJSON();
		const text_x = x + width + (options?.padding_left || 6);
		const text_y = y + (options?.padding_top || 2);

		Render.String(text_x, text_y, 0, this.GetName(), FontColor, options.font);

		return this;
	};

	public readonly HandleClick = (options: { input: InputSystem }) => {
		// #region Переменные
		const { IsInBounds, IsPressed } = options.input;
		const { window, GetValue, SetValue } = this;
		const isInBounds = IsInBounds(window.toJSON());
		const isPressed = IsPressed(0x01);
		// #endregion

		if (isInBounds && isPressed) {
			const value: boolean = !GetValue();

			SetValue(Number(value) as 0 | 1);
		}

		return this;
	};
}
