import { BaseElement } from "./BaseElement.js";

export class Checkbox<N extends string> extends BaseElement<N, Checkbox<N>> {
	private last_value: 0 | 1;
	private callbackFn: CallbackFunction<Checkbox<N>>;

	constructor(options: { name: N }, callbackFn: CallbackFunction<Checkbox<N>> = () => {}) {
		UI.AddCheckbox.call(null, options.name);

		super(options);

		this.last_value = this.GetValue();
		this.callbackFn = callbackFn;
	}

	public readonly GetValue = (): 0 | 1 => {
		return UI.GetValue(...this.GetPath()) as 0 | 1;
	};

	public readonly SetValue = <V extends 0 | 1>(value: V): Checkbox<N> => {
		UI.SetValue(...this.GetPath(), value);

		this.last_value = value;

		return this;
	};

	public readonly AddCallback = <C extends CallbackFunction<Checkbox<N>>>(callbackFn: C): Checkbox<N> => {
		this.callbackFn = callbackFn;

		return this;
	};

	public readonly CheckCallback = <A extends any[]>(...args: A): Checkbox<N> => {
		if (this.last_value != this.GetValue()) {
			this.callbackFn(this, ...args);

			this.last_value = this.GetValue();
		}

		return this;
	};
}
