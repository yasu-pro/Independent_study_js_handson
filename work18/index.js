// DOM
const slider = document.getElementById('js-slider');
const sliderList = document.getElementById('js-slider-list');

// API
const apiURL = 'http://localhost:3000/data';

// 関数
const getSlideImage = async () => {
    const res = await fetch('http://localhost:3000/data');
    const slideData = await res.json();

    return slideData;
};

const addImage = (slide, index, array) => {
    // 画像追加
    const lists = document.createElement('li');
    const img = document.createElement('img');

    lists.dataset.view = 'off';
    if (index === 0) {
        lists.dataset.view = 'on';
        lists.dataset.number = 'first';
    } else if (index + 1 === array.length) {
        lists.dataset.number = 'last';
    }
    lists.id = slide.id;
    img.src = slide.src;
    lists.style.zIndex = `-${slide.order}`;

    lists.appendChild(img);
    sliderList.appendChild(lists);
};

const initializePrevBtnState = () => {
    // 読み込み時prevボタンをdisabled
    const firstSlide = document.querySelector('[data-number="first"]');
    const prevBtn = document.getElementById('prevBtn');
    if (firstSlide) {
        prevBtn.disabled = true;
    }
};

const displaySlideImage = async () => {
    const slideData = await getSlideImage();

    slideData.forEach(addImage);

    initializePrevBtnState();
};

const createNextPrevBtn = () => {
    // next,prevボタン作成
    const div = document.createElement('div');
    const nextBtn = document.createElement('button');
    const prevBtn = document.createElement('button');

    div.classList = 'nextPrevBtnWrap';
    nextBtn.id = 'nextBtn';
    prevBtn.id = 'prevBtn';
    nextBtn.classList = 'arrowBtn --nextBtn';
    prevBtn.classList = 'arrowBtn --prevBtn';

    nextBtn.textContent = '→';
    prevBtn.textContent = '←';

    div.appendChild(nextBtn);
    div.appendChild(prevBtn);
    slider.appendChild(div);
};

document.addEventListener('DOMContentLoaded', () => {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    nextBtn.addEventListener('click', (event) => {
        const currentSlide = document.querySelector('[data-view="on"]');
        const nextSlide = currentSlide.nextElementSibling;

        prevBtn.disabled = false;
        currentSlide.dataset.view = 'off';
        nextSlide.dataset.view = 'on';

        if (nextSlide.getAttribute('data-number') === 'last') {
            nextBtn.disabled = true;
        }
    });

    prevBtn.addEventListener('click', (event) => {
        const currentSlide = document.querySelector('[data-view="on"]');
        const prevSlide = currentSlide.previousElementSibling;

        nextBtn.disabled = false;
        currentSlide.dataset.view = 'off';
        prevSlide.dataset.view = 'on';

        if (prevSlide.getAttribute('data-number') === 'first') {
            prevBtn.disabled = true;
        }
    });
});

displaySlideImage();
createNextPrevBtn();
