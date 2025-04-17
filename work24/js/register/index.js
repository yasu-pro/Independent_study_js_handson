const registerTextElem = document.querySelector('.registerText');
const closeBtn = document.querySelector('.closeBtn');
const modalElem = document.querySelector('.modal_contents');
const registerCheckBox = document.getElementById('register');

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

modalElem.addEventListener('scroll', () => {
    if (registerCheckBox.checked) return;
    const registerListElem = document.querySelectorAll('.modal li');
    const submitBtn = document.getElementById('js-submitBtn');

    if (registerListElem.length > 0) {
        const lastElem = registerListElem[registerListElem.length - 1];
        const modalHeight = modalElem.clientHeight;
        const lastElemPos =
            lastElem.getBoundingClientRect().top -
            modalElem.getBoundingClientRect().top;

        if (lastElemPos < modalHeight) {
            registerCheckBox.checked = true;
            registerCheckBox.disabled = false;
            submitBtn.disabled = false;
        }
    }
});

const inputUserName = document.querySelector('input[name="name"]');
inputUserName.addEventListener('keyup', () => {
    const invalidElem = document.querySelector('.invalidError.name');
    if (inputUserName.value.length > 15) {
        invalidElem.style.display = 'block';
        return;
    }

    invalidElem.style.display = 'none';
});

const inputMail = document.querySelector('input[name="mail"]');
inputMail.addEventListener('keyup', () => {
    const inputValue = inputMail.value.trim();
    const invalidElem = document.querySelector('.invalidError.mail');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(inputValue)) {
        invalidElem.style.display = 'block';
        return;
    }

    invalidElem.style.display = 'none';
});

const inputPassword = document.querySelector('input[name="password"]');
inputPassword.addEventListener('keyup', () => {
    const password = inputPassword.value;
    const invalidElem = document.querySelector('.invalidError.password');
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordRegex.test(password)) {
        invalidElem.style.display = 'block';
        return;
    }

    invalidElem.style.display = 'none';
});
