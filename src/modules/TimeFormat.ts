export type Weekday = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
export type Month =
	| "January"
	| "February"
	| "March"
	| "April"
	| "May"
	| "June"
	| "July"
	| "August"
	| "September"
	| "October"
	| "November"
	| "December";

export const weekdays: Weekday[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const months: Month[] = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export interface CurrentDate {
	/**
	 * Текущий день
	 *
	 * @type {number}
	 */
	day: number;

	/**
	 * Текущее число месяц
	 *
	 * @type {number}
	 */
	month_number: number;

	/**
	 * Текущий месяц
	 *
	 * @type {Month}
	 */
	month: Month;

	/**
	 * Текущий год
	 *
	 * @type {number}
	 */
	year: number;

	/**
	 * Текущий день недели
	 *
	 * @type {Weekday}
	 */
	weekday: Weekday;
}

export interface CurrentTime {
	/**
	 * Текущий час
	 *
	 * @type {string};
	 */
	hours: string;

	/**
	 * Текущие минуты
	 *
	 * @type {string}
	 */
	minutes: string;

	/**
	 * Текущие секунды
	 *
	 * @type {string}
	 */
	seconds: string;

	/**
	 * Разница во времени с GMT
	 *
	 * @type {string}
	 */
	timezone: string;
}

export interface TimeFormatStructure {
	/**
	 * Текущая дата
	 *
	 * @type {Date}
	 */
	date: Date;

	/**
	 * Установить дату
	 *
	 * ---
	 * @example
	 * ```ts
	 * const timeFormat = new TimeFormat();
	 * timeFormat.SetDate(); // new Date();
	 * ```
	 * ---
	 *
	 * @param {Date} date
	 */
	SetDate: (date: Date) => TimeFormat;

	/**
	 * Получить текущий день
	 *
	 * ---
	 * @example
	 * ```ts
	 * const timeFormat = new TimeFormat();
	 * const day = timeFormat.GetDay();
	 *
	 * Cheat.Print(day + "\n");
	 * ```
	 * ---
	 *
	 * @returns {number} Текущий день
	 */
	GetDay: () => number;

	/**
	 * Получить текущее число месяц
	 *
	 * ---
	 * @example
	 * ```ts
	 * const timeFormat = new TimeFormat();
	 * const monthNumber = timeFormat.GetMonthNumber();
	 *
	 * Cheat.Print(monthNumber + "\n");
	 * ```
	 * ---
	 *
	 * @returns {number} Текущее число месяца
	 */
	GetMonthNumber: () => number;

	/**
	 * Получить текущий месяц
	 *
	 * ---
	 * @example
	 * ```ts
	 * const timeFormat = new TimeFormat();
	 * const month = timeFormat.GetMonth();
	 *
	 * Cheat.Print(month + "\n");
	 * ```
	 * ---
	 *
	 * @returns {Month} Текущий месяц
	 */
	GetMonth: () => Month;

	/**
	 * Получить текущий год
	 *
	 * ---
	 * @example
	 * ```ts
	 * const timeFormat = new TimeFormat();
	 * const year = timeFormat.GetYear();
	 *
	 * Cheat.Print(year + "\n");
	 * ```
	 * ---
	 *
	 * @returns {number} Текущий год
	 */
	GetYear: () => number;

	/**
	 * Получить число текущего дня недели
	 *
	 * ---
	 * @example
	 * ```ts
	 * const timeFormat = new TimeFormat();
	 * const weekday = timeFormat.GetWeekdayNumber();
	 *
	 * Cheat.Print(weekday + "\n");
	 * ```
	 * ---
	 *
	 * @returns {number} Текущий день недели
	 */
	GetWeekdayNumber: () => number;

	/**
	 * Получить текущий день недели
	 *
	 * ---
	 * @example
	 * ```ts
	 * const timeFormat = new TimeFormat();
	 * const weekday = timeFormat.GetWeekday();
	 *
	 * Cheat.Print(weekday + "\n");
	 * ```
	 * ---
	 *
	 * @returns {Weekday} Текущий день недели
	 */
	GetWeekday: () => Weekday;

	/**
	 * Получить текущий час
	 *
	 * ---
	 * @example
	 * ```ts
	 * const timeFormat = new TimeFormat();
	 * const hour = timeFormat.GetHours();
	 *
	 * Cheat.Print(hour + "\n");
	 * ```
	 * ---
	 *
	 * @returns {string} Текущий час
	 */
	GetHours: () => string;

	/**
	 * Получить текущие минуты
	 *
	 * ---
	 * @example
	 * ```ts
	 * const timeFormat = new TimeFormat();
	 * const minutes = timeFormat.GetMinutes();
	 *
	 * Cheat.Print(minutes + "\n");
	 * ```
	 * ---
	 *
	 * @returns {string} Текущие минуты
	 */
	GetMinutes: () => string;

	/**
	 * Получить текущие секунды
	 *
	 * ---
	 * @example
	 * ```ts
	 * const timeFormat = new TimeFormat();
	 * const seconds = timeFormat.GetSeconds();
	 *
	 * Cheat.Print(seconds + "\n");
	 * ```
	 * ---
	 *
	 * @returns {string} Текущие секунды
	 */
	GetSeconds: () => string;

	/**
	 * Получить разницу во времени GMT
	 *
	 * ---
	 * @example
	 * ```ts
	 * const timeFormat = new TimeFormat();
	 * const timezone = timeFormat.GetTimezoneOffset();
	 *
	 * Cheat.Print(timezone + "\n"); // МСК: +3
	 * ```
	 * ---
	 *
	 * @returns {string} Текущая разница во времени
	 */
	GetTimezoneOffset: () => string;

	/**
	 * Получить текущую дату:
	 * День, месяц, год, день недели
	 *
	 * ---
	 * @example
	 * ```ts
	 * const timeFormat = new TimeFormat();
	 * const date = timeFormat.GetCurrentDate();
	 *
	 * Cheat.Print([date.day, date.month, date.year, date.weekday].join(" ") + "\n");
	 * ```
	 * ---
	 *
	 * @returns {CurrentDate} Текущая дата
	 */
	GetCurrentDate: () => CurrentDate;

	/**
	 * Получить текущее время:
	 * Часы, минуты, секунды
	 *
	 * ---
	 * @example
	 * ```ts
	 * const timeFormat = new TimeFormat();
	 * const time = timeFormat.GetCurrentTime();
	 *
	 * Cheat.Print([time.hours, time.minutes, time.seconds].join(":") + "\n");
	 * ```
	 * ---
	 *
	 * @returns {CurrentDate} Текущее время
	 */
	GetCurrentTime: () => CurrentTime;
}

/**
 * Класс для формата даты
 *
 * @class
 * @implements {TimeFormatStructure}
 */
export class TimeFormat implements TimeFormatStructure {
	public date: Date;

	/**
	 * @constructor
	 * @param {Date} date
	 */
	constructor(date: Date = new Date()) {
		this.date = date;
	}

	public readonly SetDate = (date: Date = new Date()) => {
		this.date = date;

		return this;
	};

	public readonly GetDay = (): number => {
		return this.date.getDate();
	};

	public readonly GetMonthNumber = (): number => {
		return this.date.getMonth();
	};

	public readonly GetMonth = (): Month => {
		return months[this.GetMonthNumber()] as Month;
	};

	public readonly GetYear = (): number => {
		return this.date.getFullYear();
	};

	public readonly GetWeekdayNumber = (): number => {
		return this.date.getDay() === 0 ? 7 : this.date.getDay();
	};

	public readonly GetWeekday = (): Weekday => {
		return weekdays[this.date.getDay()] as Weekday;
	};

	public readonly GetHours = (): string => {
		return this.date.toTimeString().substring(0, 2);
	};

	public readonly GetMinutes = (): string => {
		return this.date.toTimeString().substring(3, 5);
	};

	public readonly GetSeconds = (): string => {
		return this.date.toTimeString().substring(6, 8);
	};

	public readonly GetTimezoneOffset = (): string => {
		const timezoneOffset: number = this.date.getTimezoneOffset();
		const offset: number = Math.abs(timezoneOffset);
		const offsetOperator: "+" | "-" = timezoneOffset < 0 ? "+" : "-";
		const offsetHours: number = Math.floor(offset / 60);

		return offsetOperator + offsetHours;
	};

	public readonly GetCurrentDate = (): CurrentDate => {
		const day: number = this.GetDay();
		const month_number: number = this.GetMonthNumber();
		const month: Month = this.GetMonth();
		const year: number = this.GetYear();

		const weekday: Weekday = this.GetWeekday();

		return { day, month_number, month, year, weekday };
	};

	public readonly GetCurrentTime = (): CurrentTime => {
		const hours: string = this.GetHours();
		const minutes: string = this.GetMinutes();
		const seconds: string = this.GetSeconds();
		const timezone: string = this.GetTimezoneOffset();

		return { hours, minutes, seconds, timezone };
	};
}
