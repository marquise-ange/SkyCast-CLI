
import { searchCity } from '../services/geocoding.js';
import { getForecast } from '../services/weather.js';
import { readData } from '../utils/storage.js';
import { formatForecast } from '../utils/formatter.js';

// Get and display a 5-day forecast for a city
async function showForecast(city) {
    const location = await searchCity(city);

    const data = await readData();
    const forecast = await getForecast(location, data.settings.units);

    console.log(formatForecast(location, forecast));
}

export { showForecast };
