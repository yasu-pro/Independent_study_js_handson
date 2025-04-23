const registerTextElem = document.querySelector('.registerText');
const closeBtn = document.querySelector('.closeBtn');
const modalContentsElem = document.querySelector('.modal_contents');
const registerCheckBox = document.getElementById('register');

const validState = {
    name: false,
    mail: false,
    password: false,
    register: false,
};

registerTextElem.addEventListener('click', () => {
    const modalElem = document.getElementById('js-modal');
    modalElem.classList.remove('close');
    modalElem.classList.add('open');
});

closeBtn.addEventListener('click', () => {
    const modalElem = document.getElementById('js-modal');
    modalElem.classList.remove('open');
    modalElem.classList.add('close');
});

modalContentsElem.addEventListener('scroll', () => {
    if (registerCheckBox.checked) return;
    const registerListElem = document.querySelectorAll('.modal li');

    if (registerListElem.length > 0) {
        const lastElem = registerListElem[registerListElem.length - 1];
        const modalHeight = modalContentsElem.clientHeight;
        const lastElemPos =
            lastElem.getBoundingClientRect().top -
            modalContentsElem.getBoundingClientRect().top;

        if (lastElemPos < modalHeight) {
            registerCheckBox.checked = true;
            registerCheckBox.disabled = false;
            validState.register = true;

            toggleSubmit();
        }
    }
});

const userNameInputElem = document.querySelector('input[name="name"]');
userNameInputElem.addEventListener('keyup', () => {
    const invalidElem = document.querySelector('.invalidError.name');
    if (userNameInputElem.value.length > 15) {
        invalidElem.style.display = 'block';
        validState.name = false;
    } else {
        invalidElem.style.display = 'none';
        validState.name = true;
    }

    toggleSubmit();
});

const mailInputElem = document.querySelector('input[name="mail"]');
mailInputElem.addEventListener('keyup', () => {
    const mailValue = mailInputElem.value.trim();
    const invalidElem = document.querySelector('.invalidError.mail');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(mailValue)) {
        invalidElem.style.display = 'block';
        validState.mail = false;
    } else {
        invalidElem.style.display = 'none';
        validState.mail = true;
    }

    toggleSubmit();
});

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
