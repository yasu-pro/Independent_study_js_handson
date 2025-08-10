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

export const validateInputField = (
  regex: RegExp,
  value: string,
  elem: HTMLElement,
  key: string,
  validState: Record<string, boolean>,
  valueState: Record<string, string>
) => {
  if (!regex.test(value)) {
    toggleErrorDisplay(elem, true);
    updateValidState(validState, key, false);
  } else {
    toggleErrorDisplay(elem, false);
    updateValidState(validState, key, true);
    updateInputValue(valueState, key, value);
  }
};
