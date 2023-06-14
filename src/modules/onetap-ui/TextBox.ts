import { BaseElement } from "./BaseElement.js";

export class Textbox<N extends string> extends BaseElement<N, Textbox<N>> {
	private last_value: string;
	private callbackFn: CallbackFunction<Textbox<N>>;

	constructor(options: { name: N }, callbackFn: CallbackFunction<Textbox<N>> = () => {}) {
		UI.AddTextbox.call(null, options.name);

		super(options);

		this.last_value = this.GetString();
		this.callbackFn = callbackFn;
	}

	public readonly GetString = (): string => {
		return UI.GetString(...this.GetPath());
	};

	public readonly AddCallback = <C extends CallbackFunction<Textbox<N>>>(callbackFn: C): Textbox<N> => {
		this.callbackFn = callbackFn;

		return this;
	};

	public readonly CheckCallback = <A extends any[]>(...args: A): Textbox<N> => {
		if (this.last_value != this.GetString()) {
			this.callbackFn(this, ...args);

			this.last_value = this.GetString();
		}

		return this;
	};
}
