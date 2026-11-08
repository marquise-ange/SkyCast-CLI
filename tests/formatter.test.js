
import test from 'node:test';
import assert from 'node:assert/strict';

import {
    getWeatherDescription,
    formatCurrentWeather,
    formatForecast
} from '../src/utils/formatter.js';
import { searchCity } from '../src/services/geocoding.js';
import { setUnits } from '../src/commands/settings.js';

// Test weather code descriptions
test('should return the correct description for clear sky', () => {
    assert.equal(getWeatherDescription(0), 'Clear sky');
});

test('should return the correct description for thunderstorms', () => {
    assert.equal(getWeatherDescription(95), 'Thunderstorm');
});

test('should handle unknown weather codes', () => {
    assert.equal(
        getWeatherDescription(999),
        'Unknown weather conditions'
    );
});


test('should format current weather correctly', () => {
    const location = {
        name: 'Kigali',
        country: 'Rwanda'
    };

    const weather = {
        current: {
            temperature_2m: 25,
            relative_humidity_2m: 60,
            apparent_temperature: 27,
            weather_code: 0,
            wind_speed_10m: 10,
            is_day: 1,
            time: '2026-11-08T12:00'
        },
        current_units: {
            temperature_2m: '°C',
            relative_humidity_2m: '%',
            apparent_temperature: '°C',
            wind_speed_10m: 'km/h'
        }
    };

    const result = formatCurrentWeather(location, weather);

    assert.match(result, /Kigali, Rwanda/);
    assert.match(result, /25°C/);
    assert.match(result, /Clear sky/);
});


test('should format a 5-day forecast correctly', () => {
    const location = {
        name: 'Kigali',
        country: 'Rwanda'
    };

    const forecast = {
        daily: {
            time: [
                '2026-11-09',
                '2026-11-10'
            ],
            weather_code: [0, 95],
            temperature_2m_max: [26, 25],
            temperature_2m_min: [15, 14]
        },
        daily_units: {
            temperature_2m_max: '°C',
            temperature_2m_min: '°C'
        }
    };

    const result = formatForecast(location, forecast);

    assert.match(result, /Kigali, Rwanda/);
    assert.match(result, /Clear sky/);
    assert.match(result, /Thunderstorm/);
    assert.match(result, /26°C/);
    assert.match(result, /14°C/);
});


test('should reject city names shorter than two characters', async () => {
    await assert.rejects(
        searchCity('K'),
        {
            message: 'Please enter a city name with at least 2 characters.'
        }
    );
});

test('should reject an invalid temperature unit', async () => {
    const result = await setUnits('kelvin');

    assert.equal(
        result,
        'Invalid unit. Choose metric or imperial.'
    );
});