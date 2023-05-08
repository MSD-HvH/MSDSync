import { Lerp } from "./index.js";

export interface EasingItem {
    /**
     * Числовой значение элемента
     *
     * @type {number}
     */
    value: number;

    /**
     * RGBA значение элемента
     *
     * @type {[number, number, number, number]}
     */
    color: [number, number, number, number];
}

export interface EasingsStructure {
    list: { [key: string]: EasingItem };

    /**
     * Функция для создания элемента easing
     *
     * @param {string} name Имя элемента
     * @param {{start_value?: number; color?: [number, number, number, number]}} options Данные элемента
     */
    CreateNew: (name: string, options: { start_value?: number; color?: [number, number, number, number] }) => EasingItem;

    /**
     * Функция для анимации числового значения элемента
     *
     * @param {number} name Имя элемента
     * @param {number} final_value Конечное значение
     * @param {number} time Время
     * @returns {number}
     */
    UpdateValue: (name: string, final_value: number, time: number) => number | undefined;

    /**
     * Функция для анимации цвета элемента
     *
     * @param name Имя элемента
     * @param final_color Конечный цвет
     * @param time Время
     * @returns {[number, number, number, number]}
     */
    UpdateColor: (
        name: string,
        final_color: [number, number, number, number],
        time: number
    ) => [number, number, number, number] | undefined;

    /**
     * Получить значение и цвет элемента
     *
     * @param {string} name Имя элемента
     * @returns {EasingItem}
     */
    GetEasing: (name: string) => EasingItem | undefined;
}

/**
 * Класс для с анимациями
 *
 * ---
 * @example
 * ```ts
 * const test = new Easings();
 *
 * test.CreateNew("test", { start_value: 0, color: [255, 255, 255, 255] });
 *
 * const on_Draw = function () {
 *     const color = test.UpdateColor("test", UI.IsMenuOpen() ? [242, 99, 97, 255] : [116, 242, 97, 255], 0.02);
 *     const yOffset = test.UpdateValue("test", UI.IsMenuOpen() ? 1 : 0, 0.02);
 *
 *     Render.FilledRect(100, 100 * yOffset, 100, 100, color);
 * };
 *
 * Cheat.RegisterCallback("Draw", "on_Draw");
 * ```
 * ---
 *
 * @class
 * @implements {EasingsStructure}
 * @see https://easings.net/
 */
export class Easings implements EasingsStructure {
    public readonly list: { [key: string]: EasingItem } = {};

    constructor() {}

    public readonly CreateNew = (name: string, options: { start_value?: number; color?: [number, number, number, number] }): EasingItem => {
        const start_value = options?.start_value || 0;
        const color = options?.color || [255, 255, 255, 255];

        if (!this.list[name]) this.list[name] = { value: start_value, color: color };

        return this.list[name] as EasingItem;
    };

    public readonly UpdateValue = (name: string, final_value: number, time?: number): number | undefined => {
        if (!this.list[name]) return undefined;

        return (this.list[name]!.value = Lerp(this.list[name]!.value, final_value, time || Globals.Frametime() * 12));
    };

    public readonly UpdateColor = (
        name: string,
        final_color: [number, number, number, number],
        time?: number
    ): [number, number, number, number] | undefined => {
        if (!this.list[name]!) return undefined;

        this.list[name]!.color[0] = Lerp(this.list[name]!.color[0], final_color[0], time || Globals.Frametime() * 12);
        this.list[name]!.color[1] = Lerp(this.list[name]!.color[1], final_color[1], time || Globals.Frametime() * 12);
        this.list[name]!.color[2] = Lerp(this.list[name]!.color[2], final_color[2], time || Globals.Frametime() * 12);
        this.list[name]!.color[3] = Lerp(this.list[name]!.color[3], final_color[3], time || Globals.Frametime() * 12);

        return this.list[name]!.color;
    };

    public readonly GetEasing = <N extends string>(name: N): EasingItem => {
        return this.list[name]!;
    };
}
