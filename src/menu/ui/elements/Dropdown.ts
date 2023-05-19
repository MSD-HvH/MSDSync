import { Dropdown, InputSystem, SubTab, Window } from "../../../modules/index.js";

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

	public readonly RenderBox = () => {
		const { x, y, width, height } = this.window.toJSON();
		const height_offset = this.state ? this.GetElements().length * height + height : height;

		Render.FilledRect(x, y, width, height_offset, [26, 26, 26, 255]);
		Render.Rect(x, y, width, height_offset, [57, 58, 58, 178]);

		return this;
	};

	public readonly RenderText = (options: { font: number; padding_left?: number; padding_bottom?: number }) => {
		const { x, y } = this.window.toJSON();
		const text_x = x + (options?.padding_left || 6);
		const text_y = y - (options?.padding_bottom || 16);

		Render.String(text_x, text_y, 0, this.GetName(), [243, 244, 255, 255], options.font);
		Render.String(x + 6, y + 2, 0, this.GetElement(this.GetValue()), [243, 244, 255, 255], options.font);

		return this;
	};

	public readonly RenderElements = (options: { font: number }) => {
		if (!this.state) return;

		const { x, y, width, height } = this.window.toJSON();
		const elements = this.GetElements();

		elements.forEach((element, i) => {
			const offset = 20 * i;

			if (this.GetValue() === i) Render.FilledRect(x, y + 20 + offset, width, height, [43, 43, 43, 155]);

			Render.String(x + 6, y + 20 + 2 + offset, 0, element, [243, 244, 255, 255], options.font);
			Render.FilledRect(x, y + 20 + offset, width, 1, [43, 43, 43, 155]);
		});

		return this;
	};

	public readonly GetState = () => {
		return this.state;
	};

	public readonly SetState = <V extends boolean>(value: V) => {
		this.state = value;

		return this;
	};

	public readonly HandleClick = (options: { input: InputSystem }) => {
		if (options.input.IsInBounds(this.window.toJSON()) && options.input.IsPressed(0x01)) {
			this.SetState(!this.GetState());
		}

		if (!this.state) return;

		const elements = this.GetElements();
		const { x, y, width, height } = this.window.toJSON();

		elements.forEach((_element, i) => {
			const offset = 20 * i;

			if (
				options.input.IsInBounds({ x, y: y + 20 + offset, width, height }) &&
				options.input.IsPressed(0x01) &&
				this.GetValue() !== i
			) {
				this.SetValue(i);
			}
		});
	};
}
