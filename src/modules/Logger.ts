import { Colors } from "./index.js";

type Printable = string | number | boolean | any[];

/**
 * @class
 */
export class Logger {
	/**
	 * @constructor
	 */
	constructor() {}

	/**
	 * Функция для вывода предупреждений
	 *
	 * ---
	 * @example
	 * ```ts
	 * const logging = new Logger();
	 *
	 * logging.PrintWarn(["Onetap warned you!"]);
	 * ```
	 * ---
	 *
	 * @param {Printable[]} messages Сообщения
	 * @returns {string}
	 */
	public readonly PrintWarn = <M extends Printable[]>(messages: M): string => {
		Cheat.PrintColor(Colors.Yellow, "[WARN] ");
		return Cheat.Print(messages.join(" ") + "\n");
	};

	/**
	 * Функция для вывода ошибок
	 *
	 * ---
	 * @example
	 * ```ts
	 * const logging = new Logger();
	 *
	 * logging.PrintError(["Onetap got error!"]);
	 * ```
	 * ---
	 *
	 * @param {Printable[]} messages Сообщения
	 * @returns {string}
	 */
	public readonly PrintError = <M extends Printable[]>(messages: M): string => {
		Cheat.PrintColor(Colors.Red, "[ERROR] ");
		return Cheat.Print(messages.join(" ") + "\n");
	};

	/**
	 * Функция для вывода успешного результата
	 *
	 * ---
	 * @example
	 * ```ts
	 * const logging = new Logger();
	 *
	 * logging.PrintSuccess(["Onetap launched!"]);
	 * ```
	 * ---
	 *
	 * @param {Printable[]} messages Сообщения
	 * @returns {string}
	 */
	public readonly PrintSuccess = <M extends Printable[]>(messages: M): string => {
		Cheat.PrintColor(Colors.Green, "[SUCCESS] ");
		return Cheat.Print(messages.join(" ") + "\n");
	};

	/**
	 * Функция для очистки консоли
	 *
	 * ---
	 * @example
	 * ```ts
	 * const logging = new Logger();
	 *
	 * logging.ClearConsole();
	 * ```
	 * ---
	 *
	 * @param {number} amount
	 * @returns {string}
	 */
	public readonly ClearConsole = (amount: number = 250): string => {
		return Cheat.Print("\n".repeat(amount));
	};

	/**
	 * Функция для вывода сообщений в чат
	 *
	 * ---
	 * @example
	 * ```ts
	 * const logging = new Logger();
	 *
	 * logging.PrintChat(["Onetap using chat!"]);
	 * ```
	 * ---
	 *
	 * @param {Printable[]} messages Сообщения
	 * @returns {string}
	 */
	public readonly PrintChat = <M extends Printable[]>(messages: M): string => {
		return Cheat.PrintChat(messages.join(" "));
	};

	/**
	 * Функция для вывода event log
	 *
	 * ---
	 * @example
	 * ```ts
	 * const logging = new Logger();
	 *
	 * logging.PrintEventLog(["Wow, Event Log!"]);
	 * ```
	 * ---
	 *
	 * @param {Printable[]} messages Сообщения
	 * @param {RGBAColor} color Цвет
	 * @returns {void}
	 */
	public readonly PrintEventLog = <M extends Printable[], C extends RGBAColor>(messages: M, color: C): void => {
		return Cheat.PrintLog(messages.join(" ") + "\n", color);
	};
}
