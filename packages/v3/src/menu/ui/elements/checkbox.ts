import { Checkbox, InputSystem, Window } from "../../../modules/index.js";
import { AccentColor, ElementBackgroundColor, ElementOutline } from "./index.js";

export class MSDSyncCheckbox<N extends string> extends Checkbox<N> {
	private readonly window: Window;

	constructor(options: { name: N } & { window: Window }) {
		super(options);

		this.window = options.window;
		this.SetEnabled(0);
	}

	public readonly GetWindow = (): Window => {
		return this.window;
	};

	public readonly RenderBox = ({ padding }: { padding: number } = { padding: 4 }): MSDSyncCheckbox<N> => {
		const { x, y, width, height } = this.window.toJSON();

		Render.FilledRect(x, y, width, height, ElementBackgroundColor);
		Render.Rect(x, y, width, height, ElementOutline);

		if (this.GetValue())
			Render.FilledRect(x + padding, y + padding, width - padding * 2, height - padding * 2, AccentColor);

		return this;
	};

	public readonly HandleClick = ({ input }: { input: InputSystem }) => {
		const { IsInBounds, IsPressed } = input;
		const { window, GetValue, SetValue } = this;
		const isInBounds = IsInBounds(window.toJSON());
		const isPressed = IsPressed(0x01);

		if (isInBounds && isPressed) {
			const value: boolean = !GetValue();

			SetValue(Number(value) as 0 | 1);
		}

		return this;
	};
}
