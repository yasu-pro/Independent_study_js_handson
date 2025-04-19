const registerTextElem = document.querySelector('.registerText');
const closeBtn = document.querySelector('.closeBtn');
const modalContentsElem = document.querySelector('.modal_contents');
const registerCheckBox = document.getElementById('register');

const validState = {
    password: false,
};

const passwordInputElem = document.querySelector('input[name="password"]');
passwordInputElem.addEventListener('keyup', () => {
    const passwordValue = passwordInputElem.value;
    const invalidElem = document.querySelector('.invalidError.password');
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordRegex.test(passwordValue)) {
        invalidElem.style.display = 'block';
        validState.password = false;
    } else {
        invalidElem.style.display = 'none';
        validState.password = true;
    }

    toggleSubmit();
});

const toggleSubmit = () => {
    const submitBtn = document.getElementById('js-submitBtn');
    const allValid = Object.values(validState).every(
        (validValue) => validValue === true
    );

    submitBtn.disabled = !allValid;
};
