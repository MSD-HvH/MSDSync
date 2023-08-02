import { InputSystem, Window, MultiDropdown } from "../../../modules/index.js";
import { ElementBackgroundColor, ElementOutline } from "./index.js";

export class MSDSyncMultiDropdown<N extends string> extends MultiDropdown<N> {
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

	public readonly RenderBox = (): MSDSyncMultiDropdown<N> => {
		const { x, y, width, height } = this.window.toJSON();
		const height_offset = this.state ? this.GetElements().length * height + height : height;

		Render.FilledRect(x, y, width, height_offset, ElementBackgroundColor);
		Render.Rect(x, y, width, height_offset, ElementOutline);

		return this;
	};

	public readonly GetState = (): boolean => {
		return this.state;
	};

	public readonly SetState = <V extends boolean>(value: V): MSDSyncMultiDropdown<N> => {
		this.state = value;

		return this;
	};

	public readonly HandleClick = ({ input }: { input: InputSystem }): void => {
		const { window, state, SetState, GetState, SetValue, GetValue, GetElements } = this;
		const { IsInBounds, IsPressed } = input;
		const isInBounds = IsInBounds(window.toJSON());
		const isPressed = IsPressed(0x01);

		if (isInBounds && isPressed) SetState(!GetState());
		if (!state) return;

		const elements = GetElements();
		const { x, y, width, height } = window.toJSON();

		elements.forEach((_element, i) => {
			const offset = 20 * i;
			const elementIsInBounds = IsInBounds({ x, y: y + 20 + offset, width, height });

			// Очко болит
			if (elementIsInBounds && isPressed) SetValue(GetValue() ^ (1 << i));
		});
	};
}
