const elements = {
    form: document.querySelector('.form'),
    inputCity: document.querySelector('.form__input-text'),
    weatherValue: document.querySelector('.weather__value'),
    city: document.querySelector('.weather__city'),
    image: document.querySelector('.weather__image'),
    description: document.querySelector('.weather__description'),
    elementError: document.querySelector('.error'),
    btnLove: document.querySelector('.weather__btn'),
    btnsDelete: document.querySelectorAll('.btn-delete'),
    locationsList: document.querySelector('.locations__list'),
    allCitys: document.querySelectorAll('.locations__list-item'),
};

const dataUI = [];

function getResponseFromServer(nameCity) {
    const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${nameCity}&appid=${apiKey}&lang=ru&units=metric`;

    elements.elementError.style.display = "block";
    elements.elementError.textContent = "Ищу город...";
    return fetch(url)
        .then(response => {
            if (response.ok) {
                elements.elementError.style.display = "none";
                return response.json();
            }
            if (response.status === 404) {
                throw new Error("Не найдено");
            }
        })
        .catch(error => {
            const elementError = document.querySelector('.error');
            elementError.textContent = `${error}`;
            elementError.style.display = 'block';
            setTimeout(() => {
                elementError.style.display = 'none';
            }, 4000); //через 4 сек убирает сообщение об ошибке
        })
}

function changeWeatherAndCityInDOM(city) {
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

function renderHistory(list) {
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

function deleteCityInFavourites(city) {
    const deleteIndex = dataUI.findIndex(item => item === city);
    dataUI.splice(deleteIndex, 1);
    renderHistory(elements.locationsList);
}

function addCityInFavourites(city) {
    const checkCityInDataUI = dataUI.includes(city.textContent);

    if (checkCityInDataUI) return
    dataUI.push(city.textContent);
    renderHistory(elements.locationsList);
}

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
    }
});

function handleAddCityInFavourites() {
    addCityInFavourites(elements.city);
}

elements.btnLove.addEventListener('click', handleAddCityInFavourites);

elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    changeWeatherAndCityInDOM(elements.inputCity.value);
    elements.form.reset();
});


