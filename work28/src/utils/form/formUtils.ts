export const toggleSubmitBtn = (
  validState: Record<string, boolean>,
  submitBtn: HTMLButtonElement
) => {
  const allValid = Object.values(validState).every(
    (validValue) => validValue === true
  );

  submitBtn.disabled = !allValid;
};
