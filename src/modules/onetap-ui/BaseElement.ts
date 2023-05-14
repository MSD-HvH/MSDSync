export class BaseElement<N extends string, P extends string[], V extends number, E> {
	private readonly name: N;
	private readonly path: P;

	private last_value: V;
	private callbackFn: CallbackFunction<E>;

	constructor(options: { name: N; path: P }, callbackFn: CallbackFunction<E> = () => {}) {
		this.name = options.name;
		this.path = options.path;

		this.last_value = this.GetValue() as V;
		this.callbackFn = callbackFn;
	}

	public readonly GetName = (): N => {
		return this.name;
	};

	public readonly GetPath = (): [...P, N] => {
		return [...this.path, this.name];
	};

	public readonly GetValue = (): V => {
		return UI.GetValue(this.GetPath()) as V;
	};

	public readonly SetValue = (value: V): E => {
		UI.SetValue(this.GetPath(), value);

		this.last_value = value;

		return this as unknown as E;
	};

	public readonly SetEnabled = <V extends 0 | 1>(value: V): E => {
		UI.SetEnabled(this.GetPath(), value);

		return this as unknown as E;
	};

	public readonly AddCallback = (callbackFn: CallbackFunction<E>): E => {
		this.callbackFn = callbackFn;

		return this as unknown as E;
	};

	public readonly CheckCallback = <A extends any[]>(...args: A) => {
		if (this.last_value != this.GetValue()) {
			this.callbackFn(this as unknown as E, ...args);

			this.last_value = this.GetValue();
		}

		return this;
	};
}
