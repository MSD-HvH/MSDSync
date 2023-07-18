import { BaseElement, type CallbackFunction } from "./base-element.js";

export class ColorPicker<N extends string> extends BaseElement<N, ColorPicker<N>> {
	private last_value: RGBAColor;
	private callbackFn: CallbackFunction<ColorPicker<N>>;

	constructor(options: { name: N }, callbackFn: CallbackFunction<ColorPicker<N>> = () => {}) {
		UI.AddColorPicker.call(null, options.name);

		super(options);

		this.last_value = this.GetColor();
		this.callbackFn = callbackFn;
	}

	public readonly GetColor = (): RGBAColor => {
		return UI.GetColor(...this.GetPath());
	};

	public readonly SetColor = <C extends RGBAColor>(color: C): ColorPicker<N> => {
		UI.SetColor(...this.GetPath(), color);

		return this;
	};

	public readonly AddCallback = <C extends CallbackFunction<ColorPicker<N>>>(callbackFn: C): ColorPicker<N> => {
		this.callbackFn = callbackFn;

		return this;
	};

	public readonly CheckCallback = <A extends any[]>(...args: A): ColorPicker<N> => {
		if (!Input.IsKeyPressed(0x01) && this.last_value.toString() != this.GetColor().toString()) {
			this.callbackFn(this, ...args);

			this.last_value = this.GetColor();
		}

		return this;
	};
}
