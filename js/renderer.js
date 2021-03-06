import {schedule, delayedCheckbox} from './main';
import loadData from './loader';
import apiDataToTranslate from './data-transformator';

export const createNewElement = (name, classList, content) => {
    const element = document.createElement(name);
    element.classList = classList;
    element.textContent = content;
    return element;
};

export const renderData = (data) => {
    const tableRow = createNewElement(`div`, `schedule__row`);

    if (data.type === `departure`) {
    
        for(let key in data) {

            let tableCell;
            switch (key) {
                case `status`:
                    let currentStatus = data[key];
                    if (data.departure.delay) {
                        currentStatus = `delayed`;
                    }
                    tableCell = createNewElement(`span`, `schedule__status`, currentStatus);
                    if (data[key] === `cancelled`) {
                        tableCell.classList.add(`schedule__status--cancelled`);
                    }
                    break;
                case `departure`:
                    let hours = new Date(data[key].scheduledTime).getHours();
                    let minutes = new Date(data[key].scheduledTime).getMinutes().toString().length < 2 ? `0${new Date(data[key].scheduledTime).getMinutes()}` : new Date(data[key].scheduledTime).getMinutes();
                    tableCell = createNewElement(`span`, `schedule__time`, `${hours}:${minutes}`);
                    break;
                case `arrival`:
                    tableCell = createNewElement(`span`, `schedule__airport`, data[key].iataCode);
                    break;
                case `flight`:
                    tableCell = createNewElement(`span`, `schedule__number`, data[key].iataNumber);
            }
            if (tableCell) {
                tableRow.appendChild(tableCell);
            }
        }
        const statusCell = tableRow.firstChild.cloneNode(true);
        tableRow.removeChild(tableRow.firstChild);
        tableRow.appendChild(statusCell);

    } else if (data.type === `arrival`) {

        for(let key in data) {

            let tableCell;
            switch (key) {
                case `status`:
                    let currentStatus = data[key];
                    if (data.arrival.delay) {
                        currentStatus = `delayed`;
                    }
                    tableCell = createNewElement(`span`, `schedule__status`, currentStatus);
                    if (data[key] === `cancelled`) {
                        tableCell.classList.add(`schedule__status--cancelled`);
                    }
                    break;                
                case `departure`:
                    tableCell = createNewElement(`span`, `schedule__airport`, data[key].iataCode);
                    break;
                case `arrival`:
                    let hours = new Date(data[key].scheduledTime).getHours();
                    let minutes = new Date(data[key].scheduledTime).getMinutes().toString().length < 2 ? `0${new Date(data[key].scheduledTime).getMinutes()}` : new Date(data[key].scheduledTime).getMinutes();
                    tableCell = createNewElement(`span`, `schedule__time`, `${hours}:${minutes}`);
                    break;
                case `flight`:
                    tableCell = createNewElement(`span`, `schedule__number`, data[key].iataNumber);
            }
            if (tableCell) {
                tableRow.appendChild(tableCell);
            }
        }
        const statusCell = tableRow.firstChild.cloneNode(true);
        tableRow.removeChild(tableRow.firstChild);
        tableRow.appendChild(statusCell);
        const destCell = tableRow.firstChild.cloneNode(true);
        tableRow.removeChild(tableRow.firstChild);
        tableRow.insertBefore(destCell, tableRow.children[1]);
    }
    
    tableRow.lastChild.textContent = apiDataToTranslate.responseStatusToRussian[tableRow.lastChild.textContent] ||
    tableRow.lastChild.textContent;
    tableRow.children[1].textContent = apiDataToTranslate.airportCodeToCity[tableRow.children[1].textContent] ||
    `Аэропорт: ${tableRow.children[1].textContent}`;
    schedule.appendChild(tableRow);
};

export const flightsTimetable = {};

export const getData = async (url) => {
    try {
        flightsTimetable.currentSchedule = await loadData(url);
    } catch(err) {
        console.error(err);
    }
};

export const showSchedule = (specialData = flightsTimetable.currentSchedule) => {
    let data = specialData;
    const filterDelayed = (flight) => {
        if (flight.type === `departure` && flight.departure.delay) {
            return flight;
        }
        if (flight.type === `arrival` && flight.arrival.delay) {
            return flight;
        }
    };
    schedule.innerHTML = ``;
    if (delayedCheckbox.checked) {
        data = data.filter(filterDelayed);
    }
    data.forEach((flight) => {
        renderData(flight);
    });
}

