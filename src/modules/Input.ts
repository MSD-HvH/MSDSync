export interface InputSystemOptions {
    /**
     * Окно
     *
     * @type {{ x?: number; y?: number; width?: number; height?: number }}
     */
    window: { x: number; y: number; width: number; height: number };
}

export interface InputSystemStructure {
    /**
     * Последнее время обновления
     *
     * @type {number}
     */
    lastTime: number;

    /**
     * Последние нажатые клавиши
     *
     * @type {boolean[]}
     */
    lastPressedKeys: boolean[];

    /**
     * Нажатые клавиши
     *
     * @type {boolean[]}
     */
    pressedKeys: boolean[];

    /**
     * Позиция мышки
     *
     * @type {[number, number]}
     */
    mousePos: [number, number];

    /**
     * Дельта мышки
     *
     * @type {[number, number]}
     */
    mouseDelta: [number, number];

    /**
     * Обновляет кнопки и позицию мышки
     *
     * @returns {InputSystem}
     */
    UpdateInputSystem: () => InputSystem;

    /**
     * Получить координату мышки по координате X
     *
     * @returns {number} Позиция мышки по координате X
     */
    GetMouseX: () => number;

    /**
     * Получить координату мышки по координате Y
     *
     * @returns {number} Позиция мышки по координате Y
     */
    GetMouseY: () => number;

    /**
     * Получить дельту мышки по координате X
     *
     * @returns {number} Дельта мышки по координате X
     */
    GetDeltaX: () => number;

    /**
     * Получить дельту мышки по координате Y
     *
     * @returns {number} Дельта мышки по координате Y
     */
    GetDeltaY: () => number;

    /**
     * Была ли нажата кнопка
     *
     * @returns {boolean}
     */
    IsPressed: <K extends number>(key: K) => boolean;

    /**
     * Зажата ли кнопка
     *
     * @returns {boolean}
     */
    IsDown: <K extends number>(key: K) => boolean;

    /**
     * Находится ли мышка в пределех определённой области
     *
     * @returns {boolean}
     */
    IsInBounds: (options?: { x?: number; y?: number; width?: number; height?: number }) => boolean;

    /**
     * Перемещается ли элемент сейчас
     *
     * @returns {boolean}
     */
    IsDragging: (options?: { x?: number; y?: number; width?: number; height?: number }) => boolean;

    /**
     * Происходит ли взаимодействие с элементом сейчас
     *
     * @returns {boolean}
     */
    IsInteracting: () => boolean;
}

/**
 * Класс для системы ввода
 *
 * @class
 * @implements {InputSystemStructure}
 */
export class InputSystem implements InputSystemStructure, InputSystemOptions {
    public readonly window: { x: number; y: number; width: number; height: number };

    public lastTime: number = 0;

    public mousePos: [number, number] = [0, 0];
    public mouseDelta: [number, number] = [0, 0];

    public lastPressedKeys: boolean[] = [];
    public pressedKeys: boolean[] = [];

    constructor(options: InputSystemOptions) {
        const { window } = options;

        this.window = window;
    }

    public readonly UpdateInputSystem = (): InputSystem => {
        const realtime = Globals.Realtime();

        if (realtime === this.lastTime) return this;

        this.lastTime = realtime;

        for (let i = 0; i < 0xff; ++i) {
            this.lastPressedKeys[i] = this.pressedKeys[i] as boolean;
            this.pressedKeys[i] = Input.IsKeyPressed(i);
        }

        const newMousePos = Input.GetCursorPosition();

        this.mouseDelta[0] = newMousePos[0] - this.mousePos[0];
        this.mouseDelta[1] = newMousePos[1] - this.mousePos[1];

        this.mousePos = newMousePos;

        return this;
    };

    public readonly GetMouseX = (): number => {
        return this.mousePos[0];
    };

    public readonly GetMouseY = (): number => {
        return this.mousePos[1];
    };

    public readonly GetDeltaX = (): number => {
        return this.mouseDelta[0];
    };

    public readonly GetDeltaY = (): number => {
        return this.mouseDelta[1];
    };

    public readonly IsPressed = <K extends number>(key: K): boolean => {
        return !this.lastPressedKeys[key] && (this.pressedKeys[key] as boolean);
    };

    public readonly IsDown = <K extends number>(key: K): boolean => {
        return this.pressedKeys[key] as boolean;
    };

    public readonly IsInBounds = (options?: { x?: number; y?: number; width?: number; height?: number }): boolean => {
        const [mouse_x, mouse_y] = this.mousePos;
        const x = options?.x || this.window.x;
        const y = options?.y || this.window.y;
        const width = options?.width || this.window.width;
        const height = options?.height || this.window.height;

        return mouse_x >= x && mouse_y >= y && mouse_x <= x + width && mouse_y <= y + height;
    };

    public readonly IsDragging = (options?: { x?: number; y?: number; width?: number; height?: number }): boolean => {
        return this.IsDown(0x01) && this.IsInBounds(options);
    };

    public readonly IsInteracting = (): boolean => {
        return this.IsPressed(0x01) && this.IsInBounds();
    };
}
