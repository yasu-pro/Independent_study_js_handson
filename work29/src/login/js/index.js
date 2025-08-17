import { fetchLoginAndUserInfo } from "../../server/login/fetchLoginAndUserInfo";
import { setToken } from "../../utils/tokenUtils.ts";
import { passwordRegex, emailRegex } from "../../utils/regex";
import {
  loginInputValueState,
  loginValidState,
} from "../../states/loginFormState";
import { toggleSubmitBtn } from "../../utils/form/formUtils";
import { validateInputField } from "../../utils/form/validationUtils";
import { fetchCurrentUser } from "../../server/login/fetchCurrentUser";

const submitBtn = document.querySelector(".submitBtn");

window.addEventListener("DOMContentLoaded", async () => {
  const result = await fetchCurrentUser();
  if (!result.ok) {
    console.error(result.message);

    return;
  }
  window.location.href = "../contents/index.html";
});

const userMailInputElem = document.querySelector('input[name="mail"]');
userMailInputElem.addEventListener("blur", () => {
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
passwordInputElem.addEventListener("blur", () => {
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
  const userInfo = await fetchLoginAndUserInfo(loginInputValueState);

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
