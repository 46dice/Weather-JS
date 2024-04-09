import { elements } from "./elementsUI.js";
import { changeValuesInMainCity, changeValuesInExtraElementsInUi, dataUI, renderHistory } from "./operations_On_Weather.js";

const cityInLocalStorage = localStorage.getItem('city');
const listFavoriteCityes = JSON.parse(localStorage.getItem('favoriteCityes'));

const localstorageBtn = document.querySelector('.localStorage');
if (localstorageBtn) {
    localstorageBtn.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    });
}

export function saveToLocalStorageFavoriteCites(list) {
    const string = JSON.stringify(list);
    const checkToCityInData = list.includes(string);
    if (checkToCityInData) return

    localStorage.setItem('favoriteCityes', string);
}

export function deleteFavoriteCityInLocalStorage(city) {
    const favoriteCityes = JSON.parse(localStorage.favoriteCityes);
    const index = favoriteCityes.findIndex(item => item === city);
    favoriteCityes.splice(index, 1);
    localStorage.setItem('favoriteCityes', JSON.stringify(favoriteCityes));
}

export function saveToLocalStorageMainCity(city) {
    localStorage.setItem('city', JSON.stringify(city));
}

if (cityInLocalStorage === null) {
    saveToLocalStorageMainCity(elements.city.textContent); //изначально LocalStorage пустой
    changeValuesInMainCity(elements.city.textContent); //вызываем сохраненный город из LocalStorage
    changeValuesInExtraElementsInUi(elements.city.textContent);
} else {
    const parseToCityInLocalStorage = JSON.parse(cityInLocalStorage);
    elements.city.textContent = parseToCityInLocalStorage;
    saveToLocalStorageMainCity(elements.city.textContent);
    changeValuesInMainCity(parseToCityInLocalStorage); //вызываем сохраненный город из LocalStorage
    changeValuesInExtraElementsInUi(parseToCityInLocalStorage);
}

if (listFavoriteCityes === null) {
    const newData = ["Екатеринбург", "Советский"];
    saveToLocalStorageFavoriteCites(newData);
    renderHistory(elements.locationsList, newData);
} else {
    dataUI.push(...listFavoriteCityes);
    renderHistory(elements.locationsList);
}
