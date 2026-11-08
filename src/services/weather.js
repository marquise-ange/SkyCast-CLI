import { REQUEST_TIMEOUT_MS } from '../config.js';

const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

// Fetch current weather using geographical coordinates
async function getCurrentWeather(location, units = 'metric') {
    const temperatureUnit =
        units === 'imperial' ? 'fahrenheit' : 'celsius';

    const windSpeedUnit =
        units === 'imperial' ? 'mph' : 'kmh';

    const params = new URLSearchParams({
        latitude: String(location.latitude),
        longitude: String(location.longitude),
        current: [
            'temperature_2m',
            'relative_humidity_2m',
            'apparent_temperature',
            'weather_code',
            'wind_speed_10m',
            'is_day'
        ].join(','),
        temperature_unit: temperatureUnit,
        wind_speed_unit: windSpeedUnit,
        timezone: 'auto'
    });

    let response;

    try {
        response = await fetch(`${WEATHER_URL}?${params}`, {
            signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
        });
    } catch (error) {
        if (error.name === 'TimeoutError') {
            throw new Error('Weather request timed out.');
        }

        throw new Error('Unable to connect to the weather service.');
    }

    if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.current) {
        throw new Error('Weather information is unavailable.');
    }

    return data;
}

export { getCurrentWeather };