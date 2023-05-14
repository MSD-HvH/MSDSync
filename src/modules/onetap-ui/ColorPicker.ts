import { BaseElement } from "./index.js";

export class ColorPicker<N extends string, P extends string[]> extends BaseElement<N, P, ColorPicker<N, P>> {
	private last_value: RGBAColor;
	private callbackFn: CallbackFunction<ColorPicker<N, P>>;

	constructor(options: { name: N; path: P }, callbackFn: CallbackFunction<ColorPicker<N, P>> = () => {}) {
		UI.AddColorPicker.call(null, options.path, options.name);

		super(options);

		this.last_value = this.GetColor();
		this.callbackFn = callbackFn;
	}

	public readonly GetColor = (): RGBAColor => {
		return UI.GetColor(this.GetPath());
	};

	public readonly SetColor = <C extends RGBAColor>(color: C): ColorPicker<N, P> => {
		UI.SetColor(this.GetPath(), color);

		return this;
	};

	public readonly AddCallback = <C extends CallbackFunction<ColorPicker<N, P>>>(callbackFn: C): ColorPicker<N, P> => {
		this.callbackFn = callbackFn;

		return this;
	};

	public readonly CheckCallback = <A extends any[]>(...args: A): ColorPicker<N, P> => {
		if (!Input.IsKeyPressed(0x01) && this.last_value.toString() != this.GetColor().toString()) {
			this.callbackFn(this, ...args);

			this.last_value = this.GetColor();
		}

		return this;
	};
}
