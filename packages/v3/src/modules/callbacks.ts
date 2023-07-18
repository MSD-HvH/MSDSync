type Callback = (...args: any[]) => void;
type List<T> = { [key: string]: T };

const callbackHandlers: List<Function> = {};
const callbacks: List<Callback[]> = {};

export class Callbacks {
	public readonly HandlerIsExists = <N extends string>(name: N): boolean => {
		return callbackHandlers[name] ? true : false;
	};

	public readonly CallbackIsExists = <N extends string>(name: N): boolean => {
		return callbacks[name] ? true : false;
	};

	public readonly AddHandler = <N extends string>(name: N) => {
		callbackHandlers[name] = new Function(`
            var list = callbacks["${name}"];
            for (var i = 0; i < list.length; i++) {
            list[i]("${name}");
            }
        `);

		return this;
	};

	public readonly AddCallback = <N extends CallbackName, F extends Callback>(callbackName: N, callbackFn: F) => {
		if (!this.CallbackIsExists(callbackName)) {
			callbacks[callbackName] = [];
		}

		callbacks[callbackName]!.push(callbackFn);

		return this;
	};

	public readonly on = <N extends CallbackName, F extends Callback>(callbackName: N, callbackFn: F) => {
		this.AddHandler(callbackName);
		this.AddCallback(callbackName, callbackFn);

		return this;
	};

	public readonly RegisterCallbacks = () => {
		for (const clbk in callbackHandlers) {
			Cheat.RegisterCallback(clbk as CallbackName, `callbackHandlers.${clbk}`);
		}

		return this;
	};
}
