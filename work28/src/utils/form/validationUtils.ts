export const updateValidState = (
  state: Record<string, boolean>,
  key: string,
  isValid: boolean
) => {
  state[key] = isValid;
};

export const updateInputValue = (
  state: Record<string, string>,
  key: string,
  value: string
) => {
  state[key] = value;
};

export const toggleErrorDisplay = (elem: HTMLElement, show: boolean) => {
  elem.style.display = show ? "block" : "none";
};
