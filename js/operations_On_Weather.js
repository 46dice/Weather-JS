import { elements } from "./elementsUI.js";
import { getResponseFromServer, getValueOfTimeFromServer } from "./request.js";

export let dataUI = [];

export function renderHistory(list) {
    list.innerHTML = "";

    dataUI.forEach(city => {
        const newElem = document.createElement('li');
        newElem.classList.add('locations__list-item');
        newElem.innerHTML = `
        <span class="locations__list-item-city" data-city="cityName">${city}</span> 
        <button class="btn-delete">X</button>    
        `
        list.appendChild(newElem);
    });
}

export function changeWeatherAndCityInDOM(city) {
    const data = getResponseFromServer(city);

    data.then(data => {
        elements.city.textContent = data.name;
        elements.weatherValue.textContent = `${(data.main.temp).toFixed()}°`;
        elements.description.textContent = data.weather[0].description;

        const image = data.weather[0].icon;
        const imageURL = `https://openweathermap.org/img/wn/${image}@4x.png`
        elements.image.src = imageURL;
    });
}

export function changeTempAndDateInUI(i, data, element) {
    const dt = data.list[i].dt * 1000;
    const hours = new Date(dt).getHours();
    const minutes = new Date(dt).getMinutes();
    element.time.textContent = `${hours}:${minutes}0`;

    const feelsLikeTemperature = data.list[i].main.feels_like;
    const temperature = data.list[i].main.temp;

    if (feelsLikeTemperature > 0 && temperature > 0) {
        element.temperature.textContent = `+${(data.list[i].main.temp).toFixed()}`;
        element.feelsLike.textContent = `+${(data.list[i].main.feels_like).toFixed()}`;
    } else {
        element.temperature.textContent = `${(data.list[i].main.temp).toFixed()}`;
        element.feelsLike.textContent = `${(data.list[i].main.feels_like).toFixed()}`;
    }

    element.img.src = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@4x.png`;
}

export function changeTimeOfValueAndTemperature(city) {
    const data = getValueOfTimeFromServer(city);

    data.then(data => {
        const sunriseHours = (new Date(data.city.sunrise * 1000)).getHours();
        const sunriseMinutes = (new Date(data.city.sunrise * 1000)).getMinutes();
        const sunsetHours = (new Date(data.city.sunset * 1000)).getHours();
        const sunsetMinutes = (new Date(data.city.sunset * 1000)).getMinutes();

        const feelsLikeTemperature = data.list[0].main.feels_like;
        if (feelsLikeTemperature > 0) {
            elements.extraElements.feelsLike.textContent = `+${feelsLikeTemperature.toFixed()}°`; //+t°
        } else {
            elements.extraElements.feelsLike.textContent = `${feelsLikeTemperature.toFixed()}°`; //-t°
        }

        elements.extraElements.sunrise.textContent = `${sunriseHours}:${sunriseMinutes}`;
        elements.extraElements.sunset.textContent = `${sunsetHours}:${sunsetMinutes}`;
        changeTempAndDateInUI(1, data, elements.timeElements.firstList);
        changeTempAndDateInUI(2, data, elements.timeElements.secondList);
        changeTempAndDateInUI(3, data, elements.timeElements.thirdList);
    })
}

export function deleteCityInFavourites(city) {
    const newData = dataUI.filter(item => item !== city)
    dataUI = newData;
    renderHistory(elements.locationsList);
}

export function addCityInFavourites(city) {
    const checkCityInDataUI = dataUI.includes(city.textContent);
    if (checkCityInDataUI) return

    const newData = [];
    newData.push(city.textContent);
    dataUI.push(...newData);
    renderHistory(elements.locationsList);
}