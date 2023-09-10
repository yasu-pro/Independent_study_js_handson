// DOM
const sliderWrap = document.getElementById('js-slider');
const sliderList = document.getElementById('js-slider-list');

// API
const apiURL = 'http://localhost:3000/data';

// 関数
const createLoading = () => {
  const loading = document.createElement('img');
  loading.id = 'js-loading';
  loading.classList = 'load';
  loading.src = './img/loading-circle.gif';

  return loading;
};

const removeLoading = () => {
  document.getElementById('js-loading').remove();
};

const createErrorMessage = (error) => {
  const errorMessage = document.createElement('p');
  errorMessage.classList = 'errorMessage';

  errorMessage.textContent = error;

  return errorMessage;
};

const fetchHandling = async (response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error(`${response.status}:${response.statusText}`);
};

const getJsonOrError = async (url) => {
  const response = await fetch(url);
  const json = await fetchHandling(response);

  return json;
};

const getSlideImgData = async () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(getJsonOrError(apiURL));
  }, 3000);
});

const tryGetSlideImgData = async () => {
  sliderWrap.appendChild(createLoading());

  try {
    const sliderImgData = await getSlideImgData();
    if (sliderImgData.length === 0) {
      throw new Error('データがありません');
    }
    return sliderImgData;
  } catch (error) {
    sliderWrap.appendChild(createErrorMessage());
    throw error;
  } finally {
    removeLoading();
  }
};

const createElementWithClassName = (tag, className) => {
  const element = document.createElement(tag);
  element.classList = className;

  return element;
};

const createSliderItem = ({ url }) => {
  const sliderItem = document.createElement('li');
  const sliderImg = document.createElement('img');
  sliderImg.src = url;
  sliderItem.classList = 'sldierItem';
  sliderItem.appendChild(sliderImg);

  return sliderItem;
};

const initSliderItem = (imgSources) => {
  const fragment = document.createDocumentFragment();

  imgSources.forEach((imgSource, index) => {
    const sliderItem = createSliderItem(imgSource);

    // First, the class "is-display" is added by default.
    if (index === 0) {
      sliderItem.classList.add('is-display');
    }

    fragment.appendChild(sliderItem);
  });
  sliderList.appendChild(fragment);

  return sliderList;
};

const findOrderOfDisplayedItem = () => {
  const sliderItemArray = document.querySelectorAll('.sldierItem');
  const targetElem = [...sliderItemArray].findIndex((element) => element.classList.contains('is-display'));
  return targetElem + 1;
};

const createConterOfSlider = (data) => {
  const counterWrapper = createElementWithClassName('div', 'counterWrap');
  const orderOfDisplayedItem = createElementWithClassName(
    'span',
    'currentNum',
  );
  const totalSlideItem = createElementWithClassName('span', 'totalNum');

  totalSlideItem.textContent = data.length;
  orderOfDisplayedItem.textContent = findOrderOfDisplayedItem();

  counterWrapper
    .appendChild(orderOfDisplayedItem)
    .insertAdjacentHTML('afterend', '/');
  counterWrapper.appendChild(totalSlideItem);

  return counterWrapper;
};

const switchImage = (direction) => {
  let targetElement;
  const displayingItem = document.querySelector('.is-display');

  displayingItem.classList.remove('is-display');
  if (direction === 'next') {
    targetElement = displayingItem.nextElementSibling;
  } else if (direction === 'prev') {
    targetElement = displayingItem.previousElementSibling;
  }
  targetElement.classList.add('is-display');
};

const changeCounterOfSlider = () => {
  document.querySelector('.currentNum').textContent = findOrderOfDisplayedItem();
};

const toggleDisabledBtn = (target) => {
  const firstSlideItem = sliderList.firstElementChild;
  const lastSlideItem = sliderList.lastElementChild;

  if (
    firstSlideItem.classList.contains('is-display') || lastSlideItem.classList.contains('is-display')
  ) {
    target.setAttribute('disabled', true);
  } else {
    const disabledElement = document.querySelector('[disabled]');
    if (disabledElement) {
      disabledElement.removeAttribute('disabled');
    }
  }
};

const handleNextPrevBtnClicked = () => {
  const arrowButtons = document.querySelectorAll('.arrowBtn');
  arrowButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const clickedElement = event.currentTarget;

      if (clickedElement.classList.contains('--nextBtn')) {
        switchImage('next');
      } else if (clickedElement.classList.contains('--prevBtn')) {
        switchImage('prev');
        // handleNextButtonClick();
      }
      changeCounterOfSlider();
      toggleDisabledBtn(clickedElement);
    });
  });
};

const createNextPrevButton = () => {
  const nextPrevBtnWrap = createElementWithClassName(
    'div',
    'nextPrevBtnWrap',
  );
  const nextBtn = createElementWithClassName('button', 'arrowBtn --nextBtn');
  nextBtn.id = 'js-nextBtn';
  const prevBtn = createElementWithClassName('button', 'arrowBtn --prevBtn');
  prevBtn.id = 'js-prevBtn';

  nextBtn.textContent = '▶︎';
  prevBtn.textContent = '◀︎';

  // First, give disabled to prevBtn by default.
  if (prevBtn.classList.contains('--prevBtn')) {
    prevBtn.setAttribute('disabled', true);
  }

  nextPrevBtnWrap.appendChild(nextBtn);
  nextPrevBtnWrap.appendChild(prevBtn);

  return nextPrevBtnWrap;
};

const initNextPrevBtn = () => {
  const nextPrevBtn = createNextPrevButton();
  sliderWrap.appendChild(nextPrevBtn);
  handleNextPrevBtnClicked();
};

const init = async () => {
  const imgData = await tryGetSlideImgData();

  if (imgData) {
    initSliderItem(imgData);
    initNextPrevBtn();
    sliderWrap.appendChild(createConterOfSlider(imgData));
  }
};

init();
