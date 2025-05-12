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
