export type CallbackFunction<E> = (element: E, ...args: any[]) => void;

export class BaseElement<N extends string, E> {
	private readonly name: N;

	constructor({ name }: { name: N }) {
		this.name = name;
	}

	public readonly GetName = (): N => {
		return this.name;
	};

	public readonly GetPath = (): ["Misc", "JAVASCRIPT", "Script items", N] => {
		return ["Misc", "JAVASCRIPT", "Script items", this.name];
	};

	public readonly SetEnabled = <V extends 0 | 1>(value: V): E => {
		UI.SetEnabled(...this.GetPath(), value);

		return this as unknown as E;
	};
}
