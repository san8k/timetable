import loadData from './loader';
import renderData from './renderer';

const timetable = document.querySelector(`.timetable`)
const schedule = timetable.querySelector(`.schedule`);
const departureButton = timetable.querySelector(`.destinations-menu__departure`);
const arrivalButton = timetable.querySelector(`.destinations-menu__arrival`);
const searchInput = timetable.querySelector(`.search-menu__input`);
const searchButton = timetable.querySelector(`.search-menu__button`);
const delayButton = timetable.querySelector(`.delay-menu__button`);

function search() {
    searchButton.addEventListener(`click`, () => {
        if(searchInput.value) {
            console.log(searchInput.value.toUpperCase());
        }
    });
    searchInput.addEventListener(`keydown`, function(evt) {
        if (this.value && evt.key === `Enter`) {
            console.log(this.value.toUpperCase());
        }
    });
};

const showData = async (url) => {
    try {
        const schedule = await loadData(url);
        schedule.forEach((flight) => {
            renderData(flight);
        });
    } catch(err) {
        console.error(err);
    }
};

function onDepartureClick() {
    this.classList.add(`button--active`);
    arrivalButton.classList.remove(`button--active`);
    schedule.innerHTML = ``;
    showData(`../test-data/departure.json`);
};

function onArrivalClick() {
    departureButton.classList.remove(`button--active`);
    this.classList.add(`button--active`);
    schedule.innerHTML = ``;
    showData(`../test-data/arrival.json`);
};

departureButton.addEventListener(`click`, onDepartureClick);
arrivalButton.addEventListener(`click`, onArrivalClick);


window.onload = () => {
    showData(`../test-data/departure.json`);
    departureButton.classList.add(`button--active`);
}


export {schedule};