const memberTable = document.getElementById('memberTable');

const userFetchTime = 3000;
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
    const tr = document.createElement('tr');
    const fragment = document.createDocumentFragment();
    const keysArray = Object.keys(userData[0]);

    keysArray.forEach((key) => {
        const th = document.createElement('th');
        th.textContent = key;

        if (key === 'id') {
            const div = document.createElement('div');
            const img = document.createElement('img');
            div.classList.add('sortIcon', 'both');
            th.classList.add('id');

            img.src =
                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyNnB4IiB2aWV3Qm94PSIwIDAgMjAgMjYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczpieGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjx0aXRsZT5Hcm91cCA1PC90aXRsZT48ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBpZD0iR3JvdXAtNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDAuODU0NjI2KSIgZmlsbD0iI0ZGRkZGRiI+PHBvbHlnb24gaWQ9IlRyaWFuZ2xlIiBwb2ludHM9IjEwLjAwNDczMjcgMS43NzYzNTY4NGUtMTUgMjAuMDA5NDY1MyAxMC44MjIxMyAyLjQ4Njg5OTU4ZS0xNCAxMC44MjIxMyI+PC9wb2x5Z29uPjxwb2x5Z29uIGlkPSJUcmlhbmdsZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAuMDA0NzMzLCAxOS40MTEwNjUpIHNjYWxlKDEsIC0xKSB0cmFuc2xhdGUoLTEwLjAwNDczMywgLTE5LjQxMTA2NSkgIiBwb2ludHM9IjEwLjAwNDczMjcgMTQgMjAuMDA5NDY1MyAyNC44MjIxMyAyLjMwOTI2Mzg5ZS0xNCAyNC44MjIxMyI+PC9wb2x5Z29uPjwvZz48L2c+PC9zdmc+';
            div.appendChild(img);
            th.appendChild(div);
        }

        if (key === 'age') {
            const div = document.createElement('div');
            const img = document.createElement('img');
            div.classList.add('sortIcon', 'both');
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

    memberTable.appendChild(table);
};

const sortByNumber = (changeUserData, order, parentSortIconClassName) => {
    return changeUserData.sort((a, b) => {
        return order === 'asc'
            ? a[parentSortIconClassName] - b[parentSortIconClassName]
            : b[parentSortIconClassName] - a[parentSortIconClassName];
    });
};

const updateTableBody = (tableElem, userData) => {
    const currentTbody = document.getElementById('tbody');
    currentTbody.remove();
    const newTbody = createTableBody(userData);
    tableElem.appendChild(newTbody);
};

const toggleSortById = (userData, sortIcon, parentSortIconClassName) => {
    const tableElem = document.getElementById('table');
    const img = sortIcon.firstElementChild;

    if (sortIcon.classList.contains('both')) {
        sortIcon.classList.remove('both');
        sortIcon.classList.add('asc');

        img.src = SVG_SRC.ASC;

        const sortedData = sortByNumber(
            userData,
            'asc',
            parentSortIconClassName
        );
        updateTableBody(tableElem, sortedData);
    } else if (sortIcon.classList.contains('asc')) {
        sortIcon.classList.remove('asc');
        sortIcon.classList.add('desc');

        img.src = SVG_SRC.DESC;

        const sortedData = sortByNumber(
            userData,
            'desc',
            parentSortIconClassName
        );
        updateTableBody(tableElem, sortedData);
    } else {
        sortIcon.classList.remove('desc');
        sortIcon.classList.add('both');

        img.src = SVG_SRC.BOTH;

        updateTableBody(tableElem, userData);
    }
};

const toggleSortByAge = (userData, sortIcon, parentSortIconClassName) => {
    const tableElem = document.getElementById('table');
    const img = sortIcon.firstElementChild;

    if (sortIcon.classList.contains('both')) {
        sortIcon.classList.remove('both');
        sortIcon.classList.add('asc');

        img.src = SVG_SRC.ASC;

        const sortedData = sortByNumber(
            userData,
            'asc',
            parentSortIconClassName
        );
        updateTableBody(tableElem, sortedData);
    } else if (sortIcon.classList.contains('asc')) {
        sortIcon.classList.remove('asc');
        sortIcon.classList.add('desc');

        img.src = SVG_SRC.DESC;

        const sortedData = sortByNumber(
            userData,
            'desc',
            parentSortIconClassName
        );
        updateTableBody(tableElem, sortedData);
    } else {
        sortIcon.classList.remove('desc');
        sortIcon.classList.add('both');

        img.src = SVG_SRC.BOTH;

        updateTableBody(tableElem, userData);
    }
};

const setSortIconClickListener = () => {
    const sortIconItems = document.querySelectorAll('.sortIcon');

    sortIconItems.forEach((sortIcon) => {
        const parentSortIconClassName = sortIcon.parentNode.className;
        sortIcon.addEventListener('click', async () => {
            try {
                const userData = await fetchUser();
                toggleSortById(userData, sortIcon, parentSortIconClassName);
                toggleSortByAge(userData, sortIcon, parentSortIconClassName);
            } catch (error) {
                console.error('データ再取得中にエラーが発生しました: ', error);
            }
        });
    });
};

const app = async () => {
    try {
        const userData = await fetchUserData(userFetchTime);
        if (userData) {
            renderTableLayout(userData);
            setSortIconClickListener();
        }
    } catch (error) {
        console.error('エラーが発生しました:', error.message);
    }
};

app();
