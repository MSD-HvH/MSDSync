/// <reference path="../typings/onetap.d.ts"/>

const Window = require("../src/modules/Window.js").Window;
const window = new Window({ x: 100, y: 100, width: 100, height: 100 });

const on_Draw = function () {
	const x = window.GetX();
	const y = window.GetY();
	const width = window.GetWidth();
	const height = window.GetHeight();

	Render.FilledRect(x, y, width, height, [255, 255, 255, 255]);
};

const to_Print = (function () {
	Cheat.Print("\n---------- Window Tests ---------- \n\n");

	const toPrint = [
		"Current X position: " + window.GetX(),
		"Current Y position: " + window.GetY(),
		"Current Width: " + window.GetWidth(),
		"Current Height: " + window.GetHeight(),
	];

	Cheat.Print(toPrint.join("\n"));

	Cheat.Print("\n\n---------- Window Tests End ---------- \n\n");
})();

Cheat.RegisterCallback("Draw", "on_Draw");
