/// <reference path="../typings/onetap.d.ts"/>

const TimeFormat = require("../src/modules/TimeFormat.js").TimeFormat;
const timeFormatter = new TimeFormat();

const day = timeFormatter.GetDay();
const month_number = timeFormatter.GetMonthIndex();
const month = timeFormatter.GetMonth();
const year = timeFormatter.GetYear();

const weekday = timeFormatter.GetWeekday();

const hours = timeFormatter.GetHours();
const minutes = timeFormatter.GetMinutes();
const seconds = timeFormatter.GetSeconds();
const timezone = timeFormatter.GetTimezoneOffset();

const currentDate = timeFormatter.GetCurrentDate();
const currentTime = timeFormatter.GetCurrentTime();

const to_Print = (function () {
	Cheat.Print("\n---------- Time Tests ---------- \n\n");

	const toPrint = [
		"Current day: " + day,
		"Current month_number: " + (month_number + 1),
		"Current month: " + month,
		"Current year: " + year,
		"Current weekday: " + weekday + "\n",
		"Current hours: " + hours,
		"Current minutes: " + minutes,
		"Current seconds: " + seconds,
		"Current timezone: " + timezone + "\n",
		"Current date: " + [currentDate.day, currentDate.month, currentDate.year, currentDate.weekday].join(" "),
		"Current time: " + [currentTime.hours, currentTime.minutes, currentTime.seconds].join(":"),
	];

	Cheat.Print(toPrint.join("\n"));

	Cheat.Print("\n\n---------- Time Tests End ---------- \n\n");
})();
