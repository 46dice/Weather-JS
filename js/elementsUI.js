export const elements = {
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

    extraElements: {
        feelsLike: document.querySelector('#feels-like'),
        sunrise: document.querySelector('#sunrise'),
        sunset: document.querySelector('#sunshine'),
    },

    timeElements: {
        firstList: {
            time: document.querySelector('#time-time1'),
            temperature: document.querySelector('#time-temperature1'),
            feelsLike: document.querySelector('#time-feels-like1'),
            img: document.querySelector('#time-image1'),
        },
        secondList: {
            time: document.querySelector('#time-time2'),
            temperature: document.querySelector('#time-temperature2'),
            feelsLike: document.querySelector('#time-feels-like2'),
            img: document.querySelector('#time-image2'),
        },
        thirdList: {
            time: document.querySelector('#time-time3'),
            temperature: document.querySelector('#time-temperature3'),
            feelsLike: document.querySelector('#time-feels-like3'),
            img: document.querySelector('#time-image3'),
        },
    }
};


