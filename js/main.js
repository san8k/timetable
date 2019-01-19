import {getData, showSchedule} from './renderer';
import search from './search';
import debounce from './debounce';

const timetable = document.querySelector(`.timetable`)
const schedule = timetable.querySelector(`.schedule`);
const departureButton = timetable.querySelector(`.destinations-menu__departure`);
const arrivalButton = timetable.querySelector(`.destinations-menu__arrival`);
const delayedCheckbox = timetable.querySelector(`.delay-menu__checkbox`);
const searchInput = timetable.querySelector(`.search-menu__input`);
const searchButton = timetable.querySelector(`.search-menu__button`);

const debouncedSchedule = debounce(showSchedule);

async function onDepartureClick() {
    searchInput.value = ``;
    this.classList.add(`button--active`);
    arrivalButton.classList.remove(`button--active`);
    await getData(`../test-data/departure.json`);
    debouncedSchedule();
};

async function onArrivalClick() {
    searchInput.value = ``;
    departureButton.classList.remove(`button--active`);
    this.classList.add(`button--active`);
    await getData(`../test-data/arrival.json`);
    debouncedSchedule();
};

departureButton.addEventListener(`click`, onDepartureClick);
arrivalButton.addEventListener(`click`, onArrivalClick);
delayedCheckbox.addEventListener(`change`, () => {
    debouncedSchedule();
});

window.onload = async () => {
    await getData(`../test-data/departure.json`);
    showSchedule();
    departureButton.classList.add(`button--active`);
    search();
}

export {searchButton, searchInput, schedule, delayedCheckbox};
