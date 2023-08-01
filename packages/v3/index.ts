(function CreateErrorHandler(fnCallback) {
	Duktape.errCreate = function (e) {
		if (!(e instanceof Error) || "thrown" in e || !Object.isExtensible(e)) return e;
		e = fnCallback(e);
		return e;
	};
})(function (e: any) {
	e.time = new Date();
	Cheat.Print("Found error in the script code, please send next message to the developer: \n");
	Cheat.PrintColor([44, 3, 252, 255], "Information for the developer: error at line " + e.lineNumber + "\n\n");
	return e;
});

import {
	InputSystem,
	MSDSyncCheckbox,
	MSDSyncDropdown,
	MSDSyncMultiDropdown,
	MSDSyncSlider,
	Window,
	Callbacks,
} from "./src/index.js";

const input = new InputSystem();
const checkbox = new MSDSyncCheckbox({ name: "MSDSync Checkbox", window: new Window({ x: 100, y: 100 }) });
const dropdown = new MSDSyncDropdown({
	name: "MSDSync Dropdown",
	elements: ["Hello", "World"],
	window: new Window({ x: 100, y: 200, width: 140 }),
});
const multiDropdown = new MSDSyncMultiDropdown({
	name: "MSDSync MultiDropdown",
	elements: ["Hello", "World"],
	window: new Window({ x: 100, y: 300, width: 140 }),
});
const slider = new MSDSyncSlider({
	name: "MSDSync Slider",
	min: 0,
	max: 100,
	window: new Window({ x: 100, y: 400, width: 140 }),
});
const CallbackRegister = new Callbacks();

CallbackRegister.on("Draw", () => {
	input.UpdateInputSystem();

	const font = Render.AddFont("Segoeui.ttf", 8, 200);

	checkbox.RenderBox();
	checkbox.RenderText({ font });

	dropdown.RenderBox();
	dropdown.RenderElements({ font });
	dropdown.RenderText({ font });

	multiDropdown.RenderBox();
	multiDropdown.RenderElements({ font });
	multiDropdown.RenderText({ font });

	slider.RenderBox();
	slider.RenderText({ font });

	checkbox.HandleClick({ input });
	dropdown.HandleClick({ input });
	multiDropdown.HandleClick({ input });
	slider.HandleClick({ input });
});

CallbackRegister.RegisterCallbacks();
