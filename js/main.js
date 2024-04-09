import { elements } from "./elementsUI.js";
import { changeValuesInMainCity, deleteCityInFavorites, addCityInFavorites, changeValuesInExtraElementsInUi, dataUI } from "./operations_On_Weather.js";
import { saveToLocalStorageMainCity, saveToLocalStorageFavoriteCites, deleteFavoriteCityInLocalStorage } from "./localstorage.js";

elements.locationsList.addEventListener('click', (event) => {
    const target = event.target;

    const checkBtnDeleteOnClick = target.classList.contains('btn-delete');
    const checkCityOnClick = target.classList.contains('locations__list-item-city');

    if (checkBtnDeleteOnClick) {
        const city = target.previousElementSibling.textContent; //Костыль? находим "соседа" от кнопки удаления
        deleteCityInFavorites(city);
        deleteFavoriteCityInLocalStorage(city);
    } else if (checkCityOnClick) {
        const city = target.textContent;
        changeValuesInMainCity(city);
        changeValuesInExtraElementsInUi(city);
    }
});

function handleAddCityInFavorites() {
    addCityInFavorites(elements.city);
    saveToLocalStorageFavoriteCites(dataUI);
}

elements.btnLove.addEventListener('click', handleAddCityInFavorites);

elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = elements.inputCity.value.replace(/\s/g, "");
    changeValuesInMainCity(inputValue);
    changeValuesInExtraElementsInUi(inputValue);
    saveToLocalStorageMainCity(inputValue);
    elements.form.reset();
});


