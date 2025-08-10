import { toggleSubmitBtn } from "../../utils/form/formUtils";
import { emailRegex } from "../../utils/regex";
import { requestNewMailAndToken } from "./ReissueMail.ts";
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
mailInputElem.addEventListener("keyup", () => {
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
confirmMaliInputElem.addEventListener("keyup", () => {
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

// ユーザー情報を localStorage に反映
const updateUserMailInStorage = (newMail) => {
  try {
    const currentUserInfoJson = getToken("registerUser");
    const currentUserInfo = JSON.parse(currentUserInfoJson);

    const newUserInfo = {
      ...currentUserInfo,
      mail: newMail,
    };

    const newUserInfoJson = JSON.stringify(newUserInfo);
    setToken("registerUser", newUserInfoJson);
  } catch (error) {
    alert("メールアドレスの保存に失敗しました。");
  }
};

// 完了ページへリダイレクト
const redirectToMailDonePage = (newToken) => {
  setToken("registerMailToken", newToken);

  return (window.location.href = `../reset-email-done/index.html?token=${newToken}`);
};

// 送信処理
registerSubmitBtn.addEventListener("click", async () => {
  const isValid =
    mailReissueValidState.mail === mailReissueValidState.confirmMail;
  if (!isValid) {
    alert("メールアドレスが一致しません。");
    return;
  }

  const newMail = mailReissueInputValueState.mail;

  // サーバーにメール更新と新トークン発行をまとめて依頼
  const result = await requestNewMailAndToken(newMail);

  if (!result.ok) {
    alert(result.message);
    return;
  }

  updateUserMailInStorage(result.mail);
  redirectToMailDonePage(result.token);
});
