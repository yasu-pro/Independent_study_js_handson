import {
  forgotPasswordValidState,
  forgotPasswordInputValueState,
} from "../../states/forgotPasswordFormState.ts";
import { toggleSubmitBtn } from "../../utils/form/formUtils";
import { updateInputValue } from "../../utils/form/validationUtils.ts";
import { emailRegex } from "../../utils/regex.ts";
import { handleForgotPassword } from "./passwordReset";

const registerSubmitBtn = document.getElementById("js-submitBtn");

const mailInputElem = document.querySelector('input[name="mail"]');
mailInputElem.addEventListener("keyup", () => {
  const mailValue = mailInputElem.value.trim();
  const invalidElem = document.querySelector(".invalidError.mail");

  if (!emailRegex.test(mailValue)) {
    invalidElem.style.display = "block";
    forgotPasswordValidState.mail = false;
  } else {
    invalidElem.style.display = "none";
    forgotPasswordValidState.mail = true;
    updateInputValue(forgotPasswordInputValueState, "mail", mailValue);
  }

  toggleSubmitBtn(forgotPasswordValidState, registerSubmitBtn);
});

const isRegisteredEmail = () => {
  const registerUserInfoServer = localStorage.getItem("registerUser");

  if (!registerUserInfoServer) return false;

  const registerUserJson = JSON.parse(registerUserInfoServer);

  if (registerUserJson.mail === forgotPasswordInputValueState.mail) return true;

  return false;
};

registerSubmitBtn.addEventListener("click", () => {
  if (isRegisteredEmail()) {
    const forgotPasswordForUrl = handleForgotPassword();

    window.location.href = forgotPasswordForUrl;
    return;
  }

  alert("一致するアカウントが見つかりませんでした");
});
