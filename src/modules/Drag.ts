import { InputSystem, Lerp } from "src/modules/index.js";

export interface DragOptions {
    /**
     * Окно
     *
     * @type {{ x: number; y: number; width: number; height: number }}
     */
    window: { x: number; y: number; width: number; height: number };

    /**
     * Система для работы с перемещением
     *
     * @type {InputSystem}
     */
    input: InputSystem;
}

export interface DragStructure {
    /**
     * Перемещается ли элемент сейчас
     *
     * @type {boolean}
     */
    is_dragging: boolean;

    /**
     * Кешированная позиция перемещения
     *
     * @type {[number, number]}
     */
    drag_position: [number, number];

    /**
     * Анимация обводки
     *
     * @type {number}
     */
    outline_alpha: number;

    /**
     * Функция для того чтобы элемент перемещался
     *
     * @returns {Drag}
     */
    Drag: () => Drag;

    /**
     * Функция для рендера обводки
     *
     * @param {{color: [number, number, number, number]; radius?: number}} options Настройки для обводки
     * @returns {Drag}
     */
    RenderOutline: (options: { color: [number, number, number, number]; radius?: number }) => Drag;
}

/**
 * Класс для перемещения
 *
 * @class
 * @implements {DragStructure}
 */
export class Drag implements DragOptions, DragStructure {
    public is_dragging: boolean = false;
    public drag_position: [number, number] = [0, 0];

    public outline_alpha: number = 0;

    public readonly window: { x: number; y: number; width: number; height: number };
    public readonly input: InputSystem;

    constructor(options: DragOptions) {
        const { window, input } = options;

        this.window = window;
        this.input = input;
    }

    public readonly Drag = (options?: { x?: number; y?: number; width?: number; height?: number }): Drag => {
        const [x, y] = [this.window.x, this.window.y];
        const [mouse_x, mouse_y] = this.input.mousePos;
        const { IsDragging, IsDown } = this.input;

        if (IsDragging(options) && !this.is_dragging) {
            this.drag_position = [x - mouse_x, y - mouse_y];
            this.is_dragging = true;
        }

        if (!IsDown(0x01)) this.is_dragging = false;

        if (UI.IsMenuOpen() && this.is_dragging) {
            this.window.x = mouse_x + this.drag_position[0];
            this.window.y = mouse_y + this.drag_position[1];
        }

        return this;
    };

    public readonly RenderOutline = (options?: {
        color?: [number, number, number, number];
        radius?: number;
        x?: number;
        y?: number;
        width?: number;
        height?: number;
    }): Drag => {
        if (!UI.IsMenuOpen()) return this;

        const { IsInBounds, IsDown } = this.input;
        const color = options?.color || [255, 255, 255, 110];
        const radius = options?.radius || 5;
        const x = options?.x || this.window.x;
        const y = options?.y || this.window.y;
        const w = options?.width || this.window.width;
        const h = options?.height || this.window.height;
        const [r, g, b, a] = color;

        this.outline_alpha = Lerp(this.outline_alpha, IsInBounds() && !IsDown(0x01) ? 1 : 0, Globals.Frametime() * 12);

        Render.Rect(x - radius, y - radius, w + radius * 2, h + radius * 2, [r, g, b, a * this.outline_alpha]);

        return this;
    };
}
