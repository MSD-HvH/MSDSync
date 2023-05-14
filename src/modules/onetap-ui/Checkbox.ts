import { BaseElement } from "./index.js";

export class Checkbox<N extends string, P extends string[]> extends BaseElement<N, P, 0 | 1, Checkbox<N, P>> {
	constructor(options: { name: N; path: P }, callbackFn: CallbackFunction<Checkbox<N, P>> = () => {}) {
		UI.AddCheckbox.call(null, options.path, options.name);

		super(options, callbackFn);
	}
}
