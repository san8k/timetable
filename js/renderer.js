import {schedule, delayedCheckbox} from './main';
import loadData from './loader';

let currentSchedule;

const responseStatusToRussian = {
    delayed: 'Задерживается',
    expected: 'Ожидается',
    landed: 'Приземлился',
    canceled: 'Отменен',
    registration: 'Идет регистрация'
};

const createNode = (name, classList, content) => {
    const element = document.createElement(name);
    element.classList.add(classList);
    element.textContent = content;
    return element;
};

const renderData = (data) => {
    const tableRow = createNode(`div`, `schedule__row`);
    for(let key in data) {
        let nodeClass = (key === `departure` || key === `destination`) ? `airport`: key;
        const tableCell = createNode(`span`, `schedule__${nodeClass}`, data[key]);
        if (data[key] === `canceled`) {
            tableCell.classList.add(`schedule__status--canceled`);
        }
        tableRow.appendChild(tableCell);
    }
    tableRow.lastChild.textContent = responseStatusToRussian[tableRow.lastChild.textContent];
    schedule.appendChild(tableRow);
};

export const getData = async (url) => {
    try {
        currentSchedule = await loadData(url);
    } catch(err) {
        console.error(err);
    }
};

export const showSchedule = () => {
    let arr = currentSchedule;
    schedule.innerHTML = ``;
    if (delayedCheckbox.checked) {
        arr = currentSchedule.filter((flight) => flight.status === `delayed`);
    }
    arr.forEach((flight) => {
        renderData(flight);
    });
}

