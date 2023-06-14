/// <reference path="../../typings/onetap.d.ts"/>

const Checkbox = require("../../src/menu/ui/elements/Checkbox.js").ChimeraCheckbox;
const Window = require("../../src/modules/Window.js").Window;
const InputSystem = require("../../src/modules/InputSystem.js").InputSystem;

const input = new InputSystem();
const window = new Window({ x: 100, y: 100, width: 20, height: 20 });
const test = new Checkbox({ name: "Hello world", window: window });

const updateValues = function () {
	input.UpdateInputSystem();
};

const on_Draw = function () {
	const font = Render.AddFont("Verdanab.ttf", 7, 400);

	test.RenderBox();
	test.RenderText({ font: font });
	test.HandleClick({ input: input });
};

Cheat.RegisterCallback("Draw", "updateValues");
Cheat.RegisterCallback("Draw", "on_Draw");
