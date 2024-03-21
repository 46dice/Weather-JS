const elements = {
    form: document.querySelector('.form'),
    inputCity: document.querySelector('.form__input-text'),
    weatherValue: document.querySelector('.weather__value'),
    city: document.querySelector('.weather__city'),
}

const nullKelvin = 273.15;

function getResponseFromServer(nameCity) {
    const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const cityName = nameCity;
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'; // этот ключ имеет ограничение в кол-ве запросов, если будут ошибки - придется сгенерировать новый или спросить в чате
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&lang=ru`;

    return fetch(url)
        .then(response => {
            if (response.status === 404) {
                throw new Error("Не найдено");
            }
            return response.json();
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
        elements.weatherValue.textContent = `${(Number(data.main.temp) - nullKelvin).toFixed(1)}°`; //
    });
}

elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    changeWeatherAndCityInDOM(elements.inputCity.value);
})
