export const updateValidState = (
  state: Record<string, boolean>,
  key: string,
  isValid: boolean
) => {
  state[key] = isValid;
};

