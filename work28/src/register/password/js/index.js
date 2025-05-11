import {
  getToken,
  setToken,
  removeToken,
} from "../../../feature/token-utils/tokenUtils";
import {
  passwordReissueInputValueState,
  passwordReissueValidState,
} from "../../../states/passwordReissueFormState";
import { toggleSubmitBtn } from "../../../utils/form/formUtils";
import { passwordRegex } from "../../../utils/regex";
import { requestNewPassword } from "./ReissuePassword";
import { requestNewToken } from "./ReissuePassword";

const registerSubmitBtn = document.getElementById("js-submitBtn");

window.addEventListener("DOMContentLoaded", () => {
  // urlからtokenのパラメーター取得
  const extractTokenFromUrl = new URLSearchParams(document.location.search);
  const tokenFromUrl = extractTokenFromUrl.get("token");

  // パラメータから取得したトークンとローカルストレージにあるトークンが一致するかどうか
  const passwordResetToken = getToken("passwordResetToken");

  if (tokenFromUrl === passwordResetToken) return;

  window.location.href = "../../notautherize/index.html";
});

const passwordInputElem = document.querySelector('input[name="password"]');
passwordInputElem.addEventListener("keyup", () => {
  const passwordValue = passwordInputElem.value;
  const invalidElem = document.querySelector(".invalidError.password");

  if (!passwordRegex.test(passwordValue)) {
    invalidElem.style.display = "block";
    passwordReissueValidState.password = false;
  } else {
    invalidElem.style.display = "none";
    passwordReissueValidState.password = true;
    passwordReissueInputValueState.password = passwordValue;
  }

  toggleSubmitBtn(passwordReissueValidState, registerSubmitBtn);
});

const confirmPasswordInputElem = document.querySelector(
  'input[name="confirmPassword"]'
);
confirmPasswordInputElem.addEventListener("keyup", () => {
  const passwordValue = passwordReissueInputValueState.password;
  const confirmPasswordValue = confirmPasswordInputElem.value;
  const invalidCharElem = document.querySelector(".invalidError.charError");
  const invalidNotMatchElem = document.querySelector(
    ".invalidError.notMatchError"
  );

  // 8文字以上代償の英数字を混ぜたものがあること
  // passwordと確認パスワードがあっていること
  if (
    passwordRegex.test(confirmPasswordValue) &&
    passwordValue === confirmPasswordValue
  ) {
    invalidCharElem.style.display = "none";
    invalidNotMatchElem.style.display = "none";
    passwordReissueValidState.password = true;
    passwordReissueValidState.confirmPassword = true;
  }

  if (!passwordRegex.test(confirmPasswordValue)) {
    invalidCharElem.style.display = "block";
    passwordReissueValidState.password = false;
  }

  if (passwordValue !== confirmPasswordValue) {
    invalidNotMatchElem.style.display = "block";
    passwordReissueValidState.password = false;
  }

  toggleSubmitBtn(passwordReissueValidState, registerSubmitBtn);
});

const updateUserPasswordInStorage = (newPassword) => {
  try {
    const currentUserInfoJson = getToken("registerUser");
    const currentUserInfo = JSON.parse(currentUserInfoJson);

    const newUserInfo = {
      ...currentUserInfo,
      password: newPassword,
    };

    const newUserInfoJson = JSON.stringify(newUserInfo);
    setToken("registerUser", newUserInfoJson);
  } catch (error) {
    alert("パスワードの保存に失敗しました。");
  }
};

const redirectToPasswordDonePage = (newToken) => {
  removeToken("passwordResetToken");
  setToken("registerPasswordToken", newToken.token);

  newToken = newToken.token;
  return (window.location.href = `../password-done.html?token=${newToken}`);
};

registerSubmitBtn.addEventListener("click", async () => {
  const newPassword = passwordReissueInputValueState.password;

  const reissuePasswordResult = await requestNewPassword(newPassword);

  if (!reissuePasswordResult.ok) {
    alert(reissuePasswordResult.message);
    return;
  }
  updateUserPasswordInStorage(reissuePasswordResult.password);

  const reissueTokenResult = await requestNewToken();
  if (!reissueTokenResult.ok) {
    alert(reissueTokenResult.message);
    return;
  }
  redirectToPasswordDonePage(reissueTokenResult);
});
