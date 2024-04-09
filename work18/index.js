// DOM
const slider = document.getElementById('js-slider');
const sliderList = document.getElementById('js-slider-list');

// API
const apiURL = 'http://localhost:3000/data';

// 関数
const getSlideData = async () => {
    const res = await fetch('http://localhost:3000/data');
    const slideData = await res.json();

    return slideData;
};

const initializePrevBtnState = () => {
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

const addPageNum = (totalSlides) => {
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

const initializeDisplay = async () => {
    const slideData = await getSlideData();

    const fragment = document.createDocumentFragment();

    const dotIndicatorList = createDotIndicatorList();
    const pageNumWrap = createPageNumberWrap();

    slider.appendChild(dotIndicatorList);
    slider.appendChild(pageNumWrap);

    slideData.forEach((slide, index, array) => {
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
    });

    slideData.forEach((slide, index) => {
        // インディケーター追加
        const list = document.getElementById('js-indicator');
        const item = document.createElement('li');

        item.textContent = '■';

        item.className = 'indicatorItem';
        item.dataset.indicatorOrder = slide.order;

        if (index === 0) {
            item.dataset.select = 'select';
        }

        fragment.appendChild(item);

        list.appendChild(fragment);
    });

    addPageNum(slideData.length);

    initializePrevBtnState();

    // DOM要素が生成された後に、イベントリスナーを設定する
    const arrayIndicatorItem = document.querySelectorAll('.indicatorItem');
    const arraySlideOrderItem = document.querySelectorAll('[data-slide-order]');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    arrayIndicatorItem.forEach((indicatorItem, index, array) => {
        indicatorItem.addEventListener('click', (event) => {
            const clickedIndicatorItem = event.target;
            const indicatorOrder = clickedIndicatorItem.getAttribute(
                'data-indicator-order'
            );

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

            // クリックされる前のdata属性を変更・削除
            const beforeSlideView = document.querySelector('[data-view="on"]');
            const beforeIndicatorSelect =
                document.querySelector('[data-select]');

            beforeSlideView.dataset.view = 'off';
            beforeIndicatorSelect.removeAttribute('data-select');

            arraySlideOrderItem.forEach((slideOrderItem) => {
                // インディケーターの表示変更
                const slideOrder =
                    slideOrderItem.getAttribute('data-slide-order');

                if (slideOrder === indicatorOrder) {
                    clickedIndicatorItem.dataset.select = 'select';
                    slideOrderItem.dataset.view = 'on';
                }
            });

            changePageNum();
        });
    });
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
    const beforeSlide = document.querySelector('[data-view="on"]');
    const beforeIndicator = document.querySelector('[data-select="select"]');

    let changeSlide;
    let changeIndicator;

    if (buttonType === 'next') {
        changeSlide = beforeSlide.nextElementSibling;
        changeIndicator = beforeIndicator.nextElementSibling;
        nextBtn.disabled = false;
    } else if (buttonType === 'prev') {
        changeSlide = beforeSlide.previousElementSibling;
        changeIndicator = beforeIndicator.previousElementSibling;
    }

    prevBtn.disabled = false;
    beforeSlide.dataset.view = 'off';
    changeSlide.dataset.view = 'on';
    beforeIndicator.removeAttribute('data-select');
    changeIndicator.dataset.select = 'select';

    if (changeSlide.getAttribute('data-number') === 'last') {
        nextBtn.disabled = true;
    }

    if (changeSlide.getAttribute('data-number') === 'first') {
        prevBtn.disabled = true;
    }

    changePageNum();
};

document.addEventListener('DOMContentLoaded', () => {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    nextBtn.addEventListener('click', () => clickEventBtn('next'));
    prevBtn.addEventListener('click', () => clickEventBtn('prev'));
});

initializeDisplay();
createNextPrevBtn();
