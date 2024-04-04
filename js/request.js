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

export function getResponseFromServer(nameCity) {
    const url = `${serverUrl}weather?q=${nameCity}&appid=${apiKey}&lang=ru&units=metric`;

    showElement(elements.elementError);
    elements.elementError.textContent = "Ищу город...";

    return fetch(url)
        .then(response => {
            if (response.ok) {
                hideElement(elements.elementError);
                return response.json();
            }
            if (response.status === 404) {
                throw new Error("Не найдено");
            }
        })
        .catch(error => {
            const elementError = document.querySelector('.error');
            showElement(elements.elementError);
            elementError.textContent = `${error}`;

            setTimeout(() => {
                hideElement(elements.elementError);
            }, 4000); //через 4 сек убирает сообщение об ошибке
        })
}

export function getValueOfTimeFromServer(nameCity) {
    const url = `${serverUrl}forecast?q=${nameCity}&appid=${apiKey}&lang=ru&units=metric`;

    return fetch(url)
        .then(response => {
            if (response.ok) {
                hideElement(elements.elementError);
                return response.json();
            }
            if (response.status === 404) {
                throw new Error("Не найдено");
            }
        })
        .catch(error => {
            const elementError = document.querySelector('.error');
            showElement(elements.elementError);
            elementError.textContent = `${error}`;

            setTimeout(() => {
                hideElement(elements.elementError);
            }, 4000); //через 4 сек убирает сообщение об ошибке
        })
}

