import { toggleSubmitBtn } from "../../utils/form/formUtils";
import { emailRegex, passwordRegex } from "../../utils/regex";
import { requestNewUserInfoAndToken } from "./requestNewUserInfoAndToken.ts";
import {
  mailReissueValidState,
  mailReissueInputValueState,
} from "../../states/changeMailFromState.ts";
import {
  toggleErrorDisplay,
  updateValidState,
} from "../../utils/form/validationUtils.ts";
import { setToken, getToken } from "../../feature/token-utils/tokenUtils";

const registerSubmitBtn = document.getElementById("js-submitBtn");

const mailInputElem = document.querySelector('input[name="mail"]');
mailInputElem.addEventListener("blur", () => {
  const changeMailValue = mailInputElem.value.trim();
  mailReissueInputValueState.mail = changeMailValue;
  const confirmMail = mailReissueInputValueState.confirmMail;

  const invalidMailCharElem = document.querySelector(".invalidError.mail");
  const invalidMatchElem = document.querySelector(
    ".invalidError.notMatchError"
  );

  // メールアドレスの形式に合っていること
  // メールアドレスと確認メールアドレスが合っていること
  if (emailRegex.test(changeMailValue) && changeMailValue === confirmMail) {
    toggleErrorDisplay(invalidMailCharElem, false);
    toggleErrorDisplay(invalidMatchElem, false);
    updateValidState(mailReissueValidState, "mail", true);
    updateValidState(mailReissueValidState, "confirmMail", true);
  }

  if (!emailRegex.test(changeMailValue)) {
    toggleErrorDisplay(invalidMailCharElem, true);
    updateValidState(mailReissueValidState, "mail", false);
  } else {
    toggleErrorDisplay(invalidMailCharElem, false);
    updateValidState(mailReissueValidState, "mail", true);
  }

  if (changeMailValue !== confirmMail) {
    toggleErrorDisplay(invalidMatchElem, true);
    updateValidState(mailReissueValidState, "mail", false);
  }

  toggleSubmitBtn(mailReissueValidState, registerSubmitBtn);
});

const confirmMaliInputElem = document.querySelector(
  'input[name="confirmMail"]'
);
confirmMaliInputElem.addEventListener("blur", () => {
  const confirmMailValue = confirmMaliInputElem.value.trim();
  mailReissueInputValueState.confirmMail = confirmMailValue;
  const changeMailValue = mailReissueInputValueState.mail;

  const invalidMailCharElem = document.querySelector(
    ".invalidError.notMailCharError"
  );
  const invalidMatchElem = document.querySelector(
    ".invalidError.notMatchError"
  );

  // メールアドレスの形式に合っていること
  // メールアドレスと確認メールアドレスが合っていること
  if (
    emailRegex.test(confirmMailValue) &&
    changeMailValue === confirmMailValue
  ) {
    toggleErrorDisplay(invalidMailCharElem, false);
    toggleErrorDisplay(invalidMatchElem, false);
    updateValidState(mailReissueValidState, "mail", true);
    updateValidState(mailReissueValidState, "confirmMail", true);
  }

  if (!emailRegex.test(confirmMailValue)) {
    toggleErrorDisplay(invalidMailCharElem, true);
    updateValidState(mailReissueValidState, "confirmMail", false);
  } else {
    toggleErrorDisplay(invalidMailCharElem, false);
    updateValidState(mailReissueValidState, "confirmMail", true);
  }

  if (changeMailValue !== confirmMailValue) {
    toggleErrorDisplay(invalidMatchElem, true);
    updateValidState(mailReissueValidState, "confirmMail", false);
  }

  toggleSubmitBtn(mailReissueValidState, registerSubmitBtn);
});

const passwordInputElem = document.querySelector('input[name="password"]');
passwordInputElem.addEventListener("blur", () => {
  const passwordValue = passwordInputElem.value.trim();
  mailReissueInputValueState.password = passwordValue;

  const changeMailValue = mailReissueInputValueState.mail;
  const confirmMailValue = mailReissueInputValueState.confirmMail;

  const invalidMatchElem = document.querySelector(
    ".invalidError.notMatchError"
  );
  const invalidPasswordElem = document.querySelector(".invalidError.password");

  const isPasswordValid = passwordRegex.test(passwordValue);
  const isMailMatch = changeMailValue === confirmMailValue;

  if (isPasswordValid) {
    console.log("password OK");
    toggleErrorDisplay(invalidPasswordElem, false);
    updateValidState(mailReissueValidState, "password", true);
  } else {
    console.log("password NO");
    toggleErrorDisplay(invalidPasswordElem, true);
    updateValidState(mailReissueValidState, "password", false);
  }

  // メール一致のチェック
  if (isMailMatch) {
    toggleErrorDisplay(invalidMatchElem, false);
  } else {
    toggleErrorDisplay(invalidMatchElem, true);
  }

  toggleSubmitBtn(mailReissueValidState, registerSubmitBtn);
});

// 完了ページへリダイレクト
const redirectToMailDonePage = (newToken) => {
  setToken("resetMailToken", newToken);

  return (window.location.href = `../reset-email-done/index.html?token=${newToken}`);
};

// 送信処理
registerSubmitBtn.addEventListener("click", async () => {
  const isValid =
    mailReissueValidState.mail &&
    mailReissueValidState.confirmMail &&
    mailReissueValidState.password;

  if (!isValid) {
    alert("メールアドレスが一致しません。");
    return;
  }

  const userInfo = {
    mail: mailReissueInputValueState.mail,
    password: mailReissueInputValueState.password,
  };

  // サーバーにメール更新と新トークン発行をまとめて依頼
  const result = await requestNewUserInfoAndToken(userInfo);

  if (!result.ok) {
    alert(result.message);
    return;
  }

  redirectToMailDonePage(result.token);
});
