import {schedule, delayedCheckbox} from './main';
import loadData from './loader';

const responseStatusToRussian = {
    delayed: 'Задерживается',
    expected: 'Ожидается',
    landed: 'Приземлился',
    canceled: 'Отменен',
    registration: 'Идет регистрация'
};

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
            // let nodeClass = (key === `departure` || key === `destination`) ? `airport`: key;
            // const tableCell = createNewElement(`span`, `schedule__${key}`, data[key]);
            // if (data[key] === `canceled`) {
            //     tableCell.classList.add(`schedule__status--canceled`);
            // }

            // let tableCell;
            switch (key) {
                case `status`:
                    // tableCell = createNewElement(`span`, `schedule__status`, data[key]);
                    if (data.departure.delay) {
                        console.log(`delayed ++++++++`)
                    } else {
                        console.log(data[key]);
                    }
                    
                    break;
                case `departure`:
                    console.log(data[key].scheduledTime);           
                    break;
                case `arrival`:
                    console.log(data[key].iataCode);
                    break;
                case `flight`:
                    console.log(data[key].iataNumber);
            }


            // console.log(`${new Date(data.departure.scheduledTime).getHours()}:${new Date(data.departure.scheduledTime).getMinutes()}`);
            // tableRow.appendChild(tableCell);
        }
    } else if (data.type === `arrival`) {

        for(let key in data) {
            // let nodeClass = (key === `departure` || key === `destination`) ? `airport`: key;
            // const tableCell = createNewElement(`span`, `schedule__${key}`, data[key]);
            // if (data[key] === `canceled`) {
            //     tableCell.classList.add(`schedule__status--canceled`);
            // }

            // let tableCell;
            switch (key) {
                case `status`:
                    // tableCell = createNewElement(`span`, `schedule__status`, data[key]);
                    if (data.arrival.delay) {
                        console.log(`delayed ++++++++`)
                    } else {
                        console.log(data[key]);
                    }
                    
                    break;
                case `arrival`:
                    console.log(data[key].scheduledTime);           
                    break;
                case `departure`:
                    console.log(data[key].iataCode);
                    break;
                case `flight`:
                    console.log(data[key].iataNumber);
            }
        }

    }
    
    // tableRow.lastChild.textContent = responseStatusToRussian[tableRow.lastChild.textContent];
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
    schedule.innerHTML = ``;
    if (delayedCheckbox.checked) {
        data = specialData.filter((flight) => flight.status === `delayed`);
    }
    data.forEach((flight) => {
        renderData(flight);
    });
}

