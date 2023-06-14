/// <reference path="../../typings/onetap.d.ts"/>

const MultiDropdown = require("../../src/menu/ui/elements/MultiDropdown.js").ChimeraMultiDropdown;
const Window = require("../../src/modules/Window.js").Window;
const InputSystem = require("../../src/modules/InputSystem.js").InputSystem;

const input = new InputSystem();
const window = new Window({ x: 100, y: 100, width: 140, height: 20 });
const test = new MultiDropdown({
	name: "Hello world",
	elements: ["Hello", "World", "Get", "Good", "Get", "MSDSync"],
	window: window,
});

const updateValues = function () {
	input.UpdateInputSystem();
};

const on_Draw = function () {
	const titleFont = Render.AddFont("Verdana.ttf", 7, 400);
	const elementsFont = Render.AddFont("Verdana.ttf", 7, 400);

	test.RenderBox();
	test.RenderText({ font: titleFont });
	test.RenderElements({ font: elementsFont });
	test.HandleClick({ input: input });
};

Cheat.RegisterCallback("Draw", "updateValues");
Cheat.RegisterCallback("Draw", "on_Draw");
