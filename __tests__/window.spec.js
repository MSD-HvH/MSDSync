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
	const toPrint = [
		"Current X position: " + window.GetX(),
		"Current Y position: " + window.GetY(),
		"Current Width: " + window.GetWidth(),
		"Current Height: " + window.GetHeight(),
	];

	toPrint.forEach(function (value) {
		Cheat.Print(value + "\n");
	});
})();

Cheat.RegisterCallback("Draw", "on_Draw");
