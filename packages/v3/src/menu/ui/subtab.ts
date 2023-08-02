import type { Window } from "../../modules/window.js";
import { BackgroundMainColor, ElementOutline } from "./index.js";

export class MSDSyncSubtab {
	private readonly window!: Window;
	private readonly name!: string;

	constructor({ name, window }: { name: string; window: Window }) {
		this.name = name;
		this.window = window;
	}

	public readonly GetWindow = (): Window => {
		return this.window;
	};

	public readonly RenderBox = () => {
		const { x, y, width, height } = this.window.toJSON();

		Render.FilledRect(x, y, width, height, BackgroundMainColor);
		Render.Rect(x, y, width, height, ElementOutline);

		return this;
	};
}
