const MIN_VIEWPORT_WIDTH = 1100;

const getViewportWidth = () => {
    return window.innerWidth;
}

export const isAppropriateViewport = () => {
    return getViewportWidth() > MIN_VIEWPORT_WIDTH;
}