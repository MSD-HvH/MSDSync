import { Slider, InputSystem, Window, Clamp } from "../../../modules/index.js";
import { AccentColor, ElementBackgroundColor, ElementOutline } from "./index.js";

export class MSDSyncSlider<N extends string> extends Slider<N> {
	private readonly window: Window;

	constructor(options: { name: N; min: number; max: number } & { window: Window }) {
		super({ ...options, type: "Int" });

		this.window = options.window;
		this.SetEnabled(0);
	}

	public readonly GetWindow = (): Window => {
		return this.window;
	};

	public readonly RenderBox = ({ padding }: { padding: number } = { padding: 4 }): MSDSyncSlider<N> => {
		const { x, y, width, height } = this.window.toJSON();
		const size = (this.GetValue() - this.GetMinimumValue()) / (this.GetMaximumValue() - this.GetMinimumValue());

		Render.FilledRect(x, y, width, height, ElementBackgroundColor);
		Render.Rect(x, y, width, height, ElementOutline);
		Render.FilledRect(x + padding, y + padding, (width - padding * 2) * size, height - padding * 2, AccentColor);

		return this;
	};

	public readonly HandleClick = ({ input }: { input: InputSystem }) => {
		const { IsInBounds, GetHoldPos, IsDown, GetMouseX } = input;
		const { window, GetMinimumValue, GetMaximumValue, SetValue } = this;
		const { x, y, width, height } = window.toJSON();

		const holdPos = GetHoldPos();
		const isInBounds = IsInBounds({ x, y, width, height }, holdPos);
		const isHolding = IsDown(0x01);

		if (isInBounds && isHolding) {
			const percent = width / Math.abs(GetMinimumValue() - GetMaximumValue());
			const roundedValue = Math.round((GetMouseX() - x) / percent + GetMinimumValue());

			const value = Clamp(roundedValue, GetMinimumValue(), GetMaximumValue());

			SetValue(value);
		}
	};
}
