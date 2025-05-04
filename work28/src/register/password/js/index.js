import { reissuePassword } from "./ReissuePassword";
import { reissueToken } from "./ReissuePassword";

const registerSubmitBtn = document.getElementById("js-submitBtn");

const validState = {
  password: false,
  confirmPassword: false,
};

const inputValueState = {
  password: "",
  confirmPassword: "",
};

window.addEventListener("DOMContentLoaded", () => {
  // urlからtokenのパラメーター取得
  const extractTokenFromUrl = new URLSearchParams(document.location.search);
  const tokenFromUrl = extractTokenFromUrl.get("token");
  console.log("tokenFromUrl", tokenFromUrl);

  // パラメータから取得したトークンとローカルストレージにあるトークンが一致するかどうか
  const resetPasswordToken = window.localStorage.getItem("token");
  console.log("resetPasswordToken", resetPasswordToken);

  if (tokenFromUrl === resetPasswordToken) return;

  window.location.href = "../../notautherize/index.html";
});

const passwordInputElem = document.querySelector('input[name="password"]');
passwordInputElem.addEventListener("keyup", () => {
  const passwordValue = passwordInputElem.value;
  const invalidElem = document.querySelector(".invalidError.password");
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

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

const confirmPasswordInputElem = document.querySelector(
  'input[name="confirmPassword"]'
);
confirmPasswordInputElem.addEventListener("keyup", () => {
  const passwordValue = inputValueState.password;
  const confirmPasswordValue = confirmPasswordInputElem.value;
  const invalidCharElem = document.querySelector(".invalidError.charError");
  const invalidNotMatchElem = document.querySelector(
    ".invalidError.notMatchError"
  );
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  // 8文字以上代償の英数字を混ぜたものがあること
  // passwordと確認パスワードがあっていること
  if (
    passwordRegex.test(confirmPasswordValue) &&
    passwordValue === confirmPasswordValue
  ) {
    invalidCharElem.style.display = "none";
    invalidNotMatchElem.style.display = "none";
    validState.password = true;
    validState.confirmPassword = true;
  }

  if (!passwordRegex.test(confirmPasswordValue)) {
    invalidCharElem.style.display = "block";
    validState.password = false;
  }

  if (passwordValue !== confirmPasswordValue) {
    invalidNotMatchElem.style.display = "block";
    validState.password = false;
  }

  toggleSubmit();
});

const toggleSubmit = () => {
  const allValid = Object.values(validState).every(
    (validValue) => validValue === true
  );

  registerSubmitBtn.disabled = !allValid;
};

registerSubmitBtn.addEventListener("click", async () => {
  let newToken = "";
  const newPassword = inputValueState.password;
  // パスワードを送信して取得する
  const reissuePasswordResult = await reissuePassword(newPassword);

  // 取得したらローカルストレージに保存
  if (reissuePasswordResult.ok) {
    const currentUserInfoJson = localStorage.getItem("registerUser");
    const currentUserInfo = JSON.parse(currentUserInfoJson);
    console.log("currentUserInfo", currentUserInfo);

    const newUserInfo = {
      ...currentUserInfo,
      password: reissuePasswordResult.password,
    };
    const newUserInfoJson = JSON.stringify(newUserInfo);
    localStorage.setItem("registerUser", newUserInfoJson);
  } else {
    alert(reissuePasswordResult.message);
  }

  // 新たなトークンを発行
  const reissueTokenResult = await reissueToken();
  // 新しいトークンを発行する
  if (reissueTokenResult.ok) {
    localStorage.removeItem("token");
    localStorage.setItem("token", reissueTokenResult.token);
    newToken = reissueTokenResult.token;
  } else {
    alert(reissueTokenResults.message);
  }

  return (window.location.href = `../password-done.html?token=${newToken}`);
});
