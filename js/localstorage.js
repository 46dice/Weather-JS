import { elements } from "./elementsUI.js";
import { changeWeatherAndCityInDOM, changeTimeOfValueAndTemperature, renderHistory, dataUI } from "./operations_On_Weather.js";

const cityInLocalStorage = localStorage.getItem('city');
const listFavoriteCityes = JSON.parse(localStorage.getItem('favoriteCityes'));
dataUI.push(...listFavoriteCityes);

changeWeatherAndCityInDOM(cityInLocalStorage); //вызываем сохраненный город из LocalStorage
changeTimeOfValueAndTemperature(cityInLocalStorage);
renderHistory(elements.locationsList);

export function saveToLocalStorageMainCity(city) {
    localStorage.setItem('city', city);
}

export function saveToLocalStorageFavoriteCityes(list) {
    const string = JSON.stringify(list);
    localStorage.setItem('favoriteCityes', string);
}