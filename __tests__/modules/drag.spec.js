/// <reference path="../../typings/onetap.d.ts"/>

const Window = require("../../src/modules/Window.js").Window;
const Drag = require("../../src/modules/Drag.js").Drag;
const InputSystem = require("../../src/modules/InputSystem.js").InputSystem;

const window = new Window({ x: 100, y: 100, width: 100, height: 100 });
const input = new InputSystem();
const drag = new Drag();

const on_Draw = function () {
	input.UpdateInputSystem();
	drag.CreateDrag({ window: window, input: input });

	const x = window.GetX();
	const y = window.GetY();
	const width = window.GetWidth();
	const height = window.GetHeight();

	Render.FilledRect(x, y, width, height, [255, 255, 255, 255]);
};

Cheat.RegisterCallback("Draw", "on_Draw");
