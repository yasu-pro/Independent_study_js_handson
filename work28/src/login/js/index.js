import { usersHandler } from "./mockServer";
import { setToken, getToken } from "../../feature/token-utils/tokenUtils";
import { passwordRegex } from "../../utils/regex";
import {
  loginInputValueState,
  loginValidState,
} from "../../states/loginFormState";
import { toggleSubmitBtn } from "../../utils/form/formUtils";

const submitBtn = document.querySelector(".submitBtn");

window.addEventListener("DOMContentLoaded", () => {
  const token = getToken("token");
  if (token) {
    window.location.href = "../contents/index.html";
  }
});

const userNameOrEmailInputElem = document.querySelector(
  'input[name="userNameOrEmail"]'
);
userNameOrEmailInputElem.addEventListener("blur", () => {
  const invalidElem = document.querySelector(".invalidError.nameOrEmail");
  const userNameOrEmailValue = userNameOrEmailInputElem.value;

  if (userNameOrEmailInputElem.value.length === 0) {
    invalidElem.style.display = "block";
    loginValidState.nameOrMail = false;
  } else {
    invalidElem.style.display = "none";
    loginValidState.nameOrMail = true;
    loginInputValueState.id = userNameOrEmailValue;
  }

  toggleSubmitBtn(loginValidState, submitBtn);
});

const passwordInputElem = document.querySelector('input[name="password"]');
passwordInputElem.addEventListener("keyup", () => {
  const passwordValue = passwordInputElem.value;
  const invalidElem = document.querySelector(".invalidError.password");

  if (!passwordRegex.test(passwordValue)) {
    invalidElem.style.display = "block";
    loginValidState.password = false;
  } else {
    invalidElem.style.display = "none";
    loginValidState.password = true;
    loginInputValueState.password = passwordValue;
  }

  toggleSubmitBtn(loginValidState, submitBtn);
});

submitBtn.addEventListener("click", async () => {
  const token = await usersHandler(loginInputValueState);

  if (token && token.ok) {
    setToken("loginToken", token.token);
    window.location.href = "../contents/index.html";
  } else {
    alert("ログインに失敗しました。");
    window.location.href = "./";
  }
});
