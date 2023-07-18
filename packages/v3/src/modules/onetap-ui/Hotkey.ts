import { BaseElement } from "./base-element.js";

export class Hotkey<N extends string, D extends string> extends BaseElement<N, Hotkey<N, D>> {
	constructor(options: { name: N; display_name: D }) {
		UI.AddHotkey.call(null, options.name);

		super(options);
	}

	public readonly IsHotkeyActive = (): 0 | 1 => {
		return UI.GetValue(...this.GetPath()) as 0 | 1;
	};

	public readonly ToggleHotkey = (): Hotkey<N, D> => {
		UI.ToggleHotkey(...this.GetPath());

		return this;
	};
}
