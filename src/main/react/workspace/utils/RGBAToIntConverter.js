export const RGBAToInt = (r, g, b, a) => {
    return (a << 24) + (r << 16) + (g << 8) + (b);
}

export const IntToRGBA = (int) => {
    const a = (int >> 24) & 255;
    const r = (int >> 16) & 255; 
    const g = (int >> 8) & 255; 
    const b = (int >> 0) & 255; 

    return {r, g, b, a};
}