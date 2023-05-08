export const Lerp = <A extends number, B extends number, P extends number>(a: A, b: B, percentage: P) => {
    let delta = (1 - percentage) * a + percentage * b;

    if (b == 0 && delta < 0.01 && delta > -0.01) {
        delta = 0;
    } else if (b == 1 && delta < 1.01 && delta > 0.99) {
        delta = 1;
    }

    return delta;
};

export const Clamp = <V extends number, F extends number, S extends number>(value: V, min: F, max: S) => {
    return Math.min(Math.max(min, value), max);
};

export const HSVtoRGB = (h: number, s: number, v: number) => {
    let r: number, g: number, b: number, i: number, f: number, p: number, q: number, t: number;

    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0:
            (r = v), (g = t), (b = p);
            break;
        case 1:
            (r = q), (g = v), (b = p);
            break;
        case 2:
            (r = p), (g = v), (b = t);
            break;
        case 3:
            (r = p), (g = q), (b = v);
            break;
        case 4:
            (r = t), (g = p), (b = v);
            break;
        case 5:
            (r = v), (g = p), (b = q);
            break;
    }

    // @ts-ignore
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
};
