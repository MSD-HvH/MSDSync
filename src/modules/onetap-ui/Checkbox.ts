/**
 * Каллбэк функция.
 */
type CallbackFunction = <N extends string>(element: Checkbox<N>) => any;

export interface CheckboxOptions<N extends string> {
	/**
	 * Имя
	 *
	 * @type {string}
	 */
	name: N;

	/**
	 * Путь
	 *
	 * @type {string[]}
	 */
	path: string[];

	/**
	 * Callback функция которая срабатывает при изменении значения.
	 *
	 * ---
	 * @example
	 * ```ts
	 * const subtab = UI.AddSubTab(["Config", "SUBTAB_MGR"], "Test");
	 * const checkbox = new Checkbox({
	 *     name: "Hello",
	 *     path: ["Config", "Test", "Test"],
	 *     callbackFn: function (checkbox) {
	 *         Cheat.Print("Current value: " + checkbox.GetValue() + "\n");
	 *     }
	 * }).Create();
	 *
	 * const on_Draw = function() {
	 *     checkbox.CheckCallback();
	 * };
	 *
	 * Cheat.RegisterCallback("Draw", "on_Draw");
	 * ```
	 * ---
	 *
	 * @param {Checkbox<N>} checkbox чекбокс на который нажимают.
	 * @type {CallbackFunction}
	 * @returns {any}
	 */
	callbackFn?: CallbackFunction;
}

export interface CheckboxStructure<N extends string> {
	/**
	 * ---
	 * @example
	 * ```ts
	 * const subtab = UI.AddSubTab(["Config", "SUBTAB_MGR"], "Test");
	 * const checkbox = new Checkbox({
	 *     name: "Hello",
	 *     path: ["Config", "Test", "Test"],
	 * }).Create();
	 * ```
	 * ---
	 *
	 * @returns {Checkbox<N>}
	 */
	Create: () => Checkbox<N>;

	/**
	 * ---
	 * @example
	 * ```ts
	 * const subtab = UI.AddSubTab(["Config", "SUBTAB_MGR"], "Test");
	 * const checkbox = new Checkbox({
	 *     name: "Hello",
	 *     path: ["Config", "Test", "Test"],
	 * }).Create();
	 *
	 * Cheat.Print("Path: " + checkbox.GetPath().join(", ") + "\n");
	 * ```
	 * ---
	 *
	 * @returns {string[]}
	 */
	GetPath: () => string[];

	/**
	 * ---
	 * @example
	 * ```ts
	 * const subtab = UI.AddSubTab(["Config", "SUBTAB_MGR"], "Test");
	 * const checkbox = new Checkbox({
	 *     name: "Hello",
	 *     path: ["Config", "Test", "Test"],
	 * }).Create();
	 *
	 * Cheat.Print(checkbox.GetName() + "\n");
	 * ```
	 * ---
	 *
	 * @returns {N}
	 */
	GetName: () => N;

	/**
	 * ---
	 * @example
	 * ```ts
	 * const subtab = UI.AddSubTab(["Config", "SUBTAB_MGR"], "Test");
	 * const checkbox = new Checkbox({
	 *     name: "Hello",
	 *     path: ["Config", "Test", "Test"],
	 * }).Create();
	 *
	 * Cheat.Print("Checkbox value: " + checkbox.GetValue() + "\n");
	 * ```
	 * ---
	 *
	 * @returns {0 | 1}
	 */
	GetValue: () => 0 | 1;

	/**
	 * ---
	 * @example
	 * ```ts
	 * const subtab = UI.AddSubTab(["Config", "SUBTAB_MGR"], "Test");
	 * const checkbox = new Checkbox({
	 *     name: "Hello",
	 *     path: ["Config", "Test", "Test"],
	 * }).Create();
	 *
	 * checkbox.SetValue(1);
	 * ```
	 * ---
	 *
	 * @param {0 | 1} value
	 * @returns {Checkbox<N>}
	 */
	SetValue: <V extends 0 | 1>(value: V) => Checkbox<N>;

	/**
	 * ---
	 * @example
	 * ```ts
	 * const subtab = UI.AddSubTab(["Config", "SUBTAB_MGR"], "Test");
	 * const checkbox = new Checkbox({
	 *     name: "Hello",
	 *     path: ["Config", "Test", "Test"],
	 * });
	 *
	 * checkbox.SetEnabled(0);
	 * ```
	 * ---
	 *
	 * @param {0 | 1} value
	 * @returns {Checkbox<N>}
	 */
	SetEnabled: <V extends 0 | 1>(value: V) => Checkbox<N>;

	/**
	 * ---
	 * @example
	 * ```ts
	 * const subtab = UI.AddSubTab(["Config", "SUBTAB_MGR"], "Test");
	 * const checkbox = new Checkbox({
	 *     name: "Hello",
	 *     path: ["Config", "Test", "Test"],
	 *     callbackFn: function (checkbox) {
	 *         Cheat.Print("Current value: " + checkbox.GetValue() + "\n");
	 *     }
	 * }).Create();
	 *
	 * const on_Draw = function() {
	 *     checkbox.CheckCallback();
	 * };
	 *
	 * Cheat.RegisterCallback("Draw", "on_Draw");
	 * ```
	 * ---
	 *
	 * @param {CallbackFunction} callbackFn
	 * @returns {Checkbox<N>}
	 */
	AddCallback: (callbackFn: CallbackFunction) => Checkbox<N>;

	/**
	 * ---
	 * @example
	 * ```ts
	 * const subtab = UI.AddSubTab(["Config", "SUBTAB_MGR"], "Test");
	 * const checkbox = new Checkbox({
	 *     name: "Hello",
	 *     path: ["Config", "Test", "Test"],
	 *     callbackFn: function (checkbox) {
	 *         Cheat.Print("Current value: " + checkbox.GetValue() + "\n");
	 *     }
	 * }).Create();
	 *
	 * const on_Draw = function() {
	 *     checkbox.CheckCallback();
	 * };
	 *
	 * Cheat.RegisterCallback("Draw", "on_Draw");
	 * ```
	 * ---
	 *
	 * @returns {Checkbox<N>}
	 */
	CheckCallback: () => Checkbox<N>;
}

export class Checkbox<N extends string> implements CheckboxStructure<N> {
	/**
	 * Имя
	 *
	 * @type {string}
	 */
	private readonly name: N;

	/**
	 * Путь
	 *
	 * @type {string[]}
	 */
	private readonly path: string[];

	/**
	 * Состояние для Callback
	 *
	 * @type {0 | 1}
	 */
	private value: 0 | 1 = 0;

	/**
	 * Callback функция которая срабатывает при изменении значения.
	 *
	 * ---
	 * @example
	 * ```ts
	 * const subtab = UI.AddSubTab(["Config", "SUBTAB_MGR"], "Test");
	 * const checkbox = new Checkbox({
	 *     name: "Hello",
	 *     path: ["Config", "Test", "Test"],
	 *     callbackFn: function (checkbox) {
	 *         Cheat.Print("Current value: " + checkbox.GetValue() + "\n");
	 *     }
	 * }).Create();
	 *
	 * const on_Draw = function() {
	 *     checkbox.CheckCallback();
	 * };
	 *
	 * Cheat.RegisterCallback("Draw", "on_Draw");
	 * ```
	 * ---
	 *
	 * @param {Checkbox<N>} checkbox чекбокс на который нажимают.
	 * @type {CallbackFunction}
	 * @returns {any}
	 */
	private callbackFn: CallbackFunction;

	constructor(options: CheckboxOptions<N>) {
		this.name = options.name;
		this.path = options.path;

		this.callbackFn = options?.callbackFn || (() => {});
	}

	public readonly Create = (): Checkbox<N> => {
		const checkbox = UI.AddCheckbox.call(null, this.path, this.name);
		this.value = UI.GetValue(checkbox) as 0 | 1;

		return this;
	};

	public readonly GetPath = (): string[] => {
		return [...this.path, this.name];
	};

	public readonly GetName = (): N => {
		return this.name;
	};

	public readonly GetValue = (): 0 | 1 => {
		return UI.GetValue(this.GetPath()) as 0 | 1;
	};

	public readonly SetValue = <V extends 0 | 1>(value: V): Checkbox<N> => {
		UI.SetValue(this.GetPath(), value);

		return this;
	};

	public readonly SetEnabled = <V extends 0 | 1>(value: V): Checkbox<N> => {
		UI.SetEnabled(this.GetPath(), value);

		return this;
	};

	public readonly AddCallback = (callbackFn: CallbackFunction): Checkbox<N> => {
		this.callbackFn = callbackFn;

		return this;
	};

	public readonly CheckCallback = (): Checkbox<N> => {
		if (this.value != this.GetValue()) {
			this.callbackFn(this);

			this.value = this.GetValue();
		}

		return this;
	};
}
