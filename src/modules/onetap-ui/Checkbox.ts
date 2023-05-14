import { BaseElement } from "./index.js";

export class Checkbox<N extends string, P extends string[]> extends BaseElement<N, P, Checkbox<N, P>> {
	private last_value: 0 | 1;
	private callbackFn: CallbackFunction<Checkbox<N, P>>;

	constructor(options: { name: N; path: P }, callbackFn: CallbackFunction<Checkbox<N, P>> = () => {}) {
		UI.AddCheckbox.call(null, options.path, options.name);

		super(options);

		this.last_value = this.GetValue();
		this.callbackFn = callbackFn;
	}

	public readonly GetValue = (): 0 | 1 => {
		return UI.GetValue(this.GetPath()) as 0 | 1;
	};

	public readonly SetValue = <V extends 0 | 1>(value: V): Checkbox<N, P> => {
		UI.SetValue(this.GetPath(), value);

		this.last_value = value;

		return this;
	};

	public readonly AddCallback = <C extends CallbackFunction<Checkbox<N, P>>>(callbackFn: C): Checkbox<N, P> => {
		this.callbackFn = callbackFn;

		return this;
	};

	public readonly CheckCallback = <A extends any[]>(...args: A): Checkbox<N, P> => {
		if (this.last_value != this.GetValue()) {
			this.callbackFn(this, ...args);

			this.last_value = this.GetValue();
		}

		return this;
	};
}
