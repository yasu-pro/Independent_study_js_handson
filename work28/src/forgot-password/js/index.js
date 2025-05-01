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
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
