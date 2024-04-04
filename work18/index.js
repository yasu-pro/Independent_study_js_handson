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

const addImage = (slide) => {
    // 画像追加
    const lists = document.createElement('li');
    const img = document.createElement('img');

    lists.id = slide.id;
    img.src = slide.src;
    lists.style.zIndex = `-${slide.order}`;

    lists.appendChild(img);
    sliderList.appendChild(lists);
};

const displaySlideImage = async () => {
    const slideData = await getSlideImage();

    slideData.forEach(addImage);
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

    console.log(nextBtn, prevBtn);
});

displaySlideImage();
createNextPrevBtn();
