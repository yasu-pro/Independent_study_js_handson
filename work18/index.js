// DOM
const slider = document.getElementById('js-slider');
const sliderList = document.getElementById('js-slider-list');
const autoSlideTime = 3000;

// API
const apiURL = 'http://localhost:3000/data';

// 関数
const loading = () => {
    const div = document.createElement('div');
    const img = document.createElement('img');

    img.src = './img/loading-circle.gif';

    div.classList.add('load');
    div.appendChild(img);
    slider.appendChild(div);
};

const removeLoading = () => {
    const load = document.querySelector('.load');

    load.remove();
};

const createErrorMessage = (error) => {
    const errorMessage = document.createElement('p');
    errorMessage.classList = 'errorMessage';

    errorMessage.textContent = error;

    return errorMessage;
};

const getSlideData = async () => {
    try {
        const res = await fetch(apiURL);
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        const slideData = await res.json();
        return slideData;
    } catch (error) {
        slider.appendChild(createErrorMessage(error));
        console.error('Error:', error);
    }
};

const initializePrevBtnDisabledState = () => {
    // 読み込み時prevボタンをdisabled
    const firstSlide = document.querySelector('[data-number="first"]');
    const prevBtn = document.getElementById('prevBtn');
    if (firstSlide) {
        prevBtn.disabled = true;
    }
};

const createDotIndicatorList = () => {
    const list = document.createElement('ul');
    list.id = 'js-indicator';
    list.className = 'indicatorList';

    return list;
};

const createPageNumberWrap = () => {
    const pageNumWrap = document.createElement('div');
    pageNumWrap.id = 'js-pageNumberWrap';
    pageNumWrap.className = 'pageNumWrap';

    return pageNumWrap;
};

const createPageNum = (totalSlides) => {
    // ページ番号追加
    const pageNumWrapElem = document.getElementById('js-pageNumberWrap');
    const currentPageNum = document.createElement('span');
    const totalPageNum = document.createElement('span');
    const pageDivider = document.createElement('span');

    currentPageNum.className = 'currentPageNum';
    currentPageNum.id = 'js-currentPageNum';
    totalPageNum.className = 'totalPageNum';
    totalPageNum.id = 'js-totalPageNum';

    currentPageNum.textContent = 1;
    totalPageNum.textContent = totalSlides;

    pageDivider.classList.add('pageDivider');
    pageDivider.textContent = ' / ';

    pageNumWrapElem.appendChild(currentPageNum);
    pageNumWrapElem.appendChild(pageDivider);
    pageNumWrapElem.appendChild(totalPageNum);
};

const updateButtonDisabledState = (index, array) => {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // ボタンのdisabled属性を設定
    if (index === 0) {
        prevBtn.disabled = true;
        nextBtn.disabled = false;
    } else if (index === array.length - 1) {
        nextBtn.disabled = true;
        prevBtn.disabled = false;
    } else {
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }
};

const updateSlideIndicatorElementState = () => {
    // data属性を変更・削除
    const currentSlideView = document.querySelector('[data-view="on"]');
    const currentIndicatorSelect = document.querySelector('[data-select]');

    currentSlideView.dataset.view = 'off';
    currentIndicatorSelect.removeAttribute('data-select');
};

const changeIndicatorDisplay = (clickedIndicatorItem) => (slideOrderItem) => {
    // インディケーターの表示変更
    const indicatorOrder = clickedIndicatorItem.getAttribute(
        'data-indicator-order'
    );
    const slideOrder = slideOrderItem.getAttribute('data-slide-order');

    if (slideOrder === indicatorOrder) {
        clickedIndicatorItem.dataset.select = 'select';
        slideOrderItem.dataset.view = 'on';
    }
};

const clickEventIndicator = (index, array, event) => {
    const arraySlideOrderItem = document.querySelectorAll('[data-slide-order]');
    const clickedIndicatorItem = event.target;

    updateButtonDisabledState(index, array);
    updateSlideIndicatorElementState();
    arraySlideOrderItem.forEach(changeIndicatorDisplay(clickedIndicatorItem));
};

const indicatorEvent = () => {
    const arrayIndicatorItem = document.querySelectorAll('.indicatorItem');

    arrayIndicatorItem.forEach((indicatorItem, index, array) => {
        indicatorItem.addEventListener('click', (event) => {
            clickEventIndicator(index, array, event);
            changePageNum();

            if (!isLastSlide()) {
                resetAutoSlide();
            } else {
                clearInterval(intervalCount.countId);
            }
        });
    });
};

const createSlideImage = (slide, index, array) => {
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
    lists.dataset.slideOrder = slide.order;
    lists.id = slide.id;
    img.src = slide.src;
    lists.style.zIndex = `-${slide.order}`;

    lists.appendChild(img);
    sliderList.appendChild(lists);
};

const createIndicator = (slide, index) => {
    // インディケーター追加
    const list = document.getElementById('js-indicator');
    const item = document.createElement('li');
    const fragment = document.createDocumentFragment();

    item.textContent = '■';

    item.className = 'indicatorItem';
    item.dataset.indicatorOrder = slide.order;

    if (index === 0) {
        item.dataset.select = 'select';
    }

    fragment.appendChild(item);
    list.appendChild(fragment);
};

const initializeDisplay = async (slideData) => {
    const dotIndicatorList = createDotIndicatorList();
    const pageNumWrap = createPageNumberWrap();

    slider.appendChild(dotIndicatorList);
    slider.appendChild(pageNumWrap);

    slideData.forEach(createSlideImage);
    slideData.forEach(createIndicator);
    createPageNum(slideData.length);
    createNextPrevBtn();
    initializePrevBtnDisabledState();
};

const changePageNum = () => {
    // ページ番号変更
    const currentPageNum = document.getElementById('js-currentPageNum');
    const slideView = document.querySelector('[data-view="on"]');
    const slideOrder = slideView.getAttribute('data-slide-order');

    currentPageNum.textContent = slideOrder;
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

const clickEventBtn = (buttonType) => {
    const currentSlide = document.querySelector('[data-view="on"]');
    const currentIndicator = document.querySelector('[data-select="select"]');

    let changeSlide;
    let changeIndicator;

    if (buttonType === 'next') {
        changeSlide = currentSlide.nextElementSibling;
        changeIndicator = currentIndicator.nextElementSibling;
    } else if (buttonType === 'prev') {
        changeSlide = currentSlide.previousElementSibling;
        changeIndicator = currentIndicator.previousElementSibling;
    }

    currentSlide.dataset.view = 'off';
    changeSlide.dataset.view = 'on';
    currentIndicator.removeAttribute('data-select');
    changeIndicator.dataset.select = 'select';

    if (changeSlide.getAttribute('data-number') === 'last') {
        nextBtn.disabled = true;
    } else if (changeSlide.getAttribute('data-number') === 'first') {
        prevBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
        prevBtn.disabled = false;
    }

    changePageNum();

    resetAutoSlide();
};

const setupButtonListeners = () => {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    nextBtn.addEventListener('click', () => clickEventBtn('next'));
    prevBtn.addEventListener('click', () => clickEventBtn('prev'));
};

const initializeApp = async () => {
    loading();

    const slideData = await getSlideData();
    await initializeDisplay(slideData);
    removeLoading();
    indicatorEvent();
    setupButtonListeners();

    autoSlide();
};

const isLastSlide = () => {
    const currentSlide = document.querySelector('[data-view="on"]');
    const isLastSlide = currentSlide.getAttribute('data-number') === 'last';

    return isLastSlide;
};

const intervalCount = { countId: 0 };

const autoChangeSlide = () => {
    const currentSlide = document.querySelector('[data-view="on"]');
    const currentIndicator = document.querySelector('[data-select="select"]');

    let changeSlide;
    let changeIndicator;

    changeSlide = currentSlide.nextElementSibling;
    changeIndicator = currentIndicator.nextElementSibling;

    currentSlide.dataset.view = 'off';
    changeSlide.dataset.view = 'on';
    currentIndicator.removeAttribute('data-select');
    changeIndicator.dataset.select = 'select';

    if (changeSlide.getAttribute('data-number') === 'last') {
        nextBtn.disabled = true;
        clearInterval(intervalCount.countId);
    } else if (changeSlide.getAttribute('data-number') === 'first') {
        prevBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
        prevBtn.disabled = false;
    }

    changePageNum();
};

const resetAutoSlide = () => {
    clearInterval(intervalCount.countId);
    autoSlide();
};

const autoSlide = () =>
    (intervalCount.countId = setInterval(() => {
        autoChangeSlide();
    }, autoSlideTime));

initializeApp();
