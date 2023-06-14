/// <reference path="./typings/onetap.d.ts"/>

import { ChimeraCheckbox } from "./src/menu/ui/elements/Checkbox.js";
import { Window } from "./src/modules/Window.js";

const window = new Window({ x: 100, y: 100, width: 20, height: 20 });
const checkbox = new ChimeraCheckbox({ name: "Hello world", window });
const checkbox2 = new ChimeraCheckbox({ name: "Hello world", window });
const checkbox3 = new ChimeraCheckbox({ name: "Hello world", window });

type Element<N extends string> = ChimeraCheckbox<N>;

class Subtab {
	private readonly name: string;
	private readonly elements: Element<string>[] = [];
	private readonly window: Window;

	constructor(options: { name: string; elements: Element<any>[]; window: Window }) {
		this.name = options.name;
		this.elements = options.elements;
		this.window = options.window;
	}

	public readonly GetWindow = (): Window => {
		return this.window;
	};

	public readonly RenderBox = () => {
		const { x, y, width, height } = this.window.toJSON();

		Render.FilledRect(x, y, width, height, [18, 19, 22, 255]);
		Render.Rect(x, y, width, height, [57, 58, 58, 178]);
	};

	public readonly RenderElements = (options: { elementTitleFont: number; elementSubFont?: number }) => {
		const { x, y } = this.window.toJSON();

		this.elements.forEach((element, i) => {
			if (element.GetWindow().GetX() !== x + 5) {
				element.GetWindow().SetX(x + 5);
			}

			if (element.GetWindow().GetY() !== y + 5 + i * (element.GetWindow().GetHeight() + 5)) {
				element.GetWindow().SetY(y + 5 + i * (element.GetWindow().GetHeight() + 5));
			}

			element.RenderBox();
			element.RenderText({ font: options.elementTitleFont });
		});
	};
}

const subtabWindow = new Window({ x: 100, y: 100, width: 150, height: 210 });
const subtab = new Subtab({ name: "Hello World", elements: [checkbox, checkbox2, checkbox3], window: subtabWindow });

const on_Draw = () => {
	const font = Render.AddFont("Verdana.ttf", 7, 400);

	subtab.RenderBox();
	subtab.RenderElements({ elementTitleFont: font });
};

Cheat.RegisterCallback("Draw", "on_Draw");
