export function getBaseUrl(_window: Window) {
    const url = _window.location.href;
    const urlParts = url.split("/");
    return urlParts[0] + "//" + urlParts[2];
}