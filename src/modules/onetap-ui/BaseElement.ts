export class BaseElement<N extends string, P extends string[], E> {
	private readonly name: N;
	private readonly path: P;

	constructor(options: { name: N; path: P }) {
		this.name = options.name;
		this.path = options.path;
	}

	public readonly GetName = (): N => {
		return this.name;
	};

	public readonly GetPath = (): [...P, N] => {
		return [...this.path, this.name];
	};

	public readonly SetEnabled = <V extends 0 | 1>(value: V): E => {
		UI.SetEnabled(this.GetPath(), value);

		return this as unknown as E;
	};
}
