import { InputSystem, Callbacks, Window, MSDSyncCheckbox } from "./src/index.js";
import { MSDSyncSubtab } from "./src/menu/ui/subtab.js";

const input = new InputSystem();
const CallbackRegister = new Callbacks();
const subtab = new MSDSyncSubtab({
	name: "Subtab",
	window: new Window({ width: 280, height: 320 }),
});
const checkbox = new MSDSyncCheckbox({
	name: "MSDSync checkbox",
	window: new Window({ x: subtab.GetWindow().x + 10, y: subtab.GetWindow().y + 10 }),
});

CallbackRegister.on("Draw", () => {
	input.UpdateInputSystem();

	const font = Render.AddFont("Segoeui.ttf", 8, 200);

	subtab.RenderBox();
	checkbox.RenderBox();
	checkbox.HandleClick({ input });
});

CallbackRegister.RegisterCallbacks();
