const memberTable = document.getElementById('memberTable');

const userFetchTime = 3000;
const url = 'http://localhost:3000/data/';

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

        fragment.appendChild(th);
    });

    tr.appendChild(fragment);
    thead.appendChild(tr);

    return thead;
};

const createTableBody = (userData) => {
    const tbody = document.createElement('tbody');
    const fragment = document.createDocumentFragment();

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

    const tableHead = createTableHeader(userData);
    const tableBody = createTableBody(userData);

    table.appendChild(tableHead);
    table.appendChild(tableBody);

    memberTable.appendChild(table);
};

const app = async () => {
    try {
        const userData = await fetchUserData(userFetchTime);
        if (userData) {
            renderTableLayout(userData);
        }
    } catch (error) {
        console.error('エラーが発生しました:', error.message);
    }
};

app();
