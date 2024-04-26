const APIKEY = '53601542d09248f0b19132516242504';


const elem = document.querySelector('button');
const div = document.querySelector('main');

elem.addEventListener('click', updateWeather);

const endPoints = {
    'current': '/current.json',
    'forecast': '/forecast.json'
}

async function getCityWeather(city, days=false) {
    const url = `https://api.weatherapi.com/v1/${days ? endPoints['forecast'] : endPoints['current']}?key=${APIKEY}&q=${city}${days ? `&days=${days}` : ''}`;

    const response = await fetch(url, {mode:'cors'});
    const weather = await response.json();

    console.log(weather)
    return weather.current.condition.text
}

async function updateWeather() {
    const city = 'london';
    const days = 3
    div.textContent = 'first'

    const r = await getCityWeather(city, days);
    div.textContent = r

}


// getCityWeather('london', 'forecast', 3);