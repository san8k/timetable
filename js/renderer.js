import {schedule} from './main';

function createElement(name, classList, content) {
    const element = document.createElement(name);
    element.classList.add(classList);
    element.textContent = content;
    return element;
}

export default (data) => {
    const tableRow = createElement(`div`, `schedule__row`);
    for(let key in data) {
        if (key === `departure` || key === `destination`) {
            tableRow.appendChild(createElement(`span`, `schedule__airport`, data[key]));
            continue;
        }
        tableRow.appendChild(createElement(`span`, `schedule__${key}`, data[key]));
    }
    schedule.appendChild(tableRow);
};