'use strict';
// DOM
const newsArea = document.getElementById('js-news');
const errorMessageElem = document.createElement('div');
errorMessageElem.id = 'error-message';

const apiURL = 'http://localhost:3000/contentsUI';

// 関数
const getData = async () => {
    try {
        lazyLoad();
        const response = await fetch(apiURL);
        if (response.ok) {
            const json = await response.json();
            deleteLazyLoad();
            return json;
        } else {
            const error = new Error(
                `${response.status}:${response.statusText}`
            );
            error.response = response;
            throw error;
        }
    } catch (e) {
        deleteLazyLoad();
        errorMessageElem.textContent = `エラーが発生しました: ${e.message}`;
        console.error('エラーが発生しました:', e.message);
        newsArea.appendChild(errorMessageElem);
        throw new Error(e);
    }
};

const createCategoryTab = async (listData) => {
    const tabTopicsWrap = createTabTopicsWrap();
    const fragment = document.createDocumentFragment();
    const ulElemTabs = createElemTabs();

    listData.forEach((categoryData) => {
        const liElem = document.createElement('li');

        if (categoryData.isFirstDisplay) {
            liElem.classList = `tab ${categoryData.category} select`;
        } else {
            liElem.classList = `tab ${categoryData.category}`;
        }

        const aElem = document.createElement('a');
        liElem.appendChild(aElem);

        let categoryTitle = '';

        switch (categoryData.category) {
            case 'news':
                categoryTitle = 'ニュース';
                break;

            case 'economy':
                categoryTitle = '経済';
                break;

            case 'entertainment':
                categoryTitle = 'エンタメ';
                break;

            case 'sports':
                categoryTitle = 'スポーツ';
                break;

            case 'domestic':
                categoryTitle = '国内';
                break;

            default:
                break;
        }

        aElem.innerText = categoryTitle;
        fragment.appendChild(liElem);
    });

    ulElemTabs.appendChild(fragment);
    ulElemTabs.classList = 'tabTopics';

    tabTopicsWrap.appendChild(ulElemTabs);

    return tabTopicsWrap;
};

const createTabPanel = async (listData) => {
    const sectionElem = document.createElement('section');
    const divElemTabPanelWrap = document.createElement('div');
    divElemTabPanelWrap.classList = 'tabPanelWrap';

    const newsContentNode = await displayInitialNews(listData);

    divElemTabPanelWrap.appendChild(newsContentNode);
    sectionElem.appendChild(divElemTabPanelWrap);

    return sectionElem;
};

const displayInitialNews = async (listData) => {
    const displayCategoryAllNews = await getNewsDisplayStatus(listData);
    const newsContent = displayNews(displayCategoryAllNews);

    return newsContent;
};

const createTabTopicsWrap = () => {
    const div = document.createElement('div');
    div.classList.add('tabTopicsWrap');

    return div;
};

const renderElem = async (listData) => {
    const newsAreaWrap = document.createElement('div');
    const divElemTabTopics = await createCategoryTab(listData);
    const sectionElem = await createTabPanel(listData);

    newsAreaWrap.classList.add('newsAreaWrap');

    newsAreaWrap.appendChild(divElemTabTopics);
    newsAreaWrap.appendChild(sectionElem);
    newsArea.appendChild(newsAreaWrap);
};

const toggleNewsDisplay = async (changeNewsData) => {
    const divElemMainNewsContent = document.querySelector('.mainNewsContent');
    const divElemTabPanelWrap = document.querySelector('.tabPanelWrap');

    divElemMainNewsContent.remove();

    const changeNewsElem = displayNews(changeNewsData);

    divElemTabPanelWrap.appendChild(changeNewsElem);
};

const selectCategoryNewsData = async (listData, className) => {
    const clickedCategory = formatCategoryName(className);

    const changeNewsData = listData.filter((newsCategoy) => {
        return newsCategoy.category === clickedCategory;
    });

    return changeNewsData;
};

const lazyLoad = () => {
    const div = document.createElement('div');
    div.classList = 'newsLoadImg';
    const img = document.createElement('img');
    img.src = './img/loading-circle.gif';

    div.appendChild(img);
    newsArea.appendChild(div);
};

const deleteLazyLoad = () => {
    const loadElem = document.querySelector('.newsLoadImg');
    loadElem.remove();
};

const getNewsDisplayStatus = (listData) => {
    const displayCategoryAllNews = listData.filter((newsDisplay) => {
        return newsDisplay.isFirstDisplay === true;
    });

    return displayCategoryAllNews;
};

const displayNews = (newsData) => {
    const ulElem = document.createElement('ul');
    ulElem.classList = 'newsList';
    const fragment = document.createDocumentFragment();
    const divElemMainNewsContent = document.createElement('div');
    divElemMainNewsContent.classList = 'mainNewsContent';

    newsData.forEach((newsItem) => {
        // 各カテゴリーの画像表示
        const divElemCategoryImg = document.createElement('div');
        divElemCategoryImg.classList = 'categoryImg';
        const imgElem = document.createElement('img');
        const categoryImage = newsItem.img;
        imgElem.src = categoryImage;

        divElemCategoryImg.appendChild(imgElem);

        // ニュース記事の要素作成
        newsItem.contents.forEach((news) => {
            const liElem = document.createElement('li');

            const aElemAritcleLink = document.createElement('a');
            aElemAritcleLink.classList = 'articleLink';
            const h1Elem = document.createElement('h1');

            h1Elem.innerText = news.title;

            liElem.appendChild(aElemAritcleLink);
            aElemAritcleLink.appendChild(h1Elem);

            if (news.comments !== 0) {
                const spanElemComentIcon = document.createElement('span');
                spanElemComentIcon.classList = 'commentIcon';
                const aElemComentLink = document.createElement('a');

                const commentTotal = news.comments;
                aElemComentLink.innerHTML = `
          <i class="fas fa-regular fa-comment"></i>
          <span class="commentIconNum">${commentTotal}</span>`;

                spanElemComentIcon.appendChild(aElemComentLink);
                liElem.appendChild(spanElemComentIcon);
            }

            if (news.isNew) {
                const spanElemNewIcon = document.createElement('span');
                spanElemNewIcon.classList = 'newIcon';
                spanElemNewIcon.innerHTML = 'New';
                aElemAritcleLink.appendChild(spanElemNewIcon);
            }
            fragment.appendChild(liElem);
        });
        divElemMainNewsContent.appendChild(divElemCategoryImg);
    });

    ulElem.appendChild(fragment);
    divElemMainNewsContent.insertBefore(
        ulElem,
        divElemMainNewsContent.firstChild
    );

    return divElemMainNewsContent;
};

const formatCategoryName = (className) => {
    const deleteClassSelect = className.replace('select', '');
    const categoryName = deleteClassSelect.replace('tab', '').trim();
    return categoryName;
};

const removeClassSelect = (ulElemTabs) => {
    const selectedListItem = ulElemTabs.querySelector('li.select');

    if (selectedListItem) {
        selectedListItem.classList.remove('select');
    }
};

const addClassSelect = (listItem) => {
    const existingClasses = listItem.className;

    const hasSelectClass = existingClasses.includes('select');

    if (!hasSelectClass) {
        listItem.classList.add('select');
    }
};

const toggleClassSelect = (ulElemTabs, listItem) => {
    removeClassSelect(ulElemTabs);
    addClassSelect(listItem);
};

const createElemTabs = () => {
    const ul = document.createElement('ul');
    ul.id = 'js_tabs';
    ul.classList.add('tabTopics');

    return ul;
};

// イベント
document.addEventListener('DOMContentLoaded', async () => {
    const listData = await getData();
    await renderElem(listData);

    const ulElemTabs = document.querySelector('.tabTopics');

    ulElemTabs.addEventListener('click', async (event) => {
        // クリックされた要素がリストアイテム（<li>要素またはその子要素）であるかを確認
        const listItem = event.target.closest('li');
        if (listItem) {
            const clickListElemClassName = listItem.className;

            const changeNewsData = await selectCategoryNewsData(
                listData,
                clickListElemClassName
            );

            toggleClassSelect(ulElemTabs, listItem);
            toggleNewsDisplay(changeNewsData);
        }
    });
});
