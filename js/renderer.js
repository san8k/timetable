import {schedule} from './main';

function createNode(name, classList, content) {
    const element = document.createElement(name);
    element.classList.add(classList);
    element.textContent = content;
    return element;
}

export default (data) => {
    const tableRow = createNode(`div`, `schedule__row`);
    for(let key in data) {
        let nodeClass = (key === `departure` || key === `destination`) ? `airport`: key;
        const tableCell = createNode(`span`, `schedule__${nodeClass}`, data[key]);
        if (data[key] === `canceled`) {
            tableCell.classList.add(`schedule__status--canceled`);
        }
        tableRow.appendChild(tableCell);
    }
    schedule.appendChild(tableRow);
};