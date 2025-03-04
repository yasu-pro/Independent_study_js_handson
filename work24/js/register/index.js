const registerElem = document.querySelector('.registerTxt');
const closeBtn = document.querySelector('.closeBtn');

registerElem.addEventListener('click', () => {
    const modalElem = document.getElementById('modal');
    modalElem.classList.remove('close');
    modalElem.classList.add('open');
});

closeBtn.addEventListener('click', () => {
    const modalElem = document.getElementById('modal');
    modalElem.classList.remove('open');
    modalElem.classList.add('close');
});
