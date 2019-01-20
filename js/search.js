import {searchButton, searchInput, schedule} from './main';
import {showSchedule, flightsTimetable, createNewElement} from './renderer';
import debounce from './debounce';

const showSearchFail = () => {
    const failSearchRow = createNewElement(`div`, `schedule__row schedule__row--fail-search`);
    failSearchRow.innerHTML = `
        <span class="fail-search-message">Рейсы с таким номером не найдены</span>
    `;
    schedule.innerHTML = ``;
    schedule.appendChild(failSearchRow);
}

const onSearch = (elem) => {
    const findedFlights = flightsTimetable.currentSchedule.filter((it) => it.flight.iataNumber.includes(elem.value.toUpperCase().trim()));
    if (findedFlights.length > 0) {
        showSchedule(findedFlights);
    } else {
        showSearchFail();
    }
};

const debouncedSearch = debounce(onSearch);

export default () => {
    searchButton.addEventListener(`click`, () => {
        if(searchInput.value) {
            onSearch(searchInput);
        }
    });
    
    searchInput.addEventListener(`keydown`, function(evt) {
        if (this.value && evt.key === `Enter`) {
            onSearch(this);
        } else if (!this.value) {
            showSchedule();
        }
    });

    searchInput.addEventListener(`input`, function() {
        debouncedSearch(this);

    });
}
