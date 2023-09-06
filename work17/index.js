"use strict";
// DOM
const body = document.querySelector("body");
const slider = document.getElementById("slider");

const apiURL = "http://localhost:3000/data"

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

const displayError = (error) => {
    const errorMessageElem = document.createElement("div");
    errorMessageElem.id = "error-message";
    errorMessageElem.textContent = `エラーが発生しました: ${error.message}`;
    body.appendChild(errorMessageElem);
}

const createSliderList = (allSliderData) => {
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

    return fragment;
};

const createSliderElem = (sliderData) => {
    const divElemSliderWrap = document.createElement("div");
    divElemSliderWrap.classList = "sliderWrap";
    const ulElemSliderList = document.createElement("ul");
    ulElemSliderList.classList = "sliderList"

    const liElemSliderLists =  createSliderList(sliderData);

    divElemSliderWrap.appendChild(ulElemSliderList);
    ulElemSliderList.appendChild(liElemSliderLists);

    return divElemSliderWrap;
};

const createNextPrevBtnWrap = () => {
    const divElemNextPrevBtnWrap = document.createElement("div");
    divElemNextPrevBtnWrap.classList = "nextPrevBtnWrap";
    const buttonElemNextBtn = document.createElement("button");
    buttonElemNextBtn.classList = "nextBtn";
    const spanElemNextIcon = document.createElement("div");
    spanElemNextIcon.classList = "nextBtnIcon";
    spanElemNextIcon.innerHTML = "▶︎";
    const buttonElemPrevBtn = document.createElement("button");
    buttonElemPrevBtn.classList = "prevBtn";
    const spanElemPrevIcon = document.createElement("div");
    spanElemPrevIcon.classList = "prevBtnIcon";
    spanElemPrevIcon.innerHTML = "◀︎";

    buttonElemNextBtn.appendChild(spanElemNextIcon);
    buttonElemPrevBtn.appendChild(spanElemPrevIcon);
    divElemNextPrevBtnWrap.appendChild(buttonElemNextBtn);
    divElemNextPrevBtnWrap.appendChild(buttonElemPrevBtn);

    return divElemNextPrevBtnWrap;
};

const createNavList = async (sliderData) => {
    const allSliderData = await sliderData;
    const displayElem = document.querySelector(".focus");

    const displayImageNum = getTargetClassNum(displayElem);

    const divElemNavList = document.createElement("div");
    divElemNavList.classList = "navList";

    divElemNavList.innerHTML = `<span class="displayNum" >${displayImageNum}</span> / <span class="totalNum" >${allSliderData.length}</span>`

    return divElemNavList;

};

const renderElem = async () => {
    const sliderData = await getData();

    const divElemSliderWrap = await createSliderElem(sliderData);
    const divElemNextPrevBtnWrap = await createNextPrevBtnWrap(sliderData);

    slider.appendChild(divElemSliderWrap);
    divElemSliderWrap.appendChild(divElemNextPrevBtnWrap);
    const dottedList = await createNavList(sliderData);
    console.log(dottedList);
    divElemSliderWrap.appendChild(dottedList);

    diabledNextPrevBtn(sliderData);
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
            console.log(currentImageIndex);

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

const diabledNextPrevBtn = async (sliderData) => {
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


const changeNavListDisplay = () => {
    const displayElem = document.querySelector(".focus");
    const changeDisplayNum = getTargetClassNum(displayElem);

    const targetElem = document.querySelector(".displayNum");

    targetElem.innerHTML = `<span class="displayNum" >${changeDisplayNum}</span>`
};

const nextPrevBtnClickEvent = (sliderData) => {
    const parentElem = document.querySelector(".nextPrevBtnWrap");

    parentElem.addEventListener("click", (event) => {
        let newSliderListItemsArray;

        const clickedElem = event.target;
        const clickedClassName = clickedElem.className;

        if (clickedClassName === "nextBtn") {
            const nextDisplayImageIndex = searchCurrentImageIndex(clickedClassName);
            const newSliderData = changeSliderData(sliderData, nextDisplayImageIndex);

            newSliderListItemsArray = createSliderList(newSliderData);
        } else if (clickedClassName === "prevBtn") {
            const prevDisplayImageIndex = searchCurrentImageIndex(clickedClassName);
            const newSliderData = changeSliderData(sliderData, prevDisplayImageIndex);

            newSliderListItemsArray = createSliderList(newSliderData);
        };

        deleteCurrentSliderList();
        reCreateSliderList(newSliderListItemsArray);
        changeNavListDisplay();
        diabledNextPrevBtn(sliderData);
    })
};


document.addEventListener("DOMContentLoaded", async () => {
    const sliderData = await getData();
    await nextPrevBtnClickEvent(sliderData);
});

renderElem();
