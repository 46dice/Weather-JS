import { elements } from "./elementsUI.js";
const serverUrl = 'https://api.openweathermap.org/data/2.5/';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';

function showElement(elem) {
    elem.classList.remove('visibility-hide');
    elem.classList.add('visibility-show');
}

function hideElement(elem) {
    elem.classList.remove('visibility-show');
    elem.classList.add('visibility-hide');
}

async function checkResponse(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Не найдено");

        hideElement(elements.elementError);
        const data = await response.json();
        return data;

    } catch (error) {
        const elementError = document.querySelector('.error');
        showElement(elements.elementError);
        elementError.textContent = `${error}`;

        setTimeout(() => {
            hideElement(elements.elementError);
        }, 4000); //через 4 сек убирает сообщение об ошибке
    }
}

export async function getWeatherFromServerMain(nameCity) {
    const url = `${serverUrl}weather?q=${nameCity}&appid=${apiKey}&lang=ru&units=metric`;

    showElement(elements.elementError);
    elements.elementError.textContent = "Обновляю ваш город...";

    return await checkResponse(url);
}

export async function getTimestampAndWeatherFromServerForecast(nameCity) {
    const url = `${serverUrl}forecast?q=${nameCity}&appid=${apiKey}&lang=ru&units=metric`;

    return await checkResponse(url);
}

