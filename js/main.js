import {getData, showSchedule} from './renderer';
import search from './search';
import debounce from './debounce';

const Url = {
    DEPARTURE: `http://aviation-edge.com/v2/public/timetable?key=ea377a-dc8bf1&iataCode=ARH&type=departure`,
    ARRIVAL: `http://aviation-edge.com/v2/public/timetable?key=ea377a-dc8bf1&iataCode=ARH&type=arrival`
};

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
    await getData(Url.DEPARTURE);
    debouncedSchedule();
};

async function onArrivalClick() {
    searchInput.value = ``;
    departureButton.classList.remove(`button--active`);
    this.classList.add(`button--active`);
    await getData(Url.ARRIVAL);
    debouncedSchedule();
};

departureButton.addEventListener(`click`, onDepartureClick);
arrivalButton.addEventListener(`click`, onArrivalClick);
delayedCheckbox.addEventListener(`change`, () => {
    searchInput.value = ``;
    debouncedSchedule();
});

window.onload = async () => {
    await getData(Url.DEPARTURE);
    showSchedule();
    departureButton.classList.add(`button--active`);
    search();
}

export {searchButton, searchInput, schedule, delayedCheckbox};
