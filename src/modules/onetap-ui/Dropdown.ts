/**
 * Каллбэк функция.
 */
type CallbackFunction = <N extends string, E extends string, A extends E[]>(element: Dropdown<N, E, A>) => any;

export interface DropdownOptions<N extends string, E extends string, A extends E[]> {
	name: N;

	path: string[];

	elements: A;

	callbackFn?: CallbackFunction;
}

export interface DropdownStructure<N extends string, E extends string, A extends E[]> {
	value: number;

	Create: () => Dropdown<N, E, A>;

	GetPath: () => string[];

	GetName: () => N;

	GetElements: () => A;

	GetValue: () => number;

	SetValue: <V extends number>(value: V) => Dropdown<N, E, A>;

	GetElement: <I extends number>(index: I) => E;

	GetElementIndex: (element: E) => number;

	SetEnabled: <V extends 0 | 1>(value: V) => Dropdown<N, E, A>;

	UpdateList: (list: A) => Dropdown<N, E, A>;

	AddCallback: <F extends CallbackFunction>(callbackFn: F) => Dropdown<N, E, A>;

	CheckCallback: () => Dropdown<N, E, A>;
}

export class Dropdown<N extends string, E extends string, A extends E[]>
	implements DropdownOptions<N, E, A>, DropdownStructure<N, E, A>
{
	public name: N;
	public elements: A;
	public readonly path: string[];
	public value: number = 0;
	public callbackFn: CallbackFunction;

	constructor(options: DropdownOptions<N, E, A>) {
		this.name = options.name;
		this.elements = options.elements;
		this.path = options.path;

		this.callbackFn = options?.callbackFn || (() => {});
	}

	public readonly Create = (): Dropdown<N, E, A> => {
		const dropdown = UI.AddDropdown.call(null, this.path, this.name, this.elements, 1);
		this.value = UI.GetValue(dropdown);

		return this;
	};

	public readonly GetPath = (): string[] => {
		return [...this.path, this.name];
	};

	public readonly GetName = (): N => {
		return this.name;
	};

	public readonly GetElements = (): A => {
		return this.elements;
	};

	public readonly GetValue = (): number => {
		return UI.GetValue(this.GetPath());
	};

	public readonly SetValue = <V extends number>(value: V): Dropdown<N, E, A> => {
		UI.SetValue(this.GetPath(), value);

		return this;
	};

	public readonly GetElement = <I extends number>(index: I): E => {
		return this.elements[index] as E;
	};

	public readonly GetElementIndex = (element: E): number => {
		return this.elements.indexOf(element);
	};

	public readonly SetEnabled = <V extends 0 | 1>(value: V): Dropdown<N, E, A> => {
		UI.SetEnabled(this.GetPath(), value);

		return this;
	};

	public readonly UpdateList = (items: A): Dropdown<N, E, A> => {
		UI.UpdateList(this.GetPath(), items);
		this.elements = items;

		return this;
	};

	public readonly AddCallback = <F extends CallbackFunction>(callbackFn: F): Dropdown<N, E, A> => {
		this.callbackFn = callbackFn;

		return this;
	};

	public readonly CheckCallback = (): Dropdown<N, E, A> => {
		if (this.value != this.GetValue()) {
			this.callbackFn(this);

			this.value = this.GetValue();
		}

		return this;
	};
}
