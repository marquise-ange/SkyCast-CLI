// Convert Open-Meteo weather codes into readable descriptions
function getWeatherDescription(code) {
    const descriptions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        71: 'Slight snowfall',
        73: 'Moderate snowfall',
        75: 'Heavy snowfall',
        80: 'Slight rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        95: 'Thunderstorm'
    };

    return descriptions[code] ?? 'Unknown weather conditions';
}

// Format current weather for terminal display
function formatCurrentWeather(location, weather) {
    const current = weather.current;
    const units = weather.current_units;

    const description = getWeatherDescription(current.weather_code);
    const timeOfDay = current.is_day ? 'Day' : 'Night';

    return `
=================================
        SKYCAST WEATHER
=================================

Location: ${location.name}, ${location.country}

Conditions: ${description}
Temperature: ${current.temperature_2m}${units.temperature_2m}
Feels Like: ${current.apparent_temperature}${units.apparent_temperature}
Humidity: ${current.relative_humidity_2m}${units.relative_humidity_2m}
Wind Speed: ${current.wind_speed_10m} ${units.wind_speed_10m}

Time: ${current.time}
Period: ${timeOfDay}

=================================
`;
}

// Format a 5-day weather forecast for terminal display
function formatForecast(location, forecast) {
    const daily = forecast.daily;
    const units = forecast.daily_units;

    let output = `
=================================
        SKYCAST FORECAST
=================================

Location: ${location.name}, ${location.country}

`;

    for (let i = 0; i < daily.time.length; i++) {
        const date = new Date(`${daily.time[i]}T00:00:00`);

        const day = date.toLocaleDateString('en-US', {
            weekday: 'long'
        });

        const description = getWeatherDescription(
            daily.weather_code[i]
        );

        output += `${day} (${daily.time[i]})
Conditions: ${description}
Maximum: ${daily.temperature_2m_max[i]}${units.temperature_2m_max}
Minimum: ${daily.temperature_2m_min[i]}${units.temperature_2m_min}

`;
    }

    output += '=================================\n';

    return output;
}

export { getWeatherDescription, formatCurrentWeather, formatForecast };