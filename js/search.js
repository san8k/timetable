import {searchButton, searchInput} from './main';



export default () => {
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
}
