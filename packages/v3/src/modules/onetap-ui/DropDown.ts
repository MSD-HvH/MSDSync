import { BaseElement, type CallbackFunction } from "./base-element.js";

export class Dropdown<N extends string> extends BaseElement<N, Dropdown<N>> {
	private last_value: number;
	private elements: string[];
	private callbackFn: CallbackFunction<Dropdown<N>>;

	constructor(options: { name: N; elements: string[] }, callbackFn: CallbackFunction<Dropdown<N>> = () => {}) {
		UI.AddDropdown.call(null, options.name, options.elements);

		super(options);

		this.last_value = this.GetValue();
		this.elements = options.elements;
		this.callbackFn = callbackFn;
	}

	public readonly GetValue = (): number => {
		return UI.GetValue(...this.GetPath());
	};

	public readonly SetValue = <V extends number>(value: V): Dropdown<N> => {
		UI.SetValue(...this.GetPath(), value);

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

	public readonly SetActiveElement = <E extends string>(element: E): Dropdown<N> => {
		const index = this.elements.indexOf(element);

		UI.SetValue(...this.GetPath(), index);

		return this;
	};

	public readonly ElementIsActive = <E extends string>(element: E): boolean => {
		const index = this.elements.indexOf(element);
		const value = this.GetValue();

		return value === index;
	};

	public readonly AddCallback = <C extends CallbackFunction<Dropdown<N>>>(callbackFn: C): Dropdown<N> => {
		this.callbackFn = callbackFn;

		return this;
	};

	public readonly CheckCallback = <A extends any[]>(...args: A): Dropdown<N> => {
		if (this.last_value != this.GetValue()) {
			this.callbackFn(this, ...args);

			this.last_value = this.GetValue();
		}

		return this;
	};
}
