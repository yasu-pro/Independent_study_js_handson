import { setToken } from "../../feature/token-utils/tokenUtils";
import {
  registerValidState,
  registerInputValueState,
} from "../../states/registerFromState";
import { toggleSubmitBtn } from "../../utils/form/formUtils";
import {
  updateValidState,
  validateInputField,
} from "../../utils/form/validationUtils";
import { emailRegex, passwordRegex } from "../../utils/regex";
import { registerUserAndIssueToken } from "./registerUserAndIssueToken";

const registerTextElem = document.querySelector(".registerText");
const closeBtn = document.querySelector(".closeBtn");
const modalContentsElem = document.querySelector(".modal_contents");
const registerCheckBox = document.getElementById("register");
const registerSubmitBtn = document.getElementById("js-submitBtn");

registerTextElem.addEventListener("click", () => {
  const modalElem = document.getElementById("js-modal");
  modalElem.classList.remove("close");
  modalElem.classList.add("open");
});

closeBtn.addEventListener("click", () => {
  const modalElem = document.getElementById("js-modal");
  modalElem.classList.remove("open");
  modalElem.classList.add("close");
});

modalContentsElem.addEventListener("scroll", () => {
  if (registerCheckBox.checked) return;
  const registerListElem = document.querySelectorAll(".modal li");

  if (registerListElem.length > 0) {
    const lastElem = registerListElem[registerListElem.length - 1];
    const modalHeight = modalContentsElem.clientHeight;
    const lastElemPos =
      lastElem.getBoundingClientRect().top -
      modalContentsElem.getBoundingClientRect().top;

    if (lastElemPos < modalHeight) {
      registerCheckBox.checked = true;
      registerCheckBox.disabled = false;
      updateValidState(registerValidState, "register", true);

      toggleSubmitBtn(registerValidState, registerSubmitBtn);
    }
  }
});

const mailInputElem = document.querySelector('input[name="mail"]');
mailInputElem.addEventListener("blur", () => {
  const mailValue = mailInputElem.value.trim();
  registerInputValueState.mail = mailValue;
  const invalidElem = document.querySelector(".invalidError.mail");

  validateInputField(
    emailRegex,
    mailValue,
    invalidElem,
    "mail",
    registerValidState,
    registerInputValueState
  );

  toggleSubmitBtn(registerValidState, registerSubmitBtn);
});

const passwordInputElem = document.querySelector('input[name="password"]');
passwordInputElem.addEventListener("blur", () => {
  const passwordValue = passwordInputElem.value.trim();
  registerInputValueState.password = passwordValue;
  const invalidElem = document.querySelector(".invalidError.password");

  validateInputField(
    passwordRegex,
    passwordValue,
    invalidElem,
    "password",
    registerValidState,
    registerInputValueState
  );

  toggleSubmitBtn(registerValidState, registerSubmitBtn);
});

registerSubmitBtn.addEventListener("click", async () => {
  const result = await registerUserAndIssueToken(registerInputValueState);

  if (!result.ok) {
    alert(result.message);

    return;
  }

  setToken("registerToken", result.token);
  return (window.location.href = `../register-done/index.html?token=${result.token}`);
});
