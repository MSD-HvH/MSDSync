// TODO: JSDoc, Relative Timestamp

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

export const TimestampStyles = {
	/**
	 * Short time format, consisting of hours and minutes.
	 *
	 * @example `16:20`
	 */
	ShortTime: "t",

	/**
	 * Long time format, consisting of hours, minutes, and seconds.
	 *
	 * @example `16:20:30`
	 */
	LongTime: "T",

	/**
	 * Short date format, consisting of day, month, and year.
	 *
	 * @example `20/04/2021`
	 */
	ShortDate: "d",

	/**
	 * Long date format, consisting of day, month, and year.
	 *
	 * @example `20 April 2021`
	 */
	LongDate: "D",

	/**
	 * Short date-time format, consisting of short date and short time formats.
	 *
	 * @example `20 April 2021 16:20`
	 */
	ShortDateTime: "f",

	/**
	 * Long date-time format, consisting of long date and short time formats.
	 *
	 * @example `Tuesday, 20 April 2021 16:20`
	 */
	LongDateTime: "F",
} as const satisfies Record<string, string>;

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

	public readonly GetDay = (date: Date = this.date): number => {
		return date.getDate();
	};

	public readonly GetMonthIndex = (date: Date = this.date): number => {
		return date.getMonth();
	};

	public readonly GetMonth = (date: Date = this.date): Month => {
		return months[this.GetMonthIndex(date)] as Month;
	};

	public readonly GetYear = (date: Date = this.date): number => {
		return date.getFullYear();
	};

	public readonly GetWeekdayIndex = (date: Date = this.date): number => {
		return date.getDay() === 0 ? 7 : date.getDay();
	};

	public readonly GetWeekday = (date: Date = this.date): Weekday => {
		return weekdays[date.getDay()] as Weekday;
	};

	public readonly GetHours = (date: Date = this.date): string => {
		return date.toTimeString().substring(0, 2);
	};

	public readonly GetMinutes = (date: Date = this.date): string => {
		return date.toTimeString().substring(3, 5);
	};

	public readonly GetSeconds = (date: Date = this.date): string => {
		return date.toTimeString().substring(6, 8);
	};

	public readonly GetTimezoneOffset = (date: Date = this.date): string => {
		const timezoneOffset: number = date.getTimezoneOffset();
		const offset: number = Math.abs(timezoneOffset);
		const offsetOperator: "+" | "-" = timezoneOffset < 0 ? "+" : "-";
		const offsetHours: number = Math.floor(offset / 60);

		return offsetOperator + offsetHours;
	};

	public readonly GetCurrentDate = (date: Date = this.date): CurrentDate => {
		const day: number = this.GetDay(date);
		const month_number: number = this.GetMonthIndex(date);
		const month: Month = this.GetMonth(date);
		const year: number = this.GetYear(date);

		const weekday: Weekday = this.GetWeekday(date);

		return { day, month_number, month, year, weekday };
	};

	public readonly GetCurrentTime = (date: Date = this.date): CurrentTime => {
		const hours: string = this.GetHours(date);
		const minutes: string = this.GetMinutes(date);
		const seconds: string = this.GetSeconds(date);
		const timezone: string = this.GetTimezoneOffset(date);

		return { hours, minutes, seconds, timezone };
	};

	public readonly Timestamp = (style: keyof typeof TimestampStyles, date: Date = this.date): string => {
		const currentTime = this.GetCurrentTime(date);
		const currentDate = this.GetCurrentDate(date);
		const timestampStyle = TimestampStyles[style] || "D";

		let str: string;

		switch (timestampStyle) {
			case "t":
				str = [currentTime.hours, currentTime.minutes].join(":");
				break;
			case "T":
				str = [currentTime.hours, currentTime.minutes, currentTime.seconds].join(":");
				break;
			case "d":
				str = [currentDate.day, currentDate.month_number + 1, currentDate.year].join("/");
				break;
			case "D":
				str = [currentDate.day, currentDate.month, currentDate.year].join(" ");
				break;
			case "f":
				str =
					[currentDate.day, currentDate.month, currentDate.year].join(" ") +
					" " +
					[currentTime.hours, currentTime.minutes].join(":");
				break;
			case "F":
				str =
					currentDate.weekday +
					", " +
					[currentDate.day, currentDate.month, currentDate.year].join(" ") +
					" " +
					[(currentTime.hours, currentTime.minutes)].join(":");
				break;
		}

		return str;
	};
}
