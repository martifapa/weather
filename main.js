import getWeather from './src/weatherApiInteractions.js'

const elem = document.querySelector('button');
const div = document.querySelector('main');

elem.addEventListener('click', updateWeather);


async function updateWeather() {
    try {
        const city = 'london'; // fetch from input element
        const days = false || 3; // fetch from input element
    
        const weather = await getWeather(city, days);
        div.textContent = weather.current.condition.text;

        console.log(fetchFromRequest(weather));
        
    } catch (error) {
        div.textContent = error;
    }
    
    function fetchFromRequest(weather) {
        const result = {'forecast': []};
        result['locationName'] = weather.location.name;
        result['locationCountry'] = weather.location.country;
    
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
