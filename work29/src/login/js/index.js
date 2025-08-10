import { usersHandler } from "./mockServer";
import { setToken, getToken } from "../../feature/token-utils/tokenUtils";
import { passwordRegex, emailRegex } from "../../utils/regex";
import {
  loginInputValueState,
  loginValidState,
} from "../../states/loginFormState";
import { toggleSubmitBtn } from "../../utils/form/formUtils";
import { validateInputField } from "../../utils/form/validationUtils";

const submitBtn = document.querySelector(".submitBtn");

window.addEventListener("DOMContentLoaded", () => {
  const token = getToken("loginToken");
  if (token) {
    window.location.href = "../contents/index.html";
  }
});

const userMailInputElem = document.querySelector('input[name="mail"]');
userMailInputElem.addEventListener("keyup", () => {
  const invalidMailElem = document.querySelector(".invalidError.mail");
  const mailValue = userMailInputElem.value.trim();

  validateInputField(
    emailRegex,
    mailValue,
    invalidMailElem,
    "mail",
    loginValidState,
    loginInputValueState
  );

  toggleSubmitBtn(loginValidState, submitBtn);
});

const passwordInputElem = document.querySelector('input[name="password"]');
passwordInputElem.addEventListener("keyup", () => {
  const passwordValue = passwordInputElem.value.trim();
  loginInputValueState.password = passwordValue;
  const invalidElem = document.querySelector(".invalidError.password");

  validateInputField(
    passwordRegex,
    passwordValue,
    invalidElem,
    "password",
    loginValidState,
    loginInputValueState
  );

  toggleSubmitBtn(loginValidState, submitBtn);
});

submitBtn.addEventListener("click", async () => {
  const userInfo = await usersHandler(loginInputValueState);

  if (userInfo && userInfo.ok) {
    setToken("loginToken", userInfo.token);
    setToken("loginUserInfo", {
      mail: `${userInfo.mail}`,
      password: `${userInfo.password}`,
    });
    window.location.href = "../contents/index.html";
  } else {
    alert("ログインに失敗しました。");
    window.location.href = "./";
  }
});
