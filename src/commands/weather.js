import { searchCity } from '../services/geocoding.js';
import { getCurrentWeather } from '../services/weather.js';
import { readData, saveData } from '../utils/storage.js';
import { formatCurrentWeather } from '../utils/formatter.js';

// Get and display weather for a city
async function showWeather(city) {
    const location = await searchCity(city);

    const data = await readData();
    const units = data.settings.units;

    const weather = await getCurrentWeather(location, units);

    console.log(formatCurrentWeather(location, weather));

    // Save successful searches in history
    data.history.unshift(city);
    data.history = data.history.slice(0, 10);

    await saveData(data);
}

export { showWeather };