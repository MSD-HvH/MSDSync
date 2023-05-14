import { BaseElement } from "./BaseElement.js";

export class Hotkey<N extends string, D extends string, P extends string[]> extends BaseElement<N, P, Hotkey<N, D, P>> {
	constructor(options: { name: N; display_name: D; path: P }) {
		UI.AddHotkey.call(null, options.path, options.name, options.display_name);

		super(options);
	}

	public readonly GetHotkey = (): number => {
		return UI.GetHotkey(this.GetPath());
	};

	public readonly GetHotkeyState = (): "Always" | "Toggle" | "Hold" | "None" => {
		return UI.GetHotkeyState(this.GetPath());
	};

	public readonly SetHotkeyState = <S extends "Always" | "Toggle" | "Hold" | "None">(state: S): Hotkey<N, D, P> => {
		UI.SetHotkeyState(this.GetPath(), state);

		return this;
	};

	public readonly IsHotkeyActive = (): 0 | 1 => {
		return UI.GetValue(this.GetPath()) as 0 | 1;
	};

	public readonly ToggleHotkey = (): Hotkey<N, D, P> => {
		UI.ToggleHotkey(this.GetPath());

		return this;
	};
}
