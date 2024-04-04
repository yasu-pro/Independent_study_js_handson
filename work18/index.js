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

const displaySlideImage = async () => {
    const slideData = await getSlideImage();

    slideData.forEach((slide) => {
        const lists = document.createElement('li');
        const img = document.createElement('img');

        lists.id = slide.id;
        img.src = slide.src;
        lists.style.zIndex = `-${slide.order}`;

        lists.appendChild(img);
        sliderList.appendChild(lists);
    });
};

displaySlideImage();
