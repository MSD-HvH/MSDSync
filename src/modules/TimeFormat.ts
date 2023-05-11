// TODO: JSDoc

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

/**
 * @class
 */
export class TimeFormat {
	/**
	 * Дата
	 *
	 * @private
	 * @type {Date}
	 */
	private date: Date;

	/**
	 * @constructor
	 * @param {Date} date
	 */
	constructor(date: Date = new Date()) {
		this.date = date;
	}

	public readonly GetDate = (): Date => {
		return this.date;
	};

	public readonly SetDate = <D extends Date>(date: D = new Date() as D): TimeFormat => {
		this.date = date;

		return this;
	};

	public readonly GetDay = (): number => {
		return this.date.getDate();
	};

	public readonly GetMonthIndex = (): number => {
		return this.date.getMonth();
	};

	public readonly GetMonth = (): Month => {
		return months[this.GetMonthIndex()] as Month;
	};

	public readonly GetYear = (): number => {
		return this.date.getFullYear();
	};

	public readonly GetWeekdayIndex = (): number => {
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
		const month_number: number = this.GetMonthIndex();
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
