import { REQUEST_TIMEOUT_MS } from '../config.js';

const GEOCODING_URL ='https://geocoding-api.open-meteo.com/v1/search';

// Find a city's geographical coordinates
async function searchCity(city) {
    const normalizedCity = city.trim();

    if (normalizedCity.length < 2) {
        throw new Error('Please enter a city name with at least 2 characters.');
    }

    const params = new URLSearchParams({
        name: normalizedCity,
        count: '1',
        language: 'en',
        format: 'json'
    });

    let response;

    try {
        response = await fetch(
            `${GEOCODING_URL}?${params}`,
            {
                signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
            }
        );
    } catch (error) {
        if (error.name === 'TimeoutError') {
            throw new Error('Geocoding request timed out.');
        }

        throw new Error('Unable to connect to the geocoding service.');
    }

    if (!response.ok) {
        throw new Error(`Geocoding API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error(`No location found for "${normalizedCity}".`);
    }

    const location = data.results[0];

    return {
        name: location.name,
        country: location.country,
        latitude: location.latitude,
        longitude: location.longitude,
        timezone: location.timezone
    };
}

export { searchCity };