"use strict";
// DOM
const body = document.querySelector("body");
const divElemSliderWrap = document.querySelector(".slider");

const defaultImageIndex = 1;

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

const createSliderList = (sliderData, imageIndex = defaultImageIndex) => {
    const fragment = document.createDocumentFragment();
    console.log(imageIndex);

    const topLayerImageNum = imageIndex;
    sliderData.forEach(sliderData => {
        const liElemSliderLists = document.createElement("li");
        liElemSliderLists.classList = `sliderLists sliderLists_${imageIndex}`;

        liElemSliderLists.style.zIndex = -imageIndex;

        if (imageIndex === topLayerImageNum) {
            liElemSliderLists.classList.add("focus");
        }

        const img = document.createElement("img");
        img.src = sliderData.url;

        liElemSliderLists.appendChild(img);
        fragment.appendChild(liElemSliderLists);

        imageIndex++;
    });

    return fragment;
};

const createSliderElem = (sliderData) => {
    const divElemSliderWrap = document.createElement("div");
    divElemSliderWrap.classList = "slider";
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
    const divElemNextBtn = document.createElement("div");
    divElemNextBtn.classList = "nextBtn";
    const spanElemNextIcon = document.createElement("span");
    spanElemNextIcon.classList = "nextBtnIcon";
    spanElemNextIcon.innerHTML = "▶︎";
    const divElemPrevBtn = document.createElement("div");
    divElemPrevBtn.classList = "prevBtn";
    const spanElemPrevIcon = document.createElement("div");
    spanElemPrevIcon.classList = "prevBtnIcon";
    spanElemPrevIcon.innerHTML = "◀︎";

    divElemNextBtn.appendChild(spanElemNextIcon);
    divElemPrevBtn.appendChild(spanElemPrevIcon);
    divElemNextPrevBtnWrap.appendChild(divElemNextBtn);
    divElemNextPrevBtnWrap.appendChild(divElemPrevBtn);

    console.log("hoge1");

    return divElemNextPrevBtnWrap;
};

const renderElem = async () => {
    const sliderData = await getData();

    const divElemSliderWrap = await createSliderElem(sliderData);
    const divElemNextPrevBtnWrap = createNextPrevBtnWrap();
    body.appendChild(divElemSliderWrap);
    divElemSliderWrap.appendChild(divElemNextPrevBtnWrap);
};

const searchCurrentImageIndex = () => {
    const allSliderListsElem = document.getElementsByClassName("sliderLists")
    const allSliderListsArray = Array.from(allSliderListsElem);

    let currentImageIndex = 0;
    allSliderListsArray.find((sliderlist, index) => {
        if (sliderlist.className.includes("focus")) {
            currentImageIndex = index;
            return true;
        }
    })

    return currentImageIndex;
}

const changeSliderData = (currentSliderData, displayImageIndex) => {
    const newData = [...currentSliderData.slice(displayImageIndex), ...currentSliderData.slice(0, displayImageIndex)];
    return newData;
};

const nextPrevBtnClickEvent = (sliderData) => {
    const parentElem = document.querySelector(".nextPrevBtnWrap");
    let currentSliderData = sliderData;

    parentElem.addEventListener("click", (event) => {
        const clickedElem = event.target;
        const clickedClassName = clickedElem.className;

        if (clickedClassName === "nextBtnIcon") {
            const currentDisplayImageIndex = searchCurrentImageIndex();
            const nextDisplayImageIndex = currentDisplayImageIndex + 1;

            console.log(nextDisplayImageIndex);
            const newSliderData = changeSliderData(currentSliderData, nextDisplayImageIndex);
            currentSliderData = newSliderData;
            console.log(currentSliderData);
            // createSliderList(newSliderData, nextDisplayImageIndex);
        } else {
            const currentDisplayImageIndex = searchCurrentImageIndex();
            const prevDisplayImageIndex = currentDisplayImageIndex - 1;
            const newSliderData = changeSliderData(currentSliderData, prevDisplayImageIndex);
            currentSliderData = newSliderData;
            console.log(currentSliderData);
            // createSliderList(newSliderData, prevDisplayImageIndex);
        }

    })

};

renderElem();

document.addEventListener("DOMContentLoaded", async () => {
    const sliderData = await getData();

    await nextPrevBtnClickEvent(sliderData);
});

