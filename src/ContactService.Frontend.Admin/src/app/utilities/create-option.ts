export function createHTMLOption(options: { textContent: string, value: string }) {
    let option = document.createElement("option");
    option.textContent = options.textContent;
    option.value = options.value;
    return option;
}