import {
  forgotPasswordValidState,
  forgotPasswordInputValueState,
} from "../../states/forgotPasswordFormState.ts";
import { toggleSubmitBtn } from "../../utils/form/formUtils";
import { validateInputField } from "../../utils/form/validationUtils.ts";
import { emailRegex } from "../../utils/regex.ts";
import { passwordResetToken } from "../../server/forgot-password/passwordResetToken.ts";

const registerSubmitBtn = document.getElementById("js-submitBtn");

const mailInputElem = document.querySelector('input[name="mail"]');
mailInputElem.addEventListener("blur", () => {
  const mailValue = mailInputElem.value.trim();
  forgotPasswordInputValueState.mail = mailValue;
  const invalidElem = document.querySelector(".invalidError.mail");

  validateInputField(
    emailRegex,
    mailValue,
    invalidElem,
    "mail",
    forgotPasswordValidState,
    forgotPasswordInputValueState
  );

  toggleSubmitBtn(forgotPasswordValidState, registerSubmitBtn);
});

registerSubmitBtn.addEventListener("click", async () => {
  const isValid = forgotPasswordInputValueState.mail;

  if (!isValid) {
    alert("入力内容をもう一度ご確認ください");
  }

  const inputMail = forgotPasswordInputValueState.mail;
  const result = await passwordResetToken(inputMail);

  if (!result.ok) {
    alert(result.message);
    return;
  }

  window.location.href = `../register/password/index.html?token=${result.token}`;
  return;
});
