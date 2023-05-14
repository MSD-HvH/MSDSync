import { BaseElement } from "./index.js";

export class Dropdown<N extends string, P extends string[]> extends BaseElement<N, P, number, Dropdown<N, P>> {
	private elements: string[];

	constructor(
		options: { name: N; path: P; elements: string[] },
		callbackFn: CallbackFunction<Dropdown<N, P>> = () => {}
	) {
		UI.AddDropdown.call(null, options.path, options.name, options.elements, 1);

		super(options, callbackFn);

		this.elements = options.elements;
	}

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
}
