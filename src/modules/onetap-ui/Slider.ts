import { BaseElement } from "./BaseElement.js";

export class Slider<N extends string, P extends string[]> extends BaseElement<N, P, Slider<N, P>> {
	private readonly min: number;
	private readonly max: number;

	private last_value: number;
	private callbackFn: CallbackFunction<Slider<N, P>>;

	constructor(
		options: { name: N; path: P; min: number; max: number; type?: "Float" | "Int" },
		callbackFn: CallbackFunction<Slider<N, P>> = () => {}
	) {
		UI[("AddSlider" + options.type) as `AddSlider${"Int" | "Float"}`].call(
			null,
			options.path,
			options.name,
			options.min,
			options.max
		);

		super(options);

		this.min = options.min;
		this.max = options.max;

		this.last_value = this.GetValue();
		this.callbackFn = callbackFn;
	}

	public readonly GetValue = (): number => {
		return UI.GetValue(this.GetPath());
	};

	public readonly SetValue = <V extends number>(value: V): Slider<N, P> => {
		UI.SetValue(this.GetPath(), value);

		this.last_value = value;

		return this;
	};

	public readonly GetMinimumValue = (): number => {
		return this.min;
	};

	public readonly GetMaximumValue = (): number => {
		return this.max;
	};

	public readonly AddCallback = <C extends CallbackFunction<Slider<N, P>>>(callbackFn: C): Slider<N, P> => {
		this.callbackFn = callbackFn;

		return this;
	};

	public readonly CheckCallback = <A extends any[]>(...args: A): Slider<N, P> => {
		if (!Input.IsKeyPressed(0x01) && this.last_value != this.GetValue()) {
			this.callbackFn(this, ...args);

			this.last_value = this.GetValue();
		}

		return this;
	};
}
