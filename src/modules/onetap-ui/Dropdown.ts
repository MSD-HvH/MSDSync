import { BaseElement } from "./index.js";

export class Dropdown<N extends string, P extends string[]> extends BaseElement<N, P, Dropdown<N, P>> {
	private last_value: number;
	private elements: string[];
	private callbackFn: CallbackFunction<Dropdown<N, P>>;

	constructor(
		options: { name: N; path: P; elements: string[] },
		callbackFn: CallbackFunction<Dropdown<N, P>> = () => {}
	) {
		UI.AddDropdown.call(null, options.path, options.name, options.elements, 1);

		super(options);

		this.last_value = this.GetValue();
		this.elements = options.elements;
		this.callbackFn = callbackFn;
	}

	public readonly GetValue = (): 0 | 1 => {
		return UI.GetValue(this.GetPath()) as 0 | 1;
	};

	public readonly SetValue = <V extends 0 | 1>(value: V): Dropdown<N, P> => {
		UI.SetValue(this.GetPath(), value);

		this.last_value = value;

		return this;
	};

	public readonly GetElements = (): string[] => {
		return this.elements;
	};

	public readonly GetElement = <I extends number>(index: I): string => {
		return this.elements[index] as string;
	};

	public readonly GetElementIndex = <E extends string>(element: E): number => {
		return this.elements.indexOf(element);
	};

	public readonly GetActiveElement = (): string => {
		return this.elements[this.GetValue()] as string;
	};

	public readonly SetActiveElement = <E extends string>(element: E): Dropdown<N, P> => {
		const index = this.elements.indexOf(element);

		UI.SetValue(this.GetPath(), index);

		return this;
	};

	public readonly ElementIsActive = <E extends string>(element: E): boolean => {
		const index = this.elements.indexOf(element);
		const value = this.GetValue();

		return value === index;
	};

	public readonly AddCallback = <C extends CallbackFunction<Dropdown<N, P>>>(callbackFn: C): Dropdown<N, P> => {
		this.callbackFn = callbackFn;

		return this;
	};

	public readonly CheckCallback = <A extends any[]>(...args: A): Dropdown<N, P> => {
		if (this.last_value != this.GetValue()) {
			this.callbackFn(this, ...args);

			this.last_value = this.GetValue();
		}

		return this;
	};
}
