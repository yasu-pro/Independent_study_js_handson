import {
  registerValidState,
  registerInputValueState,
} from "../../states/registerFromState";
import { emailRegex, passwordRegex } from "../../utils/regex";
import { userRegister } from "./RegisterMockServer";

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
      registerValidState.register = true;

      toggleSubmit();
    }
  }
});

const mailInputElem = document.querySelector('input[name="mail"]');
mailInputElem.addEventListener("keyup", () => {
  const mailValue = mailInputElem.value.trim();
  const invalidElem = document.querySelector(".invalidError.mail");

  if (!emailRegex.test(mailValue)) {
    invalidElem.style.display = "block";
    registerValidState.mail = false;
  } else {
    invalidElem.style.display = "none";
    registerValidState.mail = true;
    registerInputValueState.mail = mailValue;
  }

  toggleSubmit();
});

const passwordInputElem = document.querySelector('input[name="password"]');
passwordInputElem.addEventListener("keyup", () => {
  const passwordValue = passwordInputElem.value;
  const invalidElem = document.querySelector(".invalidError.password");

  if (!passwordRegex.test(passwordValue)) {
    invalidElem.style.display = "block";
    registerValidState.password = false;
  } else {
    invalidElem.style.display = "none";
    registerValidState.password = true;
    registerInputValueState.password = passwordValue;
  }

  toggleSubmit();
});

const toggleSubmit = () => {
  const allValid = Object.values(registerValidState).every(
    (validValue) => validValue === true
  );

  registerSubmitBtn.disabled = !allValid;
};

registerSubmitBtn.addEventListener("click", () => {
  if (!userRegister(registerInputValueState)) return;

  window.location.href = "../register-done/index.html";
});
