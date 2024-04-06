import { elements } from "./elementsUI.js";
import { changeWeatherAndCityInDOM, changeTimeOfValueAndTemperature, dataUI, renderHistory } from "./operations_On_Weather.js";

const cityInLocalStorage = localStorage.getItem('city');
const listFavoriteCityes = JSON.parse(localStorage.getItem('favoriteCityes'));

export function saveToLocalStorageFavoriteCityes(list) {
    const string = JSON.stringify(list);
    const checkToCityInData = list.includes(string);
    if (checkToCityInData) return

    localStorage.setItem('favoriteCityes', string);
}

export function deleteFavoriteCityInLocalStorage(city) {
    const favoriteCityes = JSON.parse(localStorage.favoriteCityes);
    const index = favoriteCityes.findIndex(item => item === city);
    favoriteCityes.splice(index, 1);
    localStorage.setItem('favoriteCityes', JSON.stringify(favoriteCityes))
}

export function saveToLocalStorageMainCity(city) {
    localStorage.setItem('city', city);
}

if (cityInLocalStorage === null) {
    saveToLocalStorageMainCity(elements.city.textContent); //изначально LocalStorage пустой
} else {
    changeWeatherAndCityInDOM(cityInLocalStorage); //вызываем сохраненный город из LocalStorage
    changeTimeOfValueAndTemperature(cityInLocalStorage);
}

if (listFavoriteCityes === null) {
    const newData = ["Екатеринбург", "Советский"];
    saveToLocalStorageFavoriteCityes(newData);
    renderHistory(elements.locationsList, newData);
} else {
    dataUI.push(...listFavoriteCityes);
    renderHistory(elements.locationsList);
}
