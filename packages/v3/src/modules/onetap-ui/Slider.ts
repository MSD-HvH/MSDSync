import { BaseElement, type CallbackFunction } from "./base-element.js";

export class Slider<N extends string> extends BaseElement<N, Slider<N>> {
	private readonly min: number;
	private readonly max: number;

	private last_value: number;
	private callbackFn: CallbackFunction<Slider<N>>;

	constructor(
		options: { name: N; min: number; max: number; type: "Float" | "Int" },
		callbackFn: CallbackFunction<Slider<N>> = () => {}
	) {
		UI[("AddSlider" + options.type) as `AddSlider${"Int" | "Float"}`].call(
			null,
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
		return UI.GetValue(...this.GetPath());
	};

	public readonly SetValue = <V extends number>(value: V): Slider<N> => {
		UI.SetValue(...this.GetPath(), value);

		this.last_value = value;

		return this;
	};

	public readonly GetMinimumValue = (): number => {
		return this.min;
	};

	public readonly GetMaximumValue = (): number => {
		return this.max;
	};

	public readonly AddCallback = <C extends CallbackFunction<Slider<N>>>(callbackFn: C): Slider<N> => {
		this.callbackFn = callbackFn;

		return this;
	};

	public readonly CheckCallback = <A extends any[]>(...args: A): Slider<N> => {
		if (!Input.IsKeyPressed(0x01) && this.last_value != this.GetValue()) {
			this.callbackFn(this, ...args);

			this.last_value = this.GetValue();
		}

		return this;
	};
}
