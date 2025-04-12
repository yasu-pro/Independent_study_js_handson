const registerElem = document.querySelector('.registerTxt');
const closeBtn = document.querySelector('.closeBtn');
const modalElem = document.querySelector('.modal_contents');

registerElem.addEventListener('click', () => {
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
    const registerElem = document.querySelectorAll('.modal li');

    if (registerElem.length > 0) {
        const lastElem = registerElem[registerElem.length - 1];
        const scroll = modalElem.scrollTop;
        const modalHeight = modalElem.clientHeight;
        const lastElemPos =
            lastElem.getBoundingClientRect().top -
            modalElem.getBoundingClientRect().top;

        console.log('scrollTop', scroll);
        console.log('lastElemPos', lastElemPos);

        if (lastElemPos < modalHeight) {
            lastElem.classList.add('js-agree-position');
        }
    }
});
