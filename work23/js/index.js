const memberTable = document.getElementById('memberTable');

const userFetchTime = 3000;
const DISPLAYITEM = 5;
let isSortBtnPressed = false;
const url = 'http://localhost:3000/data/';

const SVG_SRC = {
    BOTH: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyNnB4IiB2aWV3Qm94PSIwIDAgMjAgMjYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczpieGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjx0aXRsZT5Hcm91cCA1PC90aXRsZT48ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBpZD0iR3JvdXAtNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDAuODU0NjI2KSIgZmlsbD0iI0ZGRkZGRiI+PHBvbHlnb24gaWQ9IlRyaWFuZ2xlIiBwb2ludHM9IjEwLjAwNDczMjcgMS43NzYzNTY4NGUtMTUgMjAuMDA5NDY1MyAxMC44MjIxMyAyLjQ4Njg5OTU4ZS0xNCAxMC44MjIxMyI+PC9wb2x5Z29uPjxwb2x5Z29uIGlkPSJUcmlhbmdsZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAuMDA0NzMzLCAxOS40MTEwNjUpIHNjYWxlKDEsIC0xKSB0cmFuc2xhdGUoLTEwLjAwNDczMywgLTE5LjQxMTA2NSkgIiBwb2ludHM9IjEwLjAwNDczMjcgMTQgMjAuMDA5NDY1MyAyNC44MjIxMyAyLjMwOTI2Mzg5ZS0xNCAyNC44MjIxMyI+PC9wb2x5Z29uPjwvZz48L2c+PC9zdmc+',
    ASC: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4gPHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyNnB4IiB2aWV3Qm94PSIwIDAgMjAgMjYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICAgICA8dGl0bGU+R3JvdXAgNTwvdGl0bGU+ICAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgICAgICA8ZyBpZD0iR3JvdXAtNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDAuODU0NjI2KSI+ICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJUcmlhbmdsZSIgZmlsbD0iIzAwMDAwMCIgcG9pbnRzPSIxMC4wMDQ3MzI3IDEuNzc2MzU2ODRlLTE1IDIwLjAwOTQ2NTMgMTAuODIyMTMgMi40ODY4OTk1OGUtMTQgMTAuODIyMTMiPjwvcG9seWdvbj4gICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlRyaWFuZ2xlIiBmaWxsPSIjRDhEOEQ4IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMC4wMDQ3MzMsIDE5LjQxMTA2NSkgc2NhbGUoMSwgLTEpIHRyYW5zbGF0ZSgtMTAuMDA0NzMzLCAtMTkuNDExMDY1KSAiIHBvaW50cz0iMTAuMDA0NzMyNyAxNCAyMC4wMDk0NjUzIDI0LjgyMjEzIDIuMzA5MjYzODllLTE0IDI0LjgyMjEzIj48L3BvbHlnb24+ICAgICAgICAgPC9nPiAgICAgPC9nPiA8L3N2Zz4=',
    DESC: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4gPHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyNnB4IiB2aWV3Qm94PSIwIDAgMjAgMjYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczpieGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjx0aXRsZT5Hcm91cCA1PC90aXRsZT48ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBpZD0iR3JvdXAtNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDAuODU0NjI2KSI+ICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJUcmlhbmdsZSIgZmlsbD0iI0Q4RDhEOCIgcG9pbnRzPSIxMC4wMDQ3MzI3IDEuNzc2MzU2ODRlLTE1IDIwLjAwOTQ2NTMgMTAuODIyMTMgMi40ODY4OTk1OGUtMTQgMTAuODIyMTMiPjwvcG9seWdvbj4gICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlRyaWFuZ2xlIiBmaWxsPSIjMDAwMDAwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMC4wMDQ3MzMsIDE5LjQxMTA2NSkgc2NhbGUoMSwgLTEpIHRyYW5zbGF0ZSgtMTAuMDA0NzMzLCAtMTkuNDExMDY1KSAiIHBvaW50cz0iMTAuMDA0NzMyNyAxNCAyMC4wMDk0NjUzIDI0LjgyMjEzIDIuMzA5MjYzODllLTE0IDI0LjgyMjEzIj48L3BvbHlnb24+ICAgICAgICAgPC9nPiAgICAgPC9nPiA8L3N2Zz4=',
};

const fetchUserData = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const userData = await fetchUser();
                return resolve(userData);
            } catch (error) {
                return reject(error);
            }
        }, ms);
    });
};

const fetchUser = async () => {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Response Error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        const errorMessageElem = createErrorMessage(error.message);
        memberTable.appendChild(errorMessageElem);
        console.error('エラーが発生しました:', error.message);
        throw error;
    }
};

const createErrorMessage = (message) => {
    const div = document.createElement('div');
    const p = document.createElement('p');
    div.classList.add('errorMessage');

    p.textContent = `エラーが発生しました: ${message}`;

    div.appendChild(p);
    return div;
};

const createTableHeader = (userData) => {
    const thead = document.createElement('thead');
    thead.id = 'thead';
    const tr = document.createElement('tr');
    const fragment = document.createDocumentFragment();
    const keysArray = Object.keys(userData[0]);

    keysArray.forEach((key) => {
        const th = document.createElement('th');
        th.textContent = key;

        if (key === 'id') {
            const div = document.createElement('div');
            const img = document.createElement('img');
            div.classList.add('sortIcon', 'sort-id', 'both');
            th.classList.add('id');

            img.src =
                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyNnB4IiB2aWV3Qm94PSIwIDAgMjAgMjYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczpieGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjx0aXRsZT5Hcm91cCA1PC90aXRsZT48ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBpZD0iR3JvdXAtNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDAuODU0NjI2KSIgZmlsbD0iI0ZGRkZGRiI+PHBvbHlnb24gaWQ9IlRyaWFuZ2xlIiBwb2ludHM9IjEwLjAwNDczMjcgMS43NzYzNTY4NGUtMTUgMjAuMDA5NDY1MyAxMC44MjIxMyAyLjQ4Njg5OTU4ZS0xNCAxMC44MjIxMyI+PC9wb2x5Z29uPjxwb2x5Z29uIGlkPSJUcmlhbmdsZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAuMDA0NzMzLCAxOS40MTEwNjUpIHNjYWxlKDEsIC0xKSB0cmFuc2xhdGUoLTEwLjAwNDczMywgLTE5LjQxMTA2NSkgIiBwb2ludHM9IjEwLjAwNDczMjcgMTQgMjAuMDA5NDY1MyAyNC44MjIxMyAyLjMwOTI2Mzg5ZS0xNCAyNC44MjIxMyI+PC9wb2x5Z29uPjwvZz48L2c+PC9zdmc+';
            div.appendChild(img);
            th.appendChild(div);
        }

        if (key === 'age') {
            const div = document.createElement('div');
            const img = document.createElement('img');
            div.classList.add('sortIcon', 'sort-age', 'both');
            th.classList.add('age');

            img.src =
                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyNnB4IiB2aWV3Qm94PSIwIDAgMjAgMjYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczpieGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjx0aXRsZT5Hcm91cCA1PC90aXRsZT48ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBpZD0iR3JvdXAtNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDAuODU0NjI2KSIgZmlsbD0iI0ZGRkZGRiI+PHBvbHlnb24gaWQ9IlRyaWFuZ2xlIiBwb2ludHM9IjEwLjAwNDczMjcgMS43NzYzNTY4NGUtMTUgMjAuMDA5NDY1MyAxMC44MjIxMyAyLjQ4Njg5OTU4ZS0xNCAxMC44MjIxMyI+PC9wb2x5Z29uPjxwb2x5Z29uIGlkPSJUcmlhbmdsZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAuMDA0NzMzLCAxOS40MTEwNjUpIHNjYWxlKDEsIC0xKSB0cmFuc2xhdGUoLTEwLjAwNDczMywgLTE5LjQxMTA2NSkgIiBwb2ludHM9IjEwLjAwNDczMjcgMTQgMjAuMDA5NDY1MyAyNC44MjIxMyAyLjMwOTI2Mzg5ZS0xNCAyNC44MjIxMyI+PC9wb2x5Z29uPjwvZz48L2c+PC9zdmc+';
            div.appendChild(img);
            th.appendChild(div);
        }

        fragment.appendChild(th);
    });

    tr.appendChild(fragment);
    thead.appendChild(tr);

    return thead;
};

const createTableBody = (userData) => {
    const tbody = document.createElement('tbody');
    const fragment = document.createDocumentFragment();

    tbody.id = 'tbody';

    userData.forEach((user) => {
        const tr = document.createElement('tr');
        const userValuesArray = Object.values(user);

        userValuesArray.forEach((value) => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });
        fragment.appendChild(tr);
    });
    tbody.appendChild(fragment);

    return tbody;
};

const renderTableLayout = (userData) => {
    const table = document.createElement('table');
    table.id = 'table';

    const tableHead = createTableHeader(userData);
    const tableBody = createTableBody(userData);

    table.appendChild(tableHead);
    table.appendChild(tableBody);

    return table;
};

const sortByNumber = (changeUserData, order, sortIconElem) => {
    return changeUserData.sort((a, b) => {
        if (sortIconElem.classList.contains('sort-id')) {
            return order === 'asc' ? a.id - b.id : b.id - a.id;
        } else {
            return order === 'asc' ? a.age - b.age : b.age - a.age;
        }
    });
};

const updateTableBody = (tableElem, userData) => {
    const currentTbody = document.getElementById('tbody');
    currentTbody.remove();
    const newTbody = createTableBody(userData);
    tableElem.appendChild(newTbody);
};

const toggleSortById = (sortIconElem, userData) => {
    let copyUserData = [...userData];
    const defaultData = [...userData];
    const img = sortIconElem.firstElementChild;
    const sortIconAgeElem = document.querySelector('.sort-age');

    sortIconAgeElem.classList.remove('on');

    if (sortIconElem.classList.contains('both')) {
        sortIconElem.classList.remove('both');
        sortIconElem.classList.add('asc', 'on');

        img.src = SVG_SRC.ASC;

        const sortedData = sortByNumber(copyUserData, 'asc', sortIconElem);

        return sortedData;
    } else if (sortIconElem.classList.contains('asc')) {
        sortIconElem.classList.remove('asc');
        sortIconElem.classList.add('desc', 'on');

        img.src = SVG_SRC.DESC;

        const sortedData = sortByNumber(copyUserData, 'desc', sortIconElem);

        return sortedData;
    } else {
        sortIconElem.classList.remove('desc');
        sortIconElem.classList.add('both', 'on');

        img.src = SVG_SRC.BOTH;

        return defaultData;
    }
};

const toggleSortByAge = (sortIconElem, userData) => {
    let copyUserData = [...userData];
    const defaultData = [...userData];
    const img = sortIconElem.firstElementChild;
    const sortIconIdElem = document.querySelector('.sort-id');

    sortIconIdElem.classList.remove('on');

    if (sortIconElem.classList.contains('both')) {
        sortIconElem.classList.remove('both');
        sortIconElem.classList.add('asc', 'on');

        img.src = SVG_SRC.ASC;

        const sortedData = sortByNumber(copyUserData, 'asc', sortIconElem);
        return sortedData;
    } else if (sortIconElem.classList.contains('asc')) {
        sortIconElem.classList.remove('asc');
        sortIconElem.classList.add('desc', 'on');

        img.src = SVG_SRC.DESC;

        const sortedData = sortByNumber(copyUserData, 'desc', sortIconElem);
        return sortedData;
    } else {
        sortIconElem.classList.remove('desc');
        sortIconElem.classList.add('both', 'on');

        img.src = SVG_SRC.BOTH;

        return defaultData;
    }
};

const refreshPagiNationData = (userData) => {
    const prevBtn = document.querySelector('.prevBtn');
    const nextBtn = document.querySelector('.nextBtn');

    const eratorNumElem = document.querySelector('.eratorNum');

    nextBtn.disabled = false;
    prevBtn.disabled = true;

    const displayEratorNum = 1;
    eratorNumElem.textContent = displayEratorNum;

    const refreshUserData = userData.slice(
        DISPLAYITEM * displayEratorNum - DISPLAYITEM,
        DISPLAYITEM * displayEratorNum
    );

    return refreshUserData;
};

const sortIconByIdClickListener = (userData) => {
    const sortIconElem = document.querySelector('.sort-id');
    sortIconElem.addEventListener('click', () => {
        const defaultData = [...userData];
        const sortData = toggleSortById(sortIconElem, userData, defaultData);
        const refreshUserData = refreshPagiNationData(sortData);
        changedPagination(refreshUserData);
    });
};

const sortIconByAgeClickListener = (userData) => {
    const sortIconElem = document.querySelector('.sort-age');
    sortIconElem.addEventListener('click', () => {
        const defaultData = [...userData];
        const sortData = toggleSortByAge(sortIconElem, userData, defaultData);
        const refreshUserData = refreshPagiNationData(sortData);
        changedPagination(refreshUserData);
    });
};

const createPaginationBtn = (userDataLength) => {
    const paginationNum = createPaginationNum(userDataLength);
    const paginationWrapper = document.createElement('div');
    paginationWrapper.classList.add('paginationWrapper');

    const prevBtnArea = document.createElement('div');
    const nextBtnArea = document.createElement('div');

    const prevBtn = document.createElement('button');
    const nextBtn = document.createElement('button');

    prevBtn.classList.add('btn', 'prevBtn');
    prevBtn.id = 'prev';
    prevBtn.textContent = '<';
    prevBtn.disabled = true;
    nextBtn.classList.add('btn', 'nextBtn');
    nextBtn.id = 'next';
    nextBtn.textContent = '>';

    const prevBtnText = document.createElement('span');
    prevBtnArea.classList.add('btnArea', 'btnArea--prev');
    prevBtnText.classList.add('btnText', 'btnText--prev');
    prevBtnText.textContent = 'Back';

    const nextBtnText = document.createElement('span');
    nextBtnArea.classList.add('btnArea', 'btnArea--next');
    nextBtnText.classList.add('btnText', 'btnText--next');
    nextBtnText.textContent = 'Next';

    prevBtnArea.appendChild(prevBtn);
    prevBtnArea.appendChild(prevBtnText);

    nextBtnArea.appendChild(nextBtn);
    nextBtnArea.appendChild(nextBtnText);

    paginationWrapper.appendChild(prevBtnArea);
    paginationWrapper.appendChild(paginationNum);
    paginationWrapper.appendChild(nextBtnArea);

    return paginationWrapper;
};

const createPaginationNum = (userDataLength) => {
    const paginationNumWrapper = document.createElement('div');
    paginationNumWrapper.classList.add('paginationNumWrapper');

    const totalPages = Math.ceil(userDataLength / DISPLAYITEM);

    const denominator = document.createElement('div');
    const denominatorText = document.createElement('span');
    denominatorText.classList.add('num', 'denominatorNum');
    denominatorText.textContent = totalPages;
    denominator.appendChild(denominatorText);

    const parentheses = document.createElement('div');
    const parenthesesText = document.createElement('span');
    parenthesesText.classList.add('parentheses');
    parenthesesText.textContent = '/';
    parentheses.appendChild(parenthesesText);

    const numerator = document.createElement('div');
    const numeratorText = document.createElement('span');
    numeratorText.classList.add('num', 'eratorNum');
    numeratorText.textContent = '1';
    numerator.appendChild(numeratorText);

    paginationNumWrapper.appendChild(numerator);
    paginationNumWrapper.appendChild(parentheses);
    paginationNumWrapper.appendChild(denominator);

    return paginationNumWrapper;
};

const renderPagination = (userDataLength) => {
    const PaginationBtn = createPaginationBtn(userDataLength);

    return PaginationBtn;
};

const memberTableLayout = (slicedUserData) => {
    const paginationElem = document.querySelector('.paginationWrapper');

    const tableElem = renderTableLayout(slicedUserData);
    paginationElem.before(tableElem);
};

const paginationLayout = (userDataLength) => {
    const paginationElem = renderPagination(userDataLength);

    memberTable.appendChild(paginationElem);
};

const setSortIconClickListener = (userData, slicedUserData) => {
    sortIconByIdClickListener(userData, slicedUserData);
    sortIconByAgeClickListener(userData, slicedUserData);
};

const changedPagination = (slicedUserData) => {
    const theadElem = document.getElementById('thead');
    const tbodyElem = document.getElementById('tbody');
    tbodyElem.remove();

    const tableBody = createTableBody(slicedUserData);
    theadElem.after(tableBody);
};

const clickedPaginationBtn = async (userData) => {
    let baseUserData = [...userData];
    const defaultData = [...userData];
    const prevBtn = document.querySelector('.prevBtn');
    const nextBtn = document.querySelector('.nextBtn');

    prevBtn.addEventListener('click', () => {
        const eratorNumElem = document.querySelector('.eratorNum');
        const eratorNum = Number(eratorNumElem.textContent);
        const sortIconIdElem = document.querySelector('.sort-id');
        const sortIconAgeElem = document.querySelector('.sort-age');
        let sortUserData;

        nextBtn.disabled = false;

        if (eratorNum > 1) {
            prevBtn.disabled = false;
            const displayEratorNum = eratorNum - 1;
            eratorNumElem.textContent = displayEratorNum;

            if (displayEratorNum === 1) {
                prevBtn.disabled = true;
            }

            // sort id
            if (sortIconIdElem.classList.contains('on')) {
                if (sortIconIdElem.classList.contains('asc')) {
                    sortUserData = sortByNumber(
                        baseUserData,
                        'asc',
                        sortIconIdElem
                    );
                } else if (sortIconIdElem.classList.contains('desc')) {
                    sortUserData = sortByNumber(
                        baseUserData,
                        'desc',
                        sortIconIdElem
                    );
                } else {
                    sortUserData = defaultData;
                }
            }

            // sort age
            if (sortIconAgeElem.classList.contains('on')) {
                if (
                    sortIconAgeElem.classList.contains('on') &&
                    sortIconAgeElem.classList.contains('asc')
                ) {
                    sortUserData = sortByNumber(
                        baseUserData,
                        'asc',
                        sortIconAgeElem
                    );
                } else if (sortIconAgeElem.classList.contains('desc')) {
                    sortUserData = sortByNumber(
                        baseUserData,
                        'desc',
                        sortIconAgeElem
                    );
                } else {
                    sortUserData = defaultData;
                }
            }

            const prevUserData = sortUserData.slice(
                DISPLAYITEM * displayEratorNum - DISPLAYITEM,
                DISPLAYITEM * displayEratorNum
            );

            changedPagination(prevUserData);
        }
    });

    nextBtn.addEventListener('click', () => {
        const eratorNumElem = document.querySelector('.eratorNum');
        const eratorNum = Number(eratorNumElem.textContent);
        const sortIconIdElem = document.querySelector('.sort-id');
        const sortIconAgeElem = document.querySelector('.sort-age');
        let sortUserData;

        const totalPages = Math.ceil(userData.length / DISPLAYITEM);

        prevBtn.disabled = false;

        if (eratorNum < totalPages) {
            nextBtn.disabled = false;
            const displayEratorNum = eratorNum + 1;
            eratorNumElem.textContent = displayEratorNum;

            if (displayEratorNum === totalPages) {
                nextBtn.disabled = true;
            }

            // sort id
            if (sortIconIdElem.classList.contains('on')) {
                if (sortIconIdElem.classList.contains('asc')) {
                    sortUserData = sortByNumber(
                        baseUserData,
                        'asc',
                        sortIconIdElem
                    );
                } else if (sortIconIdElem.classList.contains('desc')) {
                    sortUserData = sortByNumber(
                        baseUserData,
                        'desc',
                        sortIconIdElem
                    );
                } else {
                    sortUserData = defaultData;
                }
            }

            // sort age
            if (sortIconAgeElem.classList.contains('on')) {
                if (
                    sortIconAgeElem.classList.contains('on') &&
                    sortIconAgeElem.classList.contains('asc')
                ) {
                    sortUserData = sortByNumber(
                        baseUserData,
                        'asc',
                        sortIconAgeElem
                    );
                } else if (sortIconAgeElem.classList.contains('desc')) {
                    sortUserData = sortByNumber(
                        baseUserData,
                        'desc',
                        sortIconAgeElem
                    );
                } else {
                    sortUserData = defaultData;
                }
            }

            const nextUserData = sortUserData.slice(
                DISPLAYITEM * eratorNum,
                DISPLAYITEM * eratorNum + DISPLAYITEM
            );

            changedPagination(nextUserData);
        }
    });
};

const app = async () => {
    try {
        const userData = await fetchUserData(userFetchTime);

        if (userData) {
            const slicedUserData = userData.slice(0, DISPLAYITEM);
            const userDataLength = userData.length;
            paginationLayout(userDataLength);
            memberTableLayout(slicedUserData);
            setSortIconClickListener(userData, slicedUserData);
            clickedPaginationBtn(userData);
        }
    } catch (error) {
        console.error('エラーが発生しました:', error.message);
    }
};

app();
