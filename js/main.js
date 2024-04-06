import { elements } from "./elementsUI.js";
import { dataUI, changeWeatherAndCityInDOM, deleteCityInFavourites, addCityInFavourites, changeTimeOfValueAndTemperature } from "./operations_On_Weather.js";
import { saveToLocalStorageMainCity, saveToLocalStorageFavoriteCityes } from "./localstorage.js";

elements.locationsList.addEventListener('click', (event) => {
    const target = event.target;

    const checkBtnDeleteOnClick = target.classList.contains('btn-delete');
    const checkCityOnClick = target.classList.contains('locations__list-item-city');

    if (checkBtnDeleteOnClick) {
        const city = target.previousElementSibling.textContent; //Костыль? находим "соседа" от кнопки удаления
        deleteCityInFavourites(city);
    } else if (checkCityOnClick) {
        const city = target.textContent;
        changeWeatherAndCityInDOM(city);
        changeTimeOfValueAndTemperature(city);
    }
});

function handleAddCityInFavourites() {
    addCityInFavourites(elements.city);
    saveToLocalStorageFavoriteCityes(dataUI);
}

elements.btnLove.addEventListener('click', handleAddCityInFavourites);

elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = elements.inputCity.value.replace(/\s/g, "");
    changeWeatherAndCityInDOM(inputValue);
    changeTimeOfValueAndTemperature(inputValue);
    saveToLocalStorageMainCity(inputValue);
    elements.form.reset();
});


