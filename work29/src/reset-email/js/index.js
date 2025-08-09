import { toggleSubmitBtn } from "../../utils/form/formUtils";
import { emailRegex } from "../../utils/regex";
import { requestNewToken, requestNewMail } from "./ReissueMail.ts";
import {
  mailReissueValidState,
  mailReissueInputValueState,
} from "../../states/changeMailFromState.ts";
import {
  toggleErrorDisplay,
  updateValidState,
  validateInputField,
} from "../../utils/form/validationUtils.ts";

const registerSubmitBtn = document.getElementById("js-submitBtn");

const mailInputElem = document.querySelector('input[name="mail"]');
mailInputElem.addEventListener("keyup", () => {
  const mailValue = mailInputElem.value.trim();
  mailReissueInputValueState.mail = mailValue;
  const invalidElem = document.querySelector(".invalidError.mail");

  console.log("mailReissueInputValueState", mailReissueInputValueState);

  validateInputField(
    emailRegex,
    mailValue,
    invalidElem,
    "mail",
    mailReissueValidState,
    mailReissueInputValueState
  );

  toggleSubmitBtn(mailReissueInputValueState, registerSubmitBtn);
});

const confirmMaliInputElem = document.querySelector(
  'input[name="confirmMail"]'
);
confirmMaliInputElem.addEventListener("keyup", () => {
  const changeMailValue = mailReissueInputValueState.value;
  const confirmMailValue = confirmMaliInputElem.value;
  const invalidMailCharElem = document.querySelector(
    ".invalidError.notMailCharError"
  );
  const invalidNotMatchElem = document.querySelector(
    ".invalidError.notMatchError"
  );

  // メールアドレスの形式に合っていること
  // メールアドレスと確認メールアドレスが合っていること
  if (
    emailRegex.test(confirmMailValue) &&
    changeMailValue === confirmMailValue
  ) {
    toggleErrorDisplay(invalidMailCharElem, false);
    toggleErrorDisplay(invalidNotMatchElem, false);
    updateValidState(mailReissueValidState, "mail", true);
    updateValidState(mailReissueValidState, "confirmMail", true);
  }

  if (!emailRegex.test(confirmMailValue)) {
    toggleErrorDisplay(invalidMailCharElem, true);
    updateValidState(mailReissueValidState, "confirmMail", false);
  }

  if (changeMailValue !== confirmMailValue) {
    toggleErrorDisplay(invalidNotMatchElem, true);
    updateValidState(mailReissueValidState, "mail", false);
  }

  toggleSubmitBtn(mailReissueValidState, registerSubmitBtn);
});

const updateUserMailInStorage = (newMail) => {
  try {
    const currentUserInfoJson = getToken("registerUser");
    const currentUserInfo = JSON.parse(currentUserInfoJson);

    const newUserInfo = {
      ...currentUserInfo,
      eMail: newMail,
    };

    const newUserInfoJson = JSON.stringify(newUserInfo);
    setToken("registerUser", newUserInfoJson);
  } catch (error) {
    alert("メールアドレスの保存に失敗しました。");
  }
};

const redirectToMailDonePage = (newToken) => {
  removeToken("eMailResetToken");
  setToken("registerMailToken", newToken.token);

  newToken = newToken.token;
  return (window.location.href = `../reset-email-done.html?token=${newToken}`);
};

registerSubmitBtn.addEventListener("click", async () => {
  const newMail = mailReissueInputValueState.eMail;

  const reissueMailResult = await requestNewMail(newMail);

  if (!reissueMailResult.ok) {
    alert(reissueMailResult.message);
    return;
  }
  updateUserMailInStorage(reissueMailResult.eMail);

  const reissueTokenResult = await requestNewToken();
  if (!reissueTokenResult.ok) {
    alert(reissueTokenResult.message);
    return;
  }
  redirectToMailDonePage(reissueTokenResult);
});
