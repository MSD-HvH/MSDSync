export class SubTab<N extends string, P extends "Legit" | "Rage" | "Visuals" | "Misc." | "Config"> {
	private readonly name: N;
	private readonly path: P;

	constructor(options: { name: N; path: P }) {
		this.name = options.name;
		this.path = options.path;

		UI.AddSubTab.call(null, [this.path, "SUBTAB_MGR"], this.name);
	}

	public readonly GetPath = (): [P, N, N] => {
		return [this.path, this.name, this.name];
	};

	public readonly GetChildren = (): string[] => {
		return UI.GetChildren(this.GetPath());
	};

	public readonly IsElementExists = <N extends string>(name: N): boolean => {
		return this.GetChildren()?.indexOf(name) > -1;
	};
}
