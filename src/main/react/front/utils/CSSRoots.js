import { IntToRGBA } from "./RGBAToIntConverter";

const setRootVariable = (css_variable, value) => {
    document.documentElement.style.setProperty(css_variable, value);
}

const getRootVariable = (css_variable) => {
    return window.getComputedStyle(document.documentElement).getPropertyValue(css_variable);
}

export const setAppearance = (color) => {
    const { r, g, b, a } = IntToRGBA(color);
    setRootVariable("--accent-color", `rgba(${r},${g},${b},${a})`);
}

export const getAccentColor = () => {
    return getRootVariable("--accent-color");
}
