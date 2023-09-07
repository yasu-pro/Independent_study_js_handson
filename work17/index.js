"use strict";
// DOM
const body = document.querySelector("body");
const slider = document.getElementById("slider");

const apiURL = "http://localhost:3000/data"

// 関数
const getData = async () => {
    const res = await fetch(apiURL);

    try {
        if (res.ok) {
            const json = await res.json();
            return json;
        } else {
            const error = new Error(`${res.status}:${res.statusText}`)
            error.response = res;
            throw error;
        }
    } catch (error) {
        displayError(error);
    }
}

const renderSlider = async () => {
    const sliderData = await getData();

    const sliderElement = createSliderElement(sliderData);
    slider.appendChild(sliderElement);

    const navList = createNavList(sliderData);
    const nextPrevBtnWrap = createNextPrevBtnWrap(sliderData);

    sliderElement.appendChild(nextPrevBtnWrap);
    sliderElement.appendChild(navList);

    disableNextPrevBtn(sliderData);
};

const createNavList = (sliderData) => {
    const navList = document.createElement("div");
    navList.classList = "navList";

    const focusElem = document.querySelector(".focus");
    const displayImageNum = getTargetClassNum(focusElem);

    navList.innerHTML = `<span class="displayNum" >${displayImageNum}</span> / <span class="totalNum" >${sliderData.length}</span>`

    return navList;

};

const disableNextPrevBtn = (sliderData) => {
    const focusElem = document.querySelector(".focus");
    const prevBtn = document.querySelector(".prevBtn");
    const nextBtn = document.querySelector(".nextBtn");

     // .focus クラスを持つ要素が見つからない場合、何もしない
    if (!focusElem) {
        return;
    }

    const currentImageIndex = getTargetClassNum(focusElem);

    if (currentImageIndex === 1) {
        prevBtn.setAttribute("disabled", "true");
        nextBtn.removeAttribute("disabled");
    }
    else if (currentImageIndex === sliderData.length) {
        nextBtn.setAttribute("disabled", "true");
        prevBtn.removeAttribute("disabled");
    }
    else {
        prevBtn.removeAttribute("disabled");
        nextBtn.removeAttribute("disabled");
    }
};

const displayError = (error) => {
    const errorMessageElem = document.createElement("div");
    errorMessageElem.id = "error-message";
    errorMessageElem.textContent = `エラーが発生しました: ${error.message}`;
    body.appendChild(errorMessageElem);
}

const createSliderList = (allSliderData) => {
    const ulElemSliderList = document.createElement("ul");
    ulElemSliderList.classList = "sliderList"
    const fragment = document.createDocumentFragment();

    allSliderData.forEach((sliderData, index) => {
        const liElemSliderLists = document.createElement("li");

        liElemSliderLists.classList = `sliderLists sliderLists_${sliderData.order}`;

        if (index === 0) {
            liElemSliderLists.classList.add("focus");
        } else if (index === 1) {
            liElemSliderLists.classList.add("next");
        } else if (index === allSliderData.length - 1) {
            liElemSliderLists.classList.add("prev");
        }

        liElemSliderLists.style.zIndex = -index;

        const img = document.createElement("img");
        img.src = sliderData.url;

        liElemSliderLists.appendChild(img);
        fragment.appendChild(liElemSliderLists);
    });
    ulElemSliderList.appendChild(fragment);

    return ulElemSliderList;
};

const createSliderElement = (sliderData) => {
    const sliderElement = document.createElement("div");
    sliderElement.classList = "sliderWrap";

    const sliderList =  createSliderList(sliderData);
    sliderElement.appendChild(sliderList);

    return sliderElement;
};

const createButton = (className, innerHTML) => {
    const button = document.createElement("button");
    button.classList = className;

    const span = document.createElement("span");
    span.classList = `${className}Icon`;
    span.innerHTML = innerHTML;

    button.appendChild(span);

    return button;
};

const createNextPrevBtnWrap = () => {
    const btnWrap = document.createElement("div");
    btnWrap.classList = "nextPrevBtnWrap";

    const nextBtn = createButton("nextBtn", "▶︎");
    const prevBtn = createButton("prevBtn", "◀︎");

    btnWrap.appendChild(nextBtn);
    btnWrap.appendChild(prevBtn);

    return btnWrap;
};

const getTargetClassNum = (targetElem) => {
    let number = null;
    const classNames = targetElem.className.split(" ");

    for (const className of classNames) {
        if (className.startsWith("sliderLists_")) {
            const match = className.match(/\d+/);
            if (match) {
                number = parseInt(match[0], 10);
                break;
            }
        }
    }
    return number;
};

const searchCurrentImageIndex = (nextOrPrev) => {
    let currentImageIndex = 0;
    const allSliderListsElem = document.getElementsByClassName("sliderLists")
    const allSliderListsArray = Array.from(allSliderListsElem);

    allSliderListsArray.find((sliderlist) => {
        if (sliderlist.className.includes("next") && nextOrPrev === "nextBtn") {
            const targetElem = sliderlist;
            currentImageIndex = getTargetClassNum(targetElem) - 1;

            return true;
        } else if (sliderlist.className.includes("prev") && nextOrPrev === "prevBtn") {
            const targetElem = sliderlist;
            currentImageIndex = getTargetClassNum(targetElem) - 1;

            return true;
        }
    });

    return currentImageIndex;
}

const changeSliderData = (currentSliderData, startingImageIndex) => {
    const newData = [...currentSliderData.slice(startingImageIndex), ...currentSliderData.slice(0, startingImageIndex)];
    return newData;
};

const deleteCurrentSliderList = () => {
    const elementsToRemove = document.querySelectorAll(".sliderLists");
    elementsToRemove.forEach(element => {
        element.remove();
    });
};

const reCreateSliderList = (newSliderListItemsArray) => {
    const targetSliderListElem = document.querySelector(".sliderList")
    targetSliderListElem.appendChild(newSliderListItemsArray);
};

const removeDisabled = () => {
    const prevBtnElem = document.querySelector(".prevBtn");
    const nextBtnElem = document.querySelector(".nextBtn");
    if (prevBtnElem.hasAttribute("disabled")) {
        prevBtnElem.removeAttribute("disabled");
    }

    if (nextBtnElem.hasAttribute("disabled")) {
        nextBtnElem.removeAttribute("disabled");
    }
};

const changeNavListDisplay = () => {
    const displayElem = document.querySelector(".focus");
    const changeDisplayNum = getTargetClassNum(displayElem);

    const targetElem = document.querySelector(".displayNum");

    targetElem.innerHTML = `<span class="displayNum" >${changeDisplayNum}</span>`
};

renderSlider();

// イベント
document.addEventListener("DOMContentLoaded", async () => {
    const sliderData = await getData();
    await nextPrevBtnClickEvent(sliderData);
});

const handleButtonClick = (sliderData, NextOrPrevClassName) => {
    const displayImageIndex = searchCurrentImageIndex(NextOrPrevClassName);
    const newSliderData = changeSliderData(sliderData, displayImageIndex);
    const newSliderListItemsArray = createSliderList(newSliderData);

    deleteCurrentSliderList();
    reCreateSliderList(newSliderListItemsArray);
    changeNavListDisplay();
    disableNextPrevBtn(sliderData);
};

const nextPrevBtnClickEvent = (sliderData) => {
    const parentElem = document.querySelector(".nextPrevBtnWrap");

    parentElem.addEventListener("click", (event) => {
        const clickedElem = event.target;
        const clickedClassName = clickedElem.className;

        if (clickedClassName === "nextBtn") {
            handleButtonClick(sliderData, clickedClassName);
        } else if (clickedClassName === "prevBtn") {
            handleButtonClick(sliderData, clickedClassName);
        };
    });
};

