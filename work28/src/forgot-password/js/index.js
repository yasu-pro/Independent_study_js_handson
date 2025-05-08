import { emailRegex } from "../../utils/regex.ts";
import { handleForgotPassword } from "./passwordReset";

const registerSubmitBtn = document.getElementById("js-submitBtn");

const validState = {
  mail: false,
};

const inputValueState = {
  mail: "",
};

const mailInputElem = document.querySelector('input[name="mail"]');
mailInputElem.addEventListener("keyup", () => {
  const mailValue = mailInputElem.value.trim();
  const invalidElem = document.querySelector(".invalidError.mail");

  if (!emailRegex.test(mailValue)) {
    invalidElem.style.display = "block";
    validState.mail = false;
  } else {
    invalidElem.style.display = "none";
    validState.mail = true;
    inputValueState.mail = mailValue;
  }

  toggleSubmit();
});

const toggleSubmit = () => {
  const allValid = Object.values(validState).every(
    (validValue) => validValue === true
  );

  registerSubmitBtn.disabled = !allValid;
};

const isRegisteredEmail = () => {
  const registerUserInfoServer = localStorage.getItem("registerUser");

  if (!registerUserInfoServer) return false;

  const registerUserJson = JSON.parse(registerUserInfoServer);

  if (registerUserJson.mail === inputValueState.mail) return true;

  return false;
};

registerSubmitBtn.addEventListener("click", () => {
  if (isRegisteredEmail()) {
    const forgotPasswordForUrl = handleForgotPassword();

    window.location.href = forgotPasswordForUrl;
    return;
  }

  alert("一致するアカウントが見つかりませんでした");
});
