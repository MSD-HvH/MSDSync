import { BaseElement, type CallbackFunction } from "./base-element.js";

export class MultiDropdown<N extends string> extends BaseElement<N, MultiDropdown<N>> {
	private last_value: number;
	private elements: string[];
	private callbackFn: CallbackFunction<MultiDropdown<N>>;

	constructor(options: { name: N; elements: string[] }, callbackFn: CallbackFunction<MultiDropdown<N>> = () => {}) {
		UI.AddMultiDropdown(options.name, options.elements);

		super(options);

		this.last_value = this.GetValue();
		this.elements = options.elements;
		this.callbackFn = callbackFn;
	}

	public readonly GetValue = (): number => {
		return UI.GetValue(...this.GetPath());
	};

	public readonly SetValue = <V extends number>(value: V): MultiDropdown<N> => {
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

	public readonly GetActiveElements = (): string[] => {
		const elements = this.elements.filter((_element, i) => {
			return this.GetValue() & (1 << i);
		});

		return elements;
	};

	public readonly ElementIsActive = <E extends string>(element: E): boolean => {
		const index = this.elements.indexOf(element);

		return this.GetValue() & (1 << index) ? true : false;
	};

	public readonly AddCallback = <C extends CallbackFunction<MultiDropdown<N>>>(callbackFn: C): MultiDropdown<N> => {
		this.callbackFn = callbackFn;

		return this;
	};

	public readonly CheckCallback = <A extends any[]>(...args: A): MultiDropdown<N> => {
		if (this.last_value != this.GetValue()) {
			this.callbackFn(this, ...args);

			this.last_value = this.GetValue();
		}

		return this;
	};
}
