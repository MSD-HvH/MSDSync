import { Checkbox, InputSystem, SubTab, Window } from "../../../modules/index.js";

export class ChimeraCheckbox<N extends string, P extends string[]> extends Checkbox<N, P> {
	private timeout: number = 0;
	private readonly window: Window;

	constructor(options: { name: N; path: P } & { window: Window }) {
		super(options);

		this.window = options.window;
		this.SetEnabled(0);
	}

	public readonly GetWindow = (): Window => {
		return this.window;
	};

	public readonly RenderBox = (): Checkbox<N, P> => {
		const { x, y, width, height } = this.window.toJSON();

		Render.FilledRect(x, y, width, height, [26, 26, 26, 255]);
		Render.Rect(x, y, width, height, [57, 58, 58, 178]);

		if (this.GetValue()) {
			const padding = 4;

			Render.FilledRect(
				x + padding,
				y + padding,
				width - padding * 2,
				height - padding * 2,
				[110, 124, 172, 255]
			);
		}

		return this;
	};

	public readonly RenderText = (options: {
		font: number;
		padding_left?: number;
		padding_bottom?: number;
	}): Checkbox<N, P> => {
		const { x, y, width } = this.window.toJSON();
		const text_x = x + width + (options?.padding_left || 6);
		const text_y = y + (options?.padding_bottom || 2);

		Render.String(text_x, text_y, 0, this.GetName(), [243, 244, 255, 255], options.font);

		return this;
	};

	public readonly GetTextSize = (options: {
		font: number;
		padding_left?: number;
		padding_bottom?: number;
	}): WindowOptions => {
		const { x, y, width } = this.window.toJSON();
		const text_x = x + width + (options?.padding_left || 6);
		const text_y = y + (options?.padding_bottom || 2);

		const text_size = Render.TextSize(this.GetName(), options.font);

		return {
			x: text_x,
			y: text_y,
			width: text_size[0],
			height: text_size[1],
		};
	};

	public readonly GetSize = (options: {
		font: number;
		padding_left?: number;
		padding_bottom?: number;
	}): WindowOptions => {
		const { x, y, width } = this.window.toJSON();
		const text_x = x + width + (options?.padding_left || 6);
		const text_y = y + (options?.padding_bottom || 2);

		const text_size = Render.TextSize(this.GetName(), options.font);

		return {
			x,
			y,
			width: text_x + text_size[0],
			height: text_y + text_size[1],
		};
	};

	public readonly HandleClick = (options: { input: InputSystem }) => {
		if (
			options.input.IsInBounds(this.window.toJSON()) &&
			options.input.IsDown(0x01) &&
			Globals.Curtime() > this.timeout + 0.05
		) {
			this.SetValue(Number(!this.GetValue()) as 0 | 1);

			this.timeout = Globals.Curtime() + 0.05;
		}
	};

	public readonly Render = (): Checkbox<N, P> => {
		const font = Render.GetFont("Verdana.ttf", 11, true);

		this.RenderBox();
		this.RenderText({ font });

		return this;
	};
}
