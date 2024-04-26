const APIKEY = '53601542d09248f0b19132516242504';
const ENDPOINTS = {
    'current': '/current.json',
    'forecast': '/forecast.json'
}

export default async function getWeather(city, days=false) {
    const url = `https://api.weatherapi.com/v1/${days ? ENDPOINTS['forecast'] : ENDPOINTS['current']}?key=${APIKEY}&q=${city}${days ? `&days=${days}` : ''}`;

    const response = await fetch(url, {mode:'cors'});
    const weather = await response.json();

    console.log(weather)
    return weather
}
