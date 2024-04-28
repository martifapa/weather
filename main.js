import getWeather from './src/weatherApiInteractions.js'


const MEDIA_URLS = {
    'Clear': 'clouds.jpg',
    'Sunny': 'clouds.jpg',
    'Partly cloudy': 'clouds.jpg',
    'Overcast': 'cloudy-sky.jpg',
    'Black': 'cloudy-sky.jpg',
    'Light rain': 'cloudy-sky.jpg',
    'Moderate rain': 'cloudy-sky.jpg',
    'Heavy rain': 'cloudy-sky.jpg',
    'Patchy rain nearby': 'cloudy-sky.jpg'
}

const body = document.querySelector('body');
const searchBtn = document.querySelector('#search-btn');
const cityInput = document.querySelector('#search');

const cityTitle = document.querySelector('.city-name');
const cityCurrentTemperature = document.querySelector('.current-temp');
const cityCurrentCondition = document.querySelector('.current-condition');
const cityCurrentConditionIcon = document.querySelector('#current-condition-icon');

const cityForcastedDays = document.querySelectorAll('.forecasted-day');

searchBtn.addEventListener('click', updateWeather);
cityInput.addEventListener('change', updateWeather);


async function updateWeather() {
    try {
        const city = cityInput.value;
        const days = false || 3; // fetch from input element
    
        const weather = fetchFromRequest(await getWeather(city, days));
        
        cityTitle.textContent = weather.locationName;
        cityCurrentTemperature.textContent = weather.currentTemp + 'º';
        cityCurrentCondition.textContent = weather.currentCondition;
        cityCurrentConditionIcon.src = weather.currentConditionIcon;
        
        body.style.backgroundImage = `url(../media/${MEDIA_URLS[cityCurrentCondition.textContent]})`;
        MEDIA_URLS[cityCurrentCondition.textContent] == 'clouds.jpg' ? body.style.color = 'black' : body.style.color = 'white';
        
        cityForcastedDays.forEach((day, idx) => {
            const forecast = weather.forecast[idx]
            const formattedDate = new Date(forecast.forecastDate).toLocaleString('default', { month: 'long', day: 'numeric' });

            day.querySelector('.day-date').textContent = formattedDate;
            day.querySelector('.forecasted-condition-icon').src = forecast.forecastConditionIcon;
            day.querySelector('.forecasted-condition').textContent = forecast.forecastCondition;
            day.querySelector('.min-temp').textContent = forecast.forecastMinTemp + 'º';
            day.querySelector('.max-temp').textContent = forecast.forecastMaxTemp + 'º';
        })

    } catch (error) {
        cityTitle.textContent = error;
    }
    
    function fetchFromRequest(weather) {
        const result = {'forecast': []};
        result['locationName'] = weather.location.name;
    
        result['currentCondition'] = weather.current.condition.text;
        result['currentConditionIcon'] = weather.current.condition.icon;
        result['currentTemp'] = weather.current.temp_c;
        
        weather.forecast.forecastday.forEach(day => {
            const forecastedDay = {};
            forecastedDay['forecastDate'] = day.date;
            forecastedDay['forecastCondition'] = day.day.condition.text;
            forecastedDay['forecastConditionIcon'] = day.day.condition.icon;
            forecastedDay['forecastMaxTemp'] = day.day.maxtemp_c;
            forecastedDay['forecastMinTemp'] = day.day.mintemp_c;
            result['forecast'].push(forecastedDay);
        })
        return result
    }

}