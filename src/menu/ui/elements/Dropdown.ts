import { Dropdown, InputSystem, Window } from "../../../modules/index.js";
import { ElementBackgroundColor, ElementOutline, FontColor } from "./index.js";

export class ChimeraDropdown<N extends string, P extends string[]> extends Dropdown<N, P> {
	private state: boolean = false;
	private readonly window: Window;

	constructor(options: { name: N; path: P; elements: string[] } & { window: Window }) {
		super(options);

		this.window = options.window;
		this.SetEnabled(0);
	}

	public readonly GetWindow = (): Window => {
		return this.window;
	};

	public readonly RenderBox = (): ChimeraDropdown<N, P> => {
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
	}): ChimeraDropdown<N, P> => {
		const { x, y } = this.window.toJSON();
		const text_x = x + (options?.padding_left || 6);
		const text_y = y - (options?.padding_bottom || 16);

		Render.String(text_x, text_y, 0, this.GetName(), FontColor, options.font);
		Render.String(x + 6, y + 2, 0, this.GetElement(this.GetValue()), FontColor, options.font);

		return this;
	};

	public readonly RenderElements = (options: { font: number }): ChimeraDropdown<N, P> => {
		if (!this.state) return this;

		const { x, y, width, height } = this.window.toJSON();
		const elements = this.GetElements();

		elements.forEach((element, i) => {
			const offset = 20 * i;

			if (this.GetValue() === i) Render.FilledRect(x, y + 20 + offset, width, height, [43, 43, 43, 155]);

			Render.String(x + 6, y + 20 + 2 + offset, 0, element, FontColor, options.font);
			Render.FilledRect(x, y + 20 + offset, width, 1, [43, 43, 43, 155]);
		});

		return this;
	};

	public readonly GetState = (): boolean => {
		return this.state;
	};

	public readonly SetState = <V extends boolean>(value: V): ChimeraDropdown<N, P> => {
		this.state = value;

		return this;
	};

	public readonly HandleClick = (options: { input: InputSystem }) => {
		const { IsInBounds, IsPressed } = options.input;
		const { window, state, SetState, GetState, SetValue, GetValue, GetElements } = this;

		const isInBounds = IsInBounds(window.toJSON());
		const isPressed = IsPressed(0x01);

		if (isInBounds && isPressed) SetState(!GetState());

		if (!state) return;

		const elements = GetElements();
		const { x, y, width, height } = window.toJSON();

		elements.forEach((_element, i) => {
			const offset = 20 * i;
			const elementIsInBounds = IsInBounds({ x, y: y + 20 + offset, width, height });

			if (elementIsInBounds && isPressed && GetValue() !== i) {
				SetValue(i);
			}
		});
	};
}
