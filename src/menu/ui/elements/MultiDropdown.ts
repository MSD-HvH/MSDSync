import { InputSystem, Window, MultiDropdown } from "../../../modules/index.js";
import { ElementBackgroundColor, ElementOutline, FontColor } from "./index.js";

export class ChimeraMultiDropdown<N extends string> extends MultiDropdown<N> {
	private state: boolean = false;
	private readonly window: Window;

	constructor(options: { name: N; elements: string[] } & { window: Window }) {
		super(options);

		this.window = options.window;
		this.SetEnabled(0);
	}

	public readonly GetWindow = (): Window => {
		return this.window;
	};

	public readonly RenderBox = (): ChimeraMultiDropdown<N> => {
		const { x, y, width, height } = this.window.toJSON();
		const height_offset = this.state ? this.GetElements().length * height + height : height;

		Render.FilledRect(x, y, width, height_offset, ElementBackgroundColor);
		Render.Rect(x, y, width, height_offset, ElementOutline);

		return this;
	};

	public readonly RenderText = (options: {
		font: number;
		padding_left?: number;
		padding_bottom?: number;
	}): ChimeraMultiDropdown<N> => {
		const { x, y, width } = this.window.toJSON();
		const text_x = x + (options?.padding_left || 6);
		const text_y = y - (options?.padding_bottom || 16);

		const elements = this.GetActiveElements();
		const text = elements.length <= 0 ? "None" : elements.join(", ");
		const elementsTextSize = Render.TextSize(text, options.font);
		const elementsText =
			elementsTextSize[0] > width - (options?.padding_left || 6) ? text.slice(0, 20) + "..." : text;

		Render.String(text_x, text_y, 0, this.GetName(), FontColor, options.font);
		Render.String(x + 6, y + 2, 0, elementsText, FontColor, options.font);

		return this;
	};

	public readonly RenderElements = (options: { font: number }): ChimeraMultiDropdown<N> => {
		if (!this.state) return this;

		const { x, y, width, height } = this.window.toJSON();
		const elements = this.GetElements();

		elements.forEach((element, i) => {
			const offset = 20 * i;

			if (this.GetValue() & (1 << i)) Render.FilledRect(x, y + 20 + offset, width, height, [43, 43, 43, 155]);

			Render.String(x + 6, y + 20 + 2 + offset, 0, element, FontColor, options.font);
			Render.FilledRect(x, y + 20 + offset, width, 1, [43, 43, 43, 155]);
		});

		return this;
	};

	public readonly GetState = (): boolean => {
		return this.state;
	};

	public readonly SetState = <V extends boolean>(value: V): ChimeraMultiDropdown<N> => {
		this.state = value;

		return this;
	};

	public readonly HandleClick = (options: { input: InputSystem }): void => {
		// #region Открытие/закрытие dropdown
		const { window, state, SetState, GetState, SetValue, GetValue, GetElements } = this;
		const { IsInBounds, IsPressed } = options.input;

		const isInBounds = IsInBounds(window.toJSON());
		const isPressed = IsPressed(0x01);

		if (isInBounds && isPressed) SetState(!GetState());
		// #endregion

		// #region Выбор элемента
		if (!state) return;

		const elements = GetElements();
		const { x, y, width, height } = window.toJSON();

		elements.forEach((_element, i) => {
			const offset = 20 * i;
			const elementIsInBounds = IsInBounds({ x, y: y + 20 + offset, width, height });

			if (elementIsInBounds && isPressed) {
				// Очко болит
				SetValue(GetValue() ^ (1 << i));
			}
		});
		// #endregion
	};
}
