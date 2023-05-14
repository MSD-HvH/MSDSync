import { BaseElement } from "./BaseElement.js";

export class Textbox<N extends string, P extends string[]> extends BaseElement<N, P, Textbox<N, P>> {
	private last_value: string;
	private callbackFn: CallbackFunction<Textbox<N, P>>;

	constructor(options: { name: N; path: P }, callbackFn: CallbackFunction<Textbox<N, P>> = () => {}) {
		UI.AddTextbox.call(null, options.path, options.name);

		super(options);

		this.last_value = this.GetString();
		this.callbackFn = callbackFn;
	}

	public readonly GetString = (): string => {
		return UI.GetString(this.GetPath());
	};

	public readonly AddCallback = <C extends CallbackFunction<Textbox<N, P>>>(callbackFn: C): Textbox<N, P> => {
		this.callbackFn = callbackFn;

		return this;
	};

	public readonly CheckCallback = <A extends any[]>(...args: A): Textbox<N, P> => {
		if (this.last_value != this.GetString()) {
			this.callbackFn(this, ...args);

			this.last_value = this.GetString();
		}

		return this;
	};
}
