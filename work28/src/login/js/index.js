import { usersHandler } from "./mockServer";
import { setToken, getToken } from "../../feature/token-utils/tokenUtils";
import { passwordRegex } from "../../utils/regex";

const submitBtn = document.querySelector(".submitBtn");

const validState = {
  nameOrMail: false,
  password: false,
};

const inputValueState = {
  id: "", // 名前かパスワードが入る
  password: "",
};

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
    validState.nameOrMail = false;
  } else {
    invalidElem.style.display = "none";
    validState.nameOrMail = true;
    inputValueState.id = userNameOrEmailValue;
  }

  toggleSubmit();
});

const passwordInputElem = document.querySelector('input[name="password"]');
passwordInputElem.addEventListener("keyup", () => {
  const passwordValue = passwordInputElem.value;
  const invalidElem = document.querySelector(".invalidError.password");

  if (!passwordRegex.test(passwordValue)) {
    invalidElem.style.display = "block";
    validState.password = false;
  } else {
    invalidElem.style.display = "none";
    validState.password = true;
    inputValueState.password = passwordValue;
  }

  toggleSubmit();
});

const toggleSubmit = () => {
  const allValid = Object.values(validState).every(
    (validValue) => validValue === true
  );

  submitBtn.disabled = !allValid;
};

submitBtn.addEventListener("click", async () => {
  const token = await usersHandler(inputValueState);

  if (token && token.ok) {
    setToken("loginToken", token.token);
    window.location.href = "../contents/index.html";
  } else {
    alert("ログインに失敗しました。");
    window.location.href = "./";
  }
});
