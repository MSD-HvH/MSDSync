import { Callbacks } from "./src/index.js";

const CallbackRegister = new Callbacks();

CallbackRegister.on("Draw", () => {
	Cheat.Print("Hello world \n");
});

CallbackRegister.RegisterCallbacks();
