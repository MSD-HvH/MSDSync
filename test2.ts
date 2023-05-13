import { Window, InputSystem, Drag } from "src/modules/index.js";

const input = new InputSystem();

class Subtab {
	public readonly title: string;
	public readonly window: Window;
	public readonly drag: Drag;

	public readonly elements: any[] = [];
	public readonly checkboxes: any[] = [];

	constructor(options: { window: Window } & { title: string } & { drag: Drag }) {
		this.title = options.title;

		this.window = options.window;

		this.drag = options.drag;
	}

	public readonly Drag = () => {
		this.drag.CreateDrag({ window: this.window, input: input });

		return this;
	};

	public readonly Render = () => {
		const { x, y, width, height } = this.window.toJSON();
		const font = Render.GetFont("Verdana.ttf", 12, true);

		Render.FilledRect(x, y, width, height, [26, 26, 26, 255]);
		Render.Rect(x, y, width, height, [57, 58, 58, 178]);
		Render.String(x + 3, y + 3, 0, this.title, [255, 255, 255, 255], font);
	};
}

class Menu {
	public readonly window: Window;

	public readonly subtabs: Subtab[] = [];
	public readonly inner_subtabs: Subtab[] = [];

	constructor(options: { window: Window }) {
		this.window = options.window;
	}

	public readonly RenderBackground = () => {
		Render.FilledRect(
			this.window.GetX(),
			this.window.GetY(),
			this.window.GetWidth(),
			this.window.GetHeight(),
			[18, 19, 22, 255]
		);
	};

	public readonly LogicSubtabs = () => {
		this.subtabs.forEach((subtab, i) => {
			const { x: menu_x, y: menu_y } = this.window.toJSON();
			const { x: subtab_x, y: subtab_y, width: subtab_width, height: subtab_height } = subtab.window.toJSON();

			if (
				!subtab.window.IsInBouds({
					x: menu_x + 5,
					y: menu_y + 5 + i * (subtab_height + 2),
					width: subtab_width,
					height: 3,
				}) &&
				!input.IsDown(0x01)
			) {
				this.inner_subtabs.splice(this.inner_subtabs.indexOf(subtab), 1);
			}

			if (
				subtab.window.IsInBouds({
					x: menu_x + 5,
					y: menu_y + 5 + i * (subtab_height + 2),
					width: subtab_width,
					height: 3,
				})
			) {
				Render.FilledRect(
					menu_x + 5,
					menu_y + 5 + i * (subtab_height + 2),
					subtab_width,
					3,
					[255, 255, 255, 75]
				);
				if (!input.IsDown(0x01)) {
					if (this.inner_subtabs.indexOf(subtab) != -1) return;

					this.inner_subtabs.splice(i, 0, subtab);
				}
			}

			if (this.inner_subtabs.indexOf(subtab) != -1) {
				if (subtab_x !== menu_x + 5) {
					subtab.window.SetX(menu_x + 5);
				}

				if (subtab_y !== menu_y + 5 + this.inner_subtabs.indexOf(subtab) * (subtab_height + 5)) {
					subtab.window.SetY(menu_y + 5 + this.inner_subtabs.indexOf(subtab) * (subtab_height + 5));
				}
			}
		});
	};

	public readonly AddSubtab = (subtab: Subtab) => {
		if (this.subtabs.some((s) => s === subtab)) return;

		this.subtabs.push(subtab);
		this.inner_subtabs.push(subtab);
	};
}

const menu = new Menu({ window: new Window({ x: 100, y: 100, width: 150, height: 150 }) });

const subtab = new Subtab({
	window: new Window({ x: 100, y: 100, width: 80, height: 40 }),
	title: "First",
	drag: new Drag(),
});

const subtab2 = new Subtab({
	window: new Window({ x: 100, y: 100, width: 80, height: 40 }),
	title: "Second",
	drag: new Drag(),
});

menu.AddSubtab(subtab);
menu.AddSubtab(subtab2);

const on_Draw = () => {
	input.UpdateInputSystem();

	menu.RenderBackground();
	menu.LogicSubtabs();

	subtab.Drag().Render();
	subtab2.Drag().Render();
};

Cheat.RegisterCallback("Draw", "on_Draw");
