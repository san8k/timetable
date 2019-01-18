import {getData, showSchedule} from './renderer';
import search from './search';

const timetable = document.querySelector(`.timetable`)
const schedule = timetable.querySelector(`.schedule`);
const departureButton = timetable.querySelector(`.destinations-menu__departure`);
const arrivalButton = timetable.querySelector(`.destinations-menu__arrival`);
const delayedCheckbox = timetable.querySelector(`.delay-menu__checkbox`);
const searchInput = timetable.querySelector(`.search-menu__input`);
const searchButton = timetable.querySelector(`.search-menu__button`);

async function onDepartureClick() {
    this.classList.add(`button--active`);
    arrivalButton.classList.remove(`button--active`);
    await getData(`../test-data/departure.json`);
    showSchedule();
};

async function onArrivalClick() {
    departureButton.classList.remove(`button--active`);
    this.classList.add(`button--active`);
    await getData(`../test-data/arrival.json`);
    showSchedule();
};

departureButton.addEventListener(`click`, onDepartureClick);
arrivalButton.addEventListener(`click`, onArrivalClick);
delayedCheckbox.addEventListener(`change`, () => {
    showSchedule();
});

window.onload = async () => {
    await getData(`../test-data/departure.json`);
    showSchedule();
    departureButton.classList.add(`button--active`);
    search();
}

export {searchButton, searchInput, schedule, delayedCheckbox};
